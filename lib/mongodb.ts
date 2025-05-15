import mongoose from 'mongoose';

// mongoDB.ts interface
interface MongoCached {
  promise: Promise<mongoose.Connection> | null;
  conn: mongoose.Connection | null;
}

// Global type declaration
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongoCached | undefined;
}

/**
 * Ortam değişkenlerinden MongoDB URI'yi alır.
 */
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Lütfen .env dosyasında MONGODB_URI değişkenini tanımlayın'
  );
}

/**
 * Global değişken, hot-reloading sırasında bağlantının yeniden oluşturulmasını önler
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * MongoDB'ye bağlanmak için bir işlev
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB bağlantısı başarılı!');
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase; 