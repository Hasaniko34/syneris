import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongoose";
import User from "@/lib/models/User";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { 
      name, 
      phone, 
      department, 
      location, 
      bio, 
      skills, 
      education,
      notificationPreferences
    } = data;

    // Temel veri doğrulama
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: "İsim alanı boş olamaz" },
        { status: 400 }
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

    // Kullanıcı bilgilerini güncelleme
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        name,
        phone,
        department,
        location,
        bio,
        ...(skills && { skills }),
        ...(education && { education }),
        ...(notificationPreferences && { notificationPreferences })
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Kullanıcı güncellenirken bir hata oluştu" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profil başarıyla güncellendi",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        phone: updatedUser.phone || "",
        department: updatedUser.department || "",
        location: updatedUser.location || "",
        bio: updatedUser.bio || "",
        company: updatedUser.company,
        role: updatedUser.role,
        skills: updatedUser.skills || [],
        education: updatedUser.education || [],
        notificationPreferences: updatedUser.notificationPreferences || {
          email: true,
          push: true,
          sms: false,
          courseUpdates: true,
          marketingEmails: false
        }
      }
    });
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    return NextResponse.json(
      { error: "Profil güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 