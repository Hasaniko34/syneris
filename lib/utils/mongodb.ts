import mongoose from 'mongoose';

// İstemci tarafında çalışıp çalışmadığını kontrol et
const isClientSide = typeof window !== 'undefined';

// Global tip tanımı
interface CachedConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Global değişkeni tanımla
let cached: CachedConnection;

// Global değişkenlerin tipleri
declare global {
  // eslint-disable-next-line no-var
  var mongoose: CachedConnection | undefined;
}

// MongoDB bağlantı işlevi
async function connectToDatabase() {
  // Tarayıcı tarafında çalışıyorsa
  if (isClientSide) {
    console.warn('MongoDB bağlantısı yalnızca sunucu tarafında çalışır');
    return null;
  }

  // Sunucu tarafında çalışma logici
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI ortam değişkeni tanımlanmamış veya boş');
  }

  // Global değişken ayarlanır
  if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
  }
  
  cached = global.mongoose;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    mongoose.set('strictQuery', false);
    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
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
export { connectToDatabase }; 