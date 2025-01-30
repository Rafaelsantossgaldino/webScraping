import { RequestHandler } from "express";

// MOSTRA NO TERMINAL O STATUSCODE, METODO, URL
export const requestInterceptor: RequestHandler = (req, res, next) => {
  console.log(`➡️ ${res.statusCode} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
  next();
};
