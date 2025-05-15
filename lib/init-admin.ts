import { connectToDatabase } from "./db";
import User from "./models/User";
import bcrypt from "bcryptjs";

export async function initAdmin() {
  try {
    console.log("Admin kullanıcısı kontrol ediliyor...");
    await connectToDatabase();
    
    // Veritabanında hiç kullanıcı var mı kontrol et
    const userCount = await User.countDocuments({});
    
    if (userCount === 0) {
      console.log("Hiç kullanıcı bulunamadı, varsayılan admin kullanıcısı oluşturuluyor...");
      
      // Şifreyi hashle
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("adminpassword", salt);
      
      // Yeni admin kullanıcısı oluştur
      const adminUser = new User({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        isVerified: true,
        createdAt: new Date(),
        company: "Syneris"
      });
      
      await adminUser.save();
      console.log("Varsayılan admin kullanıcısı başarıyla oluşturuldu:");
      console.log("- E-posta: admin@example.com");
      console.log("- Şifre: adminpassword");
    } else {
      console.log(`Veritabanında ${userCount} kullanıcı mevcut. Admin kontrolü tamamlandı.`);
    }
  } catch (error) {
    console.error("Admin kullanıcısı oluşturma hatası:", error);
  }
} 