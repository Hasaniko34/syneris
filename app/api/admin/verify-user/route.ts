import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import User from "@/lib/models/User";

/**
 * Kullanıcı hesabını doğrulayan API endpoint
 * GET /api/admin/verify-user?email=user@example.com
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");
    
    // E-posta parametresi kontrolü
    if (!email) {
      return NextResponse.json(
        { success: false, message: "E-posta adresi belirtilmemiş" },
        { status: 400 }
      );
    }
    
    console.log(`'${email}' e-posta adresine sahip kullanıcı doğrulanıyor...`);
    
    // Veritabanına bağlan
    await dbConnect();
    
    // Kullanıcıyı bul ve güncelle
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: `'${email}' e-posta adresine sahip kullanıcı bulunamadı` },
        { status: 404 }
      );
    }
    
    // Kullanıcı zaten doğrulanmışsa
    if (user.isVerified) {
      return NextResponse.json({
        success: true,
        message: `'${email}' e-posta adresine sahip kullanıcı zaten doğrulanmış`,
        alreadyVerified: true
      });
    }
    
    // Kullanıcıyı doğrulanmış olarak işaretle
    user.isVerified = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: `'${email}' e-posta adresine sahip kullanıcı başarıyla doğrulandı`
    });
  } catch (error: any) {
    console.error("Kullanıcı doğrulama hatası:", error);
    return NextResponse.json(
      { success: false, message: "Kullanıcı doğrulanırken bir hata oluştu: " + error.message },
      { status: 500 }
    );
  }
} 