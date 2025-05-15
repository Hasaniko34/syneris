import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import User from "@/lib/models/User";

/**
 * E-posta doğrulama için API endpoint'i
 * GET /api/auth/verify?token=TOKEN
 */
export async function GET(request: NextRequest) {
  try {
    // URL parametrelerini al
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");
    
    // Token parametresi yoksa hata döndür
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Doğrulama belirteci eksik" },
        { status: 400 }
      );
    }
    
    // Veritabanına bağlan
    await dbConnect();
    
    // Token ile kullanıcıyı bul
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } // Tokenin süresi dolmamış olmalı
    });
    
    // Kullanıcı bulunamazsa veya token geçersizse hata döndür
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Doğrulama belirteci geçersiz veya süresi dolmuş" },
        { status: 400 }
      );
    }
    
    // Kullanıcıyı doğrulanmış olarak işaretle ve token bilgilerini temizle
    user.isVerified = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    // Başarılı yanıt döndür
    return NextResponse.json({
      success: true,
      message: "E-posta adresiniz başarıyla doğrulandı. Şimdi giriş yapabilirsiniz."
    });
  } catch (error: any) {
    console.error("E-posta doğrulama hatası:", error.message);
    
    return NextResponse.json(
      { success: false, message: "E-posta doğrulama sırasında bir hata oluştu", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Doğrulama e-postasını yeniden göndermek için API endpoint'i
 * POST /api/auth/verify
 * { "email": "user@example.com" }
 */
export async function POST(request: NextRequest) {
  try {
    // İsteği JSON olarak al
    const body = await request.json();
    const { email } = body;
    
    // E-posta parametresi yoksa hata döndür
    if (!email) {
      return NextResponse.json(
        { success: false, message: "E-posta adresi gereklidir" },
        { status: 400 }
      );
    }
    
    // Veritabanına bağlan
    await dbConnect();
    
    // E-posta ile kullanıcıyı bul
    const user = await User.findOne({ email: email.toLowerCase() });
    
    // Kullanıcı bulunamazsa hata döndür
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Bu e-posta adresi ile kayıtlı bir kullanıcı bulunamadı" },
        { status: 404 }
      );
    }
    
    // Kullanıcı zaten doğrulanmışsa bilgi döndür
    if (user.isVerified) {
      return NextResponse.json({
        success: true,
        message: "Bu e-posta adresi zaten doğrulanmış. Giriş yapabilirsiniz."
      });
    }
    
    // Yeni doğrulama belirteci oluştur
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Kullanıcının belirtecini güncelle
    user.resetPasswordToken = verificationToken;
    user.resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 saat geçerli
    await user.save();
    
    // Gerçek bir uygulamada burada e-posta gönderimi yapılır
    // Örnek: await sendVerificationEmail(user.email, verificationToken);
    
    // Başarılı yanıt döndür
    return NextResponse.json({
      success: true,
      message: "Doğrulama e-postası tekrar gönderildi. Lütfen e-posta kutunuzu kontrol edin."
    });
  } catch (error: any) {
    console.error("Doğrulama e-postası gönderme hatası:", error.message);
    
    return NextResponse.json(
      { success: false, message: "Doğrulama e-postası gönderilirken bir hata oluştu", error: error.message },
      { status: 500 }
    );
  }
} 