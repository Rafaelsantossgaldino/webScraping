import mongoose, { Schema, Document } from "mongoose";

export interface IProduto extends Document {
  nome: string;
  preco: string;
  link: string;
}

const ProdutoSchema: Schema = new Schema({
  nome: { type: String, required: true },
  preco: { type: String, required: true },
  link: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IProduto>("PRODUTOS", ProdutoSchema);