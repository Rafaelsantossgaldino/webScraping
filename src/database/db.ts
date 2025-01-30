import mongoose from "mongoose";
require('dotenv').config();

const dbURI: string = process.env.MONGO_URI || '';

// Função para conectar ao MongoDB
const connectToDatabase = async (): Promise<void> => {
  try {
    // Conexão ao MongoDB sem opções obsoletas
    await mongoose.connect(dbURI);
    console.log('✅ Conectado ao MongoDB com sucesso! ✅');
  } catch (error) {
    console.log("dbURI @@")
    console.log(dbURI)
    console.error('🚫 Erro ao conectar ao MongoDB:', error);
    throw error; // Opcional: para lançar o erro e tratar em nível superior
  }
};

// Exporta a função de conexão para uso em outros arquivos
export default connectToDatabase; 