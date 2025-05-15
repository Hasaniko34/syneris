import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { dbConnect } from "@/lib/mongoose";
import User from "@/lib/models/User";
import Company from "@/lib/models/Company";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const { name, email, company: companyName, role, password } = await req.json();
    
    console.log("Kayıt isteği alındı:", { name, email, companyName, role });

    // Gerekli alanları kontrol et
    if (!name || !email || !companyName || !password) {
      console.error("Eksik bilgi:", { name, email, companyName, password: !!password });
      return NextResponse.json(
        { message: "Tüm alanları doldurunuz" },
        { status: 400 }
      );
    }

    // Veritabanı bağlantısı
    try {
      await dbConnect();
      console.log("Veritabanı bağlantısı başarılı:", mongoose.connection.readyState);
    } catch (dbError: any) {
      console.error("Veritabanı bağlantı hatası:", dbError.message);
      return NextResponse.json(
        { message: "Veritabanı bağlantısı kurulamadı: " + dbError.message },
        { status: 500 }
      );
    }

    // E-posta kullanımda mı kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Kullanıcı zaten var:", email);
      return NextResponse.json(
        { message: "Bu e-posta adresi zaten kullanımda" },
        { status: 409 }
      );
    }

    // Şifreyi hash'le
    const hashedPassword = await hash(password, 10);
    console.log("Şifre hashlenmiş durumda");

    // Şirket domaini çıkar
    const domain = email.split('@')[1];
    console.log("E-posta domaini:", domain);

    // Şirket var mı kontrol et veya oluştur
    let company = null;
    let companyId = null;
    
    try {
      // Önce normal model ile deneyelim
      company = await Company.findOne({ domain });
      console.log("Şirket arama sonucu:", company ? `Bulundu (${company._id})` : "Bulunamadı");
      
      if (!company) {
        console.log("Yeni şirket oluşturuluyor:", companyName);
        
        // Direkt MongoDB collection'a erişerek oluşturalım
        const db = mongoose.connection.db;
        
        // db'nin tanımlı olup olmadığını kontrol et
        if (!db) {
          console.error("Veritabanı bağlantısı bulunamadı");
          return NextResponse.json(
            { message: "Veritabanı bağlantısı sağlanamadı" },
            { status: 500 }
          );
        }
        
        const companiesCollection = db.collection('companies');
        
        // Benzersiz domain oluştur - timestamp ekleyerek
        const uniqueDomain = `${domain.replace('.', '-')}-${Date.now()}.local`;
        
        // Basit bir şirket nesnesi oluştur
        const simpleCompany = {
          name: companyName,
          domain: uniqueDomain, // Benzersiz domain kullan
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        console.log("Benzersiz domain ile şirket oluşturuluyor:", uniqueDomain);
        const result = await companiesCollection.insertOne(simpleCompany);
        
        if (result.acknowledged) {
          companyId = result.insertedId;
          console.log("Şirket başarıyla oluşturuldu. ID:", companyId.toString());
        } else {
          throw new Error("Şirket oluşturma işlemi onaylanmadı");
        }
      } else {
        console.log("Mevcut şirket bulundu:", company.name, company._id);
        companyId = company._id;
      }
    } catch (companyError: any) {
      console.error("Şirket oluşturma/bulma hatası:", companyError);
      console.error("Hata detayı:", companyError.message);
      console.error("Hata stack:", companyError.stack);
      
      return NextResponse.json(
        { message: "Şirket kaydı sırasında bir hata oluştu: " + companyError.message },
        { status: 500 }
      );
    }

    // Şirket ID kontrolü
    if (!companyId) {
      console.error("Şirket ID bulunamadı");
      return NextResponse.json(
        { message: "Şirket oluşturulamadı veya ID alınamadı" },
        { status: 500 }
      );
    }

    // Kullanıcıyı oluştur
    console.log("Kullanıcı oluşturuluyor. Şirket ID:", companyId.toString());
    try {
      // Direkt MongoDB collection'a erişerek kullanıcı oluşturalım
      const db = mongoose.connection.db;
      
      // db'nin tanımlı olup olmadığını kontrol et
      if (!db) {
        console.error("Veritabanı bağlantısı bulunamadı");
        return NextResponse.json(
          { message: "Veritabanı bağlantısı sağlanamadı" },
          { status: 500 }
        );
      }
      
      const usersCollection = db.collection('users');
      
      // Benzersiz ID oluştur
      const userId = new mongoose.Types.ObjectId();
      
      // Basit bir kullanıcı nesnesi oluştur - tüm gerekli alanlarla
      const userData = {
        _id: userId,
        id: userId.toString(), // id alanı için değer belirt
        name,
        email,
        password: hashedPassword,
        company: companyId,
        role: role || 'user',
        active: true,
        skills: [], // Boş dizi olarak başlat
        education: [], // Boş dizi olarak başlat
        notificationPreferences: {
          email: true,
          push: true,
          sms: false,
          courseUpdates: true,
          marketingEmails: false
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      console.log("Doğrudan collection ile kullanıcı oluşturuluyor");
      const result = await usersCollection.insertOne(userData);
      
      if (!result.acknowledged) {
        throw new Error("Kullanıcı oluşturma işlemi onaylanmadı");
      }
      
      const userIdFromDB = result.insertedId;
      console.log("Kullanıcı başarıyla oluşturuldu:", userIdFromDB.toString());

      return NextResponse.json(
        { message: "Kullanıcı başarıyla oluşturuldu", userId: userIdFromDB },
        { status: 201 }
      );
    } catch (userError: any) {
      console.error("Kullanıcı oluşturma hatası:", userError);
      console.error("Hata detayı:", userError.message);
      console.error("Hata stack:", userError.stack);
      
      return NextResponse.json(
        { message: "Kullanıcı oluşturulurken bir hata oluştu: " + userError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Kayıt hatası:", error);
    console.error("Hata detayı:", error.message);
    console.error("Hata stack:", error.stack);
    
    return NextResponse.json(
      { message: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
} 