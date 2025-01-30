# API de Scraping de Produtos

Esta API realiza scraping de produtos no site **Buscapé** e salva as informações no banco de dados **MongoDB**. Além disso, permite recuperar os produtos armazenados no banco.

## 🚀 Funcionalidades

- **Buscar produtos no Buscapé**: A API faz scraping na página do Buscapé para encontrar produtos com base em uma palavra-chave e pode filtrar por preço.
- **Salvar produtos no MongoDB**: Os produtos encontrados são armazenados no banco de dados.
- **Listar produtos salvos**: Retorna todos os produtos armazenados no banco de dados.

## 🛠 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **Mongoose** - Modelagem e interação com MongoDB
- **Puppeteer** - Biblioteca para controle do navegador e scraping
- **TypeScript** - Tipagem estática para JavaScript
- **Cors** - Permite requisições entre diferentes domínios
- **Dotenv** - Gerenciamento de variáveis de ambiente

## 📦 Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/api-scraping-produtos.git
   cd api-scraping-produtos
   
2. Instale as dependências:
```sh
npm install
```
3. Configure o arquivo .env com a conexão do MongoDB:
```sh
PORT=9000
MONGO_URI=mongodb://localhost:27017/seu_banco
```
4. Inicie o servidor:
```sh
npm run dev
```
📌 Rotas da API
🔍 Buscar produtos no Buscapé:
- GET /search?produto={nome-do-produto}&preco={preco-maximo}

Parâmetros:
- produto (obrigatório) 
→ Nome do produto a ser pesquisado
- preco (opcional) 
→ Define um preço máximo para filtrar os produtos.

Exemplo de requisição:
```sh
GET http://localhost:9000/search?produto=iphone&preco=3000
```
Resposta:
```sh
[
  {
    "nome": "iPhone 13",
    "preco": "R$ 2.999,00",
    "link": "https://www.buscape.com.br/produto"
  }
]
```
📄 Listar produtos armazenados no Banco de dados:
```sh
GET http://localhost:9000/search/meus-produtos
```
🏗 Estrutura do Projeto:
```sh
📂 api-scraping-produtos
 ┣ 📂 controllers
 ┃ ┗ 📜 ProdutoController.ts  # Lógica das rotas
 ┣ 📂 models
 ┃ ┗ 📜 Produto.ts  # Modelo do MongoDB
 ┣ 📂 routes
 ┃ ┗ 📜 scraping.routes.ts  # Definição das rotas
 ┣ 📂 database
 ┃ ┗ 📜 db.ts  # Conexão com o MongoDB
 ┣ 📂 utils
 ┃ ┗ 📜 requestInterceptor.ts  # Interceptor para logs
 ┣ 📜 server.ts  # Inicialização do servidor
 ┣ 📜 package.json
 ┗ 📜 .env.example  # Exemplo de configuração do ambiente
```
📌 Considerações Finais
- A API usa o Puppeteer para capturar informações do site do Buscapé.
- Como scraping pode ser bloqueado pelo site, é recomendável utilizar proxies caso encontre dificuldades.
- O banco de dados utilizado é o MongoDB, que pode ser configurado no arquivo .env.




