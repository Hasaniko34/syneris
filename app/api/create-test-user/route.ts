import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongoose";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Yönetici kontrolü yap
    const session = await getServerSession(authOptions);
    
    // Session kontrolü
    if (!session || !session.user?.email) {
      return NextResponse.json({
        success: false,
        message: "Yetkisiz erişim"
      }, { status: 401 });
    }
    
    // Veritabanına bağlan
    await dbConnect();
    console.log("Veritabanına bağlantı başarılı");
    
    // Oturum açan kullanıcıyı bul ve yetkisini kontrol et
    const currentUser = await User.findOne({ email: session.user.email });
    
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({
        success: false,
        message: "Bu işlem için yönetici yetkileri gereklidir"
      }, { status: 403 });
    }
    
    // Kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log("Kullanıcı zaten var:", existingUser);
      return NextResponse.json({ 
        success: false, 
        message: "Bu e-posta adresi zaten kullanımda",
        user: existingUser
      });
    }
    
    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    // Yeni kullanıcı oluştur
    const newUser = await User.create({
      name: 'Test Kullanıcı',
      email: 'test@example.com',
      password: hashedPassword,
      company: 'Syneris',
      role: 'user'
    });
    
    console.log("Test kullanıcısı başarıyla oluşturuldu:", newUser);
    
    return NextResponse.json({ 
      success: true, 
      message: "Test kullanıcısı başarıyla oluşturuldu",
      user: {
        name: newUser.name,
        email: newUser.email,
        company: newUser.company,
        role: newUser.role
      },
      loginInfo: {
        email: 'test@example.com',
        password: 'test123'
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