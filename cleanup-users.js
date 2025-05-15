// Veritabanındaki tüm kullanıcıları silmek için script
// Terminalden çalıştırmak için: node cleanup-users.js

// MongoDB bağlantı URI'sini doğrudan tanımla
const MONGODB_URI = "mongodb+srv://hasant:A6iPuR7PR4HRDg6Q@cluster0.5ok8t.mongodb.net/";

const mongoose = require('mongoose');

if (!MONGODB_URI) {
  console.error('MONGODB_URI çevre değişkeni tanımlanmamış');
  process.exit(1);
}

async function cleanupUsers() {
  try {
    console.log('MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('Veritabanı bağlantısı başarılı');
    
    // Kullanıcı koleksiyonuna doğrudan eriş
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Tüm kullanıcıları sil
    const result = await usersCollection.deleteMany({});
    
    console.log(`${result.deletedCount} kullanıcı başarıyla silindi`);
    
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    // Bağlantıyı kapat
    await mongoose.disconnect();
    console.log('Veritabanı bağlantısı kapatıldı');
    process.exit(0);
  }
}

// Scripti çalıştır
cleanupUsers(); 