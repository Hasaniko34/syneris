import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { dbConnect } from "@/lib/mongoose";
import User from "@/lib/models/User";

// Kayıt isteği için doğrulama şeması
const signupSchema = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır" }).max(50),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  password: z
    .string()
    .min(8, { message: "Şifre en az 8 karakter olmalıdır" })
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir" }
    ),
  company: z.string().min(2, { message: "Şirket adı en az 2 karakter olmalıdır" }).max(100),
});

/**
 * Kullanıcı kaydı için API endpoint'i
 * POST /api/auth/signup
 */
export async function POST(request: NextRequest) {
  try {
    // İsteği JSON olarak al
    const body = await request.json();
    
    // Girişleri doğrula
    const validationResult = signupSchema.safeParse(body);
    
    // Doğrulama hatası varsa, hata mesajını döndür
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      return NextResponse.json(
        { success: false, message: "Geçersiz giriş verileri", errors: formattedErrors },
        { status: 400 }
      );
    }
    
    // Doğrulanmış verileri al
    const { name, email, password, company } = validationResult.data;
    
    // Veritabanına bağlan
    await dbConnect();
    
    // E-posta adresinin daha önce kullanılıp kullanılmadığını kontrol et
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Bu e-posta adresi zaten kullanılıyor" },
        { status: 409 }
      );
    }
    
    // Şifreyi hashle
    const hashedPassword = await hash(password, 12);
    
    // Doğrulama belirteci oluştur (gerçek uygulamada bir UUID veya güvenli bir rastgele dize kullanın)
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Kullanıcıyı veritabanına kaydet
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      company,
      role: "user", // Varsayılan rol
      active: true,
      isVerified: false, // Hesap doğrulanana kadar false
      resetPasswordToken: verificationToken,
      resetPasswordExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 saat geçerli
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Yeni kullanıcı bilgilerini hassas alanlar olmadan döndür
    return NextResponse.json(
      {
        success: true,
        message: "Kullanıcı kaydı başarılı. Lütfen e-posta adresinizi doğrulayın",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          company: newUser.company,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Kullanıcı kaydı hatası:", error.message);
    
    // Şema doğrulama dışındaki hatalar için
    return NextResponse.json(
      { success: false, message: "Kullanıcı kaydı sırasında bir hata oluştu", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * E-posta adresinin kullanılabilirliğini kontrol etme için API endpoint'i
 * GET /api/auth/signup?email=user@example.com
 */
export async function GET(request: NextRequest) {
  try {
    // URL parametrelerini al
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");
    
    // E-posta parametresi yoksa hata döndür
    if (!email) {
      return NextResponse.json(
        { success: false, message: "E-posta parametresi gereklidir" },
        { status: 400 }
      );
    }
    
    // Veritabanına bağlan
    await dbConnect();
    
    // E-posta adresinin kullanımda olup olmadığını kontrol et
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    // Yanıtı döndür
    return NextResponse.json({
      success: true,
      available: !existingUser,
      message: existingUser 
        ? "Bu e-posta adresi zaten kullanılıyor"
        : "Bu e-posta adresi kullanılabilir",
    });
  } catch (error: any) {
    console.error("E-posta kontrolü hatası:", error.message);
    
    return NextResponse.json(
      { success: false, message: "E-posta kontrolü sırasında bir hata oluştu", error: error.message },
      { status: 500 }
    );
  }
} 