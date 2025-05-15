import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Company from "@/lib/models/Company";
import User from "@/lib/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { checkCompanyAuth } from "@/lib/utils/auth";

// Şirket kullanıcılarını listele
export async function GET(
  req: NextRequest
) {
  try {
    // URL'den şirket ID'sini al
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const companyId = segments[segments.indexOf('companies') + 1];
    
    // Yetki kontrolü - sadece admin ve manager erişebilir
    const authCheck = await checkCompanyAuth(req, companyId, ['admin', 'manager']);
    
    if (!authCheck.success) {
      return NextResponse.json(
        { message: authCheck.message },
        { status: authCheck.status }
      );
    }
    
    await connectToDatabase();
    
    // Şirket var mı kontrol et
    const company = await Company.findById(companyId);
    if (!company) {
      return NextResponse.json(
        { message: "Şirket bulunamadı" },
        { status: 404 }
      );
    }
    
    // URL parametrelerini al
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    
    // Sorgu filtresi
    const filter: any = { company: companyId };
    
    // Arama filtresi
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Rol filtresi
    if (role) {
      filter.role = role;
    }
    
    // Toplam sayıyı al
    const total = await User.countDocuments(filter);
    
    // Kullanıcıları getir
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    // Sayfalama bilgisi
    const pages = Math.ceil(total / limit);
    
    return NextResponse.json({
      users,
      pagination: {
        total,
        page,
        limit,
        pages
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error("Şirket kullanıcıları getirme hatası:", error);
    return NextResponse.json(
      { message: error.message || "Şirket kullanıcıları getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// Şirkete yeni kullanıcı ekleme
export async function POST(
  req: NextRequest
) {
  try {
    // URL'den şirket ID'sini al
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const id = segments[segments.indexOf('companies') + 1];
    
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    // Veritabanı bağlantısı
    await connectToDatabase();

    // ID kontrolü
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Geçersiz şirket ID'si" },
        { status: 400 }
      );
    }

    // Şirketi getir
    const company = await Company.findById(id);

    if (!company) {
      return NextResponse.json(
        { error: "Şirket bulunamadı" },
        { status: 404 }
      );
    }

    // Kullanıcının rolünü veritabanından al
    const sessionUser = await User.findOne({ email: session.user.email }).select("role company");
    
    if (!sessionUser) {
      return NextResponse.json(
        { error: "Oturum kullanıcısı bulunamadı" },
        { status: 403 }
      );
    }

    // Admin değilse veya manager değilse, yeni kullanıcı ekleyemez
    if (
      sessionUser.role !== "admin" && 
      !(sessionUser.role === "manager" && sessionUser.company === company.name)
    ) {
      return NextResponse.json(
        { error: "Bu şirkete kullanıcı ekleme yetkiniz yok" },
        { status: 403 }
      );
    }

    // Veriyi al
    const data = await req.json();
    const { name, email, role, password } = data;

    // Zorunlu alanları kontrol et
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Ad, e-posta ve şifre alanları zorunludur" },
        { status: 400 }
      );
    }

    // E-posta kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta adresi giriniz" },
        { status: 400 }
      );
    }

    // Kullanıcı e-posta kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi ile kayıtlı bir kullanıcı zaten mevcut" },
        { status: 400 }
      );
    }

    // Şirketin izin verilen domain kontrolü
    if (company.settings.allowedEmailDomains.length > 0) {
      const emailDomain = email.split('@')[1];
      if (!company.settings.allowedEmailDomains.includes(emailDomain)) {
        return NextResponse.json(
          { error: "Bu e-posta domaini şirket tarafından kabul edilmiyor" },
          { status: 400 }
        );
      }
    }

    // Şirketin kullanıcı limiti kontrolü
    const currentUserCount = await User.countDocuments({ company: company.name });
    if (currentUserCount >= company.settings.features.maxUsers) {
      return NextResponse.json(
        { error: `Şirket kullanıcı limitine (${company.settings.features.maxUsers}) ulaşıldı` },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcı rolünü kontrol et ve sınırla
    let userRole = role || company.settings.defaultUserRole;
    
    // Manager, admin rolünü atayamaz
    if (sessionUser.role === "manager" && userRole === "admin") {
      userRole = "user";
    }

    // Yeni kullanıcı oluştur
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      company: company.name,
      role: userRole,
      active: true
    });

    await newUser.save();

    // Hassas verileri gizle
    const userToReturn = { ...newUser.toObject() };
    delete userToReturn.password;
    delete userToReturn.resetPasswordToken;
    delete userToReturn.resetPasswordExpires;

    return NextResponse.json({
      success: true,
      message: "Kullanıcı başarıyla oluşturuldu",
      user: userToReturn
    });
  } catch (error) {
    console.error("Kullanıcı oluşturma hatası:", error);
    return NextResponse.json(
      { error: "Kullanıcı oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
} 