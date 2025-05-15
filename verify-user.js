// Bir kullanıcının hesabını doğrulamak için script
// Terminalden çalıştırmak için: node verify-user.js user@example.com
// Örnek: node verify-user.js test@example.com

// MongoDB bağlantı URI'si
const MONGODB_URI = "mongodb+srv://hasant:A6iPuR7PR4HRDg6Q@cluster0.5ok8t.mongodb.net/";

const mongoose = require('mongoose');

if (!MONGODB_URI) {
  console.error('MONGODB_URI çevre değişkeni tanımlanmamış');
  process.exit(1);
}

// Komut satırından e-posta adresini al
const email = process.argv[2];

if (!email) {
  console.error('Lütfen bir e-posta adresi belirtin');
  console.error('Kullanım: node verify-user.js user@example.com');
  process.exit(1);
}

async function verifyUser() {
  try {
    console.log(`'${email}' e-posta adresine sahip kullanıcı doğrulanıyor...`);
    
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
    
    // Kullanıcıyı e-posta ile bul ve güncelle
    const result = await usersCollection.updateOne(
      { email: email },
      { 
        $set: { 
          isVerified: true,
          resetPasswordToken: null,
          resetPasswordExpires: null
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      console.error(`'${email}' e-posta adresine sahip kullanıcı bulunamadı`);
      process.exit(1);
    }
    
    if (result.modifiedCount === 0) {
      console.log(`'${email}' e-posta adresine sahip kullanıcı zaten doğrulanmış`);
    } else {
      console.log(`'${email}' e-posta adresine sahip kullanıcı başarıyla doğrulandı`);
    }
    
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
verifyUser(); 