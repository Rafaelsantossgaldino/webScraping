import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import Produto from "../models/Produto";


export const searcProducts = async (req: Request, res: Response): Promise<void> => {
  const { produto, preco } = req.query;

  if (!produto) {
    res.status(400).json({ error: 'Faltando parâmetro "produto".' });
    return;
  }

  const url = `https://www.buscape.com.br/search?q=${encodeURIComponent(produto as string)}`;

  try {
    // const browser = await puppeteer.launch({ headless: false }); 
    const browser = await puppeteer.launch({
      headless: true, // Use 'true' para rodar o Chrome de forma oculta
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Scroll para carregar mais produtos
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 200;
        const timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 200);
      });
    });

    await new Promise(resolve => setTimeout(resolve, 5000));// Espera 5 segundos para garantir o carregamento

    const produtos = await page.evaluate(() => {
      const produtoElements = Array.from(document.querySelectorAll("a.ProductCard_ProductCard_Inner__gapsh"));
      console.log("Produtos encontrados:", produtoElements.length);

      return produtoElements.map(el => ({
        nome: el.querySelector("h2")?.textContent?.trim() || "Nome não encontrado",
        preco: el.querySelector("p[data-testid='product-card::price']")?.textContent?.trim() || "0",
        link: el.getAttribute('href') ? "https://www.buscape.com.br" + el.getAttribute('href') : "Link não disponível",
      }));
    });

    await browser.close();

    if (produtos.length === 0) {
      res.status(404).json({ error: "Nenhum produto encontrado." });
      return;
    }

    // Filtragem por preço, se fornecido
    const precoMax = preco ? parseFloat(preco as string) : null;
    const produtosFiltrados = precoMax
      ? produtos.filter(p => parseFloat(p.preco.replace(/[^\d,]/g, "").replace(",", ".")) <= precoMax)
      : produtos;

    await Produto.insertMany(produtosFiltrados);
    res.status(200).json(produtosFiltrados);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os produtos.' });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const produtos = await Produto.find().sort({ createdAt: -1 }); // Ordena do mais recente para o mais antigo

    if (produtos.length === 0) {
      res.status(404).json({ error: "Nenhum produto encontrado no banco de dados." });
      return;
    }

    res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos no banco de dados:", error);
    res.status(500).json({ error: "Ocorreu um erro ao buscar os produtos." });
  }
};

// export const searcProducts = async (req: Request, res: Response): Promise<void> => {
//   const { palavraChave } = req.params;

//   if (!palavraChave || typeof palavraChave !== 'string') {
//     res.status(400).json({ error: 'Palavra-chave é obrigatória e deve ser uma string.' });
//     return;
//   }

//   const url = `https://www.buscape.com.br/search?q=${encodeURIComponent(palavraChave)}`;

//   try {
//     const browser = await puppeteer.launch({ headless: false }); // Rodar com o navegador visível
//     // const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     await page.goto(url, { waitUntil: 'networkidle2' });
//     await page.waitForSelector("a.ProductCard_ProductCard_Inner__gapsh"); // Espera os produtos carregarem

//     const produtos = await page.evaluate(() => {
//       const produtoElements = Array.from(document.querySelectorAll("a.ProductCard_ProductCard_Inner__gapsh"));
//       console.log(produtoElements.length);  // Verifica quantos produtos foram encontrados
//       return produtoElements.map(el => ({
//         nome: el.querySelector("h2.ProductCard_ProductCard_Name__U_mUQ")?.textContent?.trim(),
//         preco: el.querySelector("p[data-testid='product-card::price']")?.textContent?.trim(),
//         link: el.getAttribute('href') ? "https://www.buscape.com.br" + el.getAttribute('href') : "Link não disponível",
//       }));
//     });

//     await browser.close();

//     res.status(200).json(produtos);
//   } catch (error) {
//     console.error("Erro ao buscar produtos:", error);
//     res.status(500).json({ error: 'Ocorreu um erro ao buscar os produtos.' });
//   }
// };





