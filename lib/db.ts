import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI ortam değişkeni tanımlanmamış');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Geliştirme ortamında global değişken kullanarak bağlantıyı yeniden kullanma
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Üretim ortamında yeni bağlantı oluşturma
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// MongoDB bağlantısı için yardımcı fonksiyonlar
export async function connectToDatabase() {
  return await clientPromise;
}

// Alternatif alias - eski kodlarda kullanılıyor olabilir
export const connectDB = connectToDatabase;

export default clientPromise; 