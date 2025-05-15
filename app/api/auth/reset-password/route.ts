import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { dbConnect } from "@/lib/mongoose";
import User from "@/lib/models/User";
// Not: Gerçek uygulamada bir e-posta gönderme servisi kullanılmalıdır
// import { sendEmail } from "@/lib/mail";

// Şifre sıfırlama isteği için doğrulama şeması
const passwordResetRequestSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
});

// Şifre sıfırlama için doğrulama şeması
const passwordResetSchema = z.object({
  token: z.string().min(1, { message: "Token gereklidir" }),
  password: z
    .string()
    .min(8, { message: "Şifre en az 8 karakter olmalıdır" })
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir" }
    ),
});

/**
 * Şifre sıfırlama isteği gönderme için API endpoint'i
 * POST /api/auth/reset-password
 * { "email": "user@example.com" }
 */
export async function POST(request: NextRequest) {
  try {
    // İsteği JSON olarak al
    const body = await request.json();
    
    // Girişleri doğrula
    const validationResult = passwordResetRequestSchema.safeParse(body);
    
    // Doğrulama hatası varsa, hata mesajını döndür
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      return NextResponse.json(
        { success: false, message: "Geçersiz giriş verileri", errors: formattedErrors },
        { status: 400 }
      );
    }
    
    // Doğrulanmış verileri al
    const { email } = validationResult.data;
    
    // Veritabanına bağlan
    await dbConnect();
    
    // E-posta ile kullanıcıyı bul
    const user = await User.findOne({ email: email.toLowerCase() });
    
    // Kullanıcı bulunamazsa bile güvenlik için başarılı mesajı döndür
    // Bu, saldırganların hangi e-postaların sistemde kayıtlı olduğunu tespit etmesini önler
    if (!user) {
      console.log("Şifre sıfırlama isteği: Kullanıcı bulunamadı", email);
      
      return NextResponse.json({
        success: true,
        message: "Şifre sıfırlama talimatları e-posta adresinize gönderildi."
      });
    }
    
    // Reset token oluştur
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Kullanıcının reset token bilgilerini güncelle
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 saat geçerli
    await user.save();
    
    // Gerçek bir uygulamada burada e-posta gönderimi yapılır
    // Örnek: await sendPasswordResetEmail(user.email, resetToken);
    
    // Başarılı yanıt döndür
    return NextResponse.json({
      success: true,
      message: "Şifre sıfırlama talimatları e-posta adresinize gönderildi."
    });
  } catch (error: any) {
    console.error("Şifre sıfırlama isteği hatası:", error.message);
    
    return NextResponse.json(
      { success: false, message: "Şifre sıfırlama isteği sırasında bir hata oluştu", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Şifre sıfırlama işlemi için API endpoint'i
 * PUT /api/auth/reset-password
 * { "token": "TOKEN", "password": "YeniŞifre123!" }
 */
export async function PUT(request: NextRequest) {
  try {
    // İsteği JSON olarak al
    const body = await request.json();
    
    // Girişleri doğrula
    const validationResult = passwordResetSchema.safeParse(body);
    
    // Doğrulama hatası varsa, hata mesajını döndür
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      return NextResponse.json(
        { success: false, message: "Geçersiz giriş verileri", errors: formattedErrors },
        { status: 400 }
      );
    }
    
    // Doğrulanmış verileri al
    const { token, password } = validationResult.data;
    
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
        { success: false, message: "Şifre sıfırlama belirteci geçersiz veya süresi dolmuş" },
        { status: 400 }
      );
    }
    
    // Şifreyi hashle
    const hashedPassword = await hash(password, 12);
    
    // Kullanıcının şifresini ve token bilgilerini güncelle
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.isVerified = true; // Şifreyi sıfırladığında hesabı doğrulanmış kabul et
    await user.save();
    
    // Başarılı yanıt döndür
    return NextResponse.json({
      success: true,
      message: "Şifreniz başarıyla sıfırlandı. Şimdi yeni şifrenizle giriş yapabilirsiniz."
    });
  } catch (error: any) {
    console.error("Şifre sıfırlama hatası:", error.message);
    
    return NextResponse.json(
      { success: false, message: "Şifre sıfırlama sırasında bir hata oluştu", error: error.message },
      { status: 500 }
    );
  }
} 