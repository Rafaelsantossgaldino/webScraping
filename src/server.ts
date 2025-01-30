import "dotenv/config";
import express from "express";
import cors from "cors";
import https from "https";
import http from "http";
import connectToDatabase from "./database/db";
import { requestInterceptor } from "./utils/requestInterceptor";
import scraping  from "./routes/scraping.routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectToDatabase().then(() => {
  app.all("*", requestInterceptor);

  app.use("/search", scraping);


  const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  };

  // Verificar se o server esta em producao ou dev
  const regularServer = http.createServer(app);

  //PEGA A PORTA 9000 POR PADRAO
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 9000;
  runServer(serverPort, regularServer);

});