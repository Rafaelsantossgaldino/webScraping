import express, {Router, Request, Response} from "express"
import { searcProducts } from "../controllers/ScrapingController";
import {getProducts} from "../controllers/ScrapingController"

const router = express.Router();

router.get("/",  searcProducts); // Busca produtos no Buscapé e salva no banco

router.get("/meus-produtos", getProducts); // Retorna produtos do banco de dados

export default router;