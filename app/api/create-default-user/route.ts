import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secretKey = searchParams.get('secretKey');
    
    // API anahtarı kontrolü (bu anahtar .env dosyasında saklanabilir)
    // Güvenlik için basit bir önlem, gerçek uygulamada daha güçlü bir mekanizma kullanılmalı
    if (secretKey !== process.env.ADMIN_CLEANUP_KEY) {
      return NextResponse.json({
        success: false,
        message: "Bu işlem için geçerli bir anahtar gereklidir"
      }, { status: 401 });
    }

    await connectToDatabase();
    console.log("Veritabanına bağlandı");

    // Kullanıcı varsa hata döndür
    const existingUser = await User.findOne({ email: "admin@example.com" });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "Bu e-posta adresiyle kayıtlı bir kullanıcı zaten mevcut"
      }, { status: 400 });
    }

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("adminpassword", salt);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      createdAt: new Date(),
      company: "Syneris"
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "Varsayılan admin kullanıcısı başarıyla oluşturuldu",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error: any) {
    console.error("Kullanıcı oluşturma hatası:", error);
    return NextResponse.json({
      success: false,
      message: "Kullanıcı oluşturma hatası: " + error.message
    }, { status: 500 });
  }
} 