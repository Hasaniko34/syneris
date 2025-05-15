import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongoose";
import User from "@/lib/models/User";
import Company from "@/lib/models/Company";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    await dbConnect();

    // Kullanıcı bilgilerini al ve şifre hariç dön
    const user = await User.findById(session.user.id).select("-password");
    
    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Şirket bilgisini getir
    let company = null;
    if (user.company) {
      company = await Company.findById(user.company);
    }

    // Kullanıcı bilgilerini düzenle
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
      location: user.location || "",
      bio: user.bio || "",
      image: user.image || "",
      skills: user.skills || [],
      education: user.education || [],
      certificates: user.certificates || [],
      joinDate: user.createdAt,
      company: company ? {
        id: company._id.toString(),
        name: company.name,
        domain: company.domain
      } : null,
      department: user.department || "",
      active: user.active,
      settings: user.settings || {}
    };

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error: any) {
    console.error("Kullanıcı bilgileri alınırken hata:", error);
    return NextResponse.json(
      { message: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
} 