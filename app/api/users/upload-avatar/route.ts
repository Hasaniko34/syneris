import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    // Form verilerini alma
    const formData = await req.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Resim dosyası bulunamadı" },
        { status: 400 }
      );
    }

    // Dosya uzantısını kontrol etme
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension || '')) {
      return NextResponse.json(
        { error: "Sadece jpg, jpeg, png ve webp dosyaları kabul edilir" },
        { status: 400 }
      );
    }

    // Dosya boyutunu kontrol etme (1MB = 1048576 bytes)
    if (file.size > 1048576) {
      return NextResponse.json(
        { error: "Dosya boyutu 1MB'tan küçük olmalıdır" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', 'avatars', fileName);
    
    // Dosyayı kaydetme
    await writeFile(filePath, buffer);
    const avatarUrl = `/uploads/avatars/${fileName}`;

    // Veritabanı bağlantısı 
    await connectToDatabase();

    // Kullanıcının profil resmini güncelleme
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { image: avatarUrl },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: "Profil resmi başarıyla güncellendi",
      avatarUrl 
    });
  } catch (error) {
    console.error("Profil resmi yükleme hatası:", error);
    return NextResponse.json(
      { error: "Profil resmi yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 