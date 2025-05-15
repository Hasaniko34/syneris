import mongoose from 'mongoose';

// Eğer MONGODB_URI çevre değişkeni yoksa veya bağlantı başarısız olursa kullanılacak yerel bağlantı adresi
const FALLBACK_MONGODB_URI = 'mongodb://localhost:27017/tebsyneris';
const MONGODB_URI = process.env.MONGODB_URI || FALLBACK_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI çevre değişkeni (MONGODB_URI) tanımlanmamış');
}

// MongoDB bağlantısını global olarak saklamak için arayüz
interface IConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Global değişken ile bağlantı önbelleği
 * Geliştirme ortamındaki hot reloading nedeniyle her bir modül yeniden yüklendiğinde
 * bağlantıyı tekrar oluşturmak yerine mevcut bağlantıyı yeniden kullanmamızı sağlar.
 */
const globalForMongoose = global as unknown as { mongoose: IConnectionCache };
let cached = globalForMongoose.mongoose;

if (!cached) {
  cached = globalForMongoose.mongoose = { conn: null, promise: null };
}

/**
 * MongoDB veritabanına bağlanır ve bağlantıyı önbelleğe alır.
 * @returns MongoDB bağlantısı
 */
export async function dbConnect(): Promise<typeof mongoose> {
  // Önbellekte bağlantı varsa, onu döndür
  if (cached.conn) {
    console.log('🗄️ Mevcut MongoDB bağlantısı kullanılıyor');
    return cached.conn;
  }

  // Halihazırda bir bağlantı isteği varsa, onu bekle
  if (cached.promise) {
    console.log('⏳ Devam eden MongoDB bağlantı isteği bekleniyor');
    return await cached.promise;
  }

  try {
    // Yeni bir bağlantı oluştur
    console.log('🔄 MongoDB\'ye bağlanılıyor...');
    
    const connectionOptions: mongoose.ConnectOptions = {
      maxPoolSize: 10, // Maksimum bağlantı sayısı
      minPoolSize: 5,  // Minimum bağlantı sayısı
      serverSelectionTimeoutMS: 5000, // Sunucu seçimi zaman aşımı
      socketTimeoutMS: 45000, // Soket zaman aşımı
      family: 4, // IPv4 kullanımı için
    };

    // Önce ana URI ile bağlanmayı dene
    try {
    // Bağlantı isteğini önbelleğe al
    cached.promise = mongoose.connect(MONGODB_URI, connectionOptions);
    cached.conn = await cached.promise;
    
    console.log('✅ MongoDB bağlantısı başarıyla kuruldu');
    return cached.conn;
    } catch (primaryError) {
      // Ana URI ile bağlantı başarısız olursa ve bu URI cloud ise, yerel veritabanına bağlanmayı dene
      if (MONGODB_URI.includes('mongodb+srv') && MONGODB_URI !== FALLBACK_MONGODB_URI) {
        console.warn('⚠️ Cloud MongoDB bağlantısı başarısız oldu, yerel veritabanına bağlanmayı deniyorum...');
        cached.promise = mongoose.connect(FALLBACK_MONGODB_URI, connectionOptions);
        cached.conn = await cached.promise;
        console.log('✅ Yerel MongoDB bağlantısı başarıyla kuruldu');
        return cached.conn;
      } else {
        // Yedek URI de başarısız olursa, hatayı fırlat
        throw primaryError;
      }
    }
  } catch (error) {
    // Hata durumunda önbelleği temizle ve hatayı yeniden fırlat
    cached.promise = null;
    console.error('❌ MongoDB bağlantı hatası:', error);
    throw error;
  }
}

/**
 * MongoDB bağlantısını kapatır
 * Genellikle test senaryolarında veya uygulamayı kapatırken kullanılır
 */
export async function dbDisconnect(): Promise<void> {
  if (cached.conn) {
    console.log('🔌 MongoDB bağlantısı kapatılıyor');
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('🚫 MongoDB bağlantısı kapatıldı');
  }
}

// Uygulama sonlandırma olaylarını dinle
if (process.env.NODE_ENV !== 'development') {
  process.on('SIGINT', async () => {
    await dbDisconnect();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await dbDisconnect();
    process.exit(0);
  });
}

export default mongoose; 