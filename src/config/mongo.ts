import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // URI de conexão com o MongoDB
const dbName = 'cces'; // Nome do seu banco de dados

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return db;
}