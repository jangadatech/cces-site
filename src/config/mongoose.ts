// import mongoose from 'mongoose';

// const uri = 'mongodb://localhost:27017'; // URI de conexão com o MongoDB
// const dbName = 'cces'; // Nome do seu banco de dados

// export async function connectToDatabase() {
//   try {
//     await mongoose.connect(`${uri}/${dbName}`);

//     console.log('Conexão com o MongoDB estabelecida com sucesso!');
//   } catch (error) {
//     console.error('Erro ao conectar ao MongoDB:', error);
//   }
// }
import mongoose from 'mongoose';
const connectMongoose = async () => mongoose.connect('mongodb://localhost:27017/cces');
export default connectMongoose;