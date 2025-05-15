import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongoose";
import User from "@/lib/models/User";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    // Veritabanı bağlantısı
    await dbConnect();

    // Kullanıcıyı bul
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Hassas bilgileri çıkararak kullanıcıyı döndür
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        company: user.company,
        role: user.role,
        phone: user.phone || "",
        department: user.department || "",
        location: user.location || "",
        bio: user.bio || "",
        createdAt: user.createdAt,
        skills: user.skills || [],
        education: user.education || [],
        notificationPreferences: user.notificationPreferences || {
          email: true,
          push: true,
          sms: false,
          courseUpdates: true,
          marketingEmails: false
        }
      }
    });
  } catch (error) {
    console.error("Profil bilgileri alma hatası:", error);
    return NextResponse.json(
      { error: "Profil bilgileri alınırken bir hata oluştu" },
      { status: 500 }
    );
  }
} 