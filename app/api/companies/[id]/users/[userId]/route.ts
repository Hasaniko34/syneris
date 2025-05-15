import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Company from "@/lib/models/Company";
import User from "@/lib/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Belirli bir kullanıcının bilgilerini getirme
export async function GET(
  req: NextRequest
) {
  try {
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const id = segments[segments.indexOf('companies') + 1];
    const userId = segments[segments.indexOf('users') + 1];
    
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

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Geçersiz kullanıcı ID'si" },
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

    // Kullanıcıyı getir
    const user = await User.findById(userId).select("-password -resetPasswordToken -resetPasswordExpires");

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Kullanıcının bu şirkete ait olduğunu kontrol et
    if (user.company !== company.name) {
      return NextResponse.json(
        { error: "Kullanıcı bu şirkete ait değil" },
        { status: 400 }
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

    // Admin değilse veya manager değilse, kullanıcı bilgilerini göremez
    if (
      sessionUser.role !== "admin" && 
      !(sessionUser.role === "manager" && sessionUser.company === company.name) &&
      session.user.email !== user.email
    ) {
      return NextResponse.json(
        { error: "Bu kullanıcının bilgilerini görüntüleme yetkiniz yok" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Kullanıcı bilgisi getirme hatası:", error);
    return NextResponse.json(
      { error: "Kullanıcı bilgileri alınırken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// Kullanıcı bilgilerini güncelleme
export async function PUT(
  req: NextRequest
) {
  try {
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const id = segments[segments.indexOf('companies') + 1];
    const userId = segments[segments.indexOf('users') + 1];
    
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
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

    // Veritabanı bağlantısı
    await connectToDatabase();

    // ID kontrolü
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Geçersiz şirket ID'si" },
        { status: 400 }
      );
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Geçersiz kullanıcı ID'si" },
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

    // Kullanıcıyı getir
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Kullanıcının bu şirkete ait olduğunu kontrol et
    if (user.company !== company.name) {
      return NextResponse.json(
        { error: "Kullanıcı bu şirkete ait değil" },
        { status: 400 }
      );
    }

    // Kullanıcıyı güncelleme yetkisi kontrolü
    const isAdmin = sessionUser.role === "admin";
    const isManager = sessionUser.role === "manager" && sessionUser.company === company.name;
    const isSelf = session.user.email === user.email;

    if (!isAdmin && !isManager && !isSelf) {
      return NextResponse.json(
        { error: "Bu kullanıcıyı güncelleme yetkiniz yok" },
        { status: 403 }
      );
    }

    // Güncellenecek verileri al
    const data = await req.json();
    const { name, role, password, active } = data;

    // Güncelleme verilerini hazırla
    const updateData: any = {};
    
    if (name) updateData.name = name;
    
    // Role güncelleme yetkisi kontrolü
    if (role) {
      // Admin her rolü atayabilir
      if (isAdmin) {
        updateData.role = role;
      }
      // Manager, admin rolünü atayamaz
      else if (isManager && role !== "admin") {
        updateData.role = role;
      }
      // Kendini admin yapamazsın
      else if (isSelf && role !== "admin") {
        updateData.role = role;
      }
    }
    
    // Şifre güncelleme
    if (password) {
      // Admin ve manager şifre güncelleyebilir
      // Kullanıcı kendi şifresini güncelleyebilir
      if (isAdmin || isManager || isSelf) {
        updateData.password = await bcrypt.hash(password, 10);
      }
    }
    
    // Aktiflik durumu güncelleme (sadece admin ve manager)
    if (active !== undefined && (isAdmin || isManager)) {
      updateData.active = active;
    }

    // Güncelleme
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password -resetPasswordToken -resetPasswordExpires");

    return NextResponse.json({
      success: true,
      message: "Kullanıcı başarıyla güncellendi",
      user: updatedUser
    });
  } catch (error) {
    console.error("Kullanıcı güncelleme hatası:", error);
    return NextResponse.json(
      { error: "Kullanıcı güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// Kullanıcıyı silme
export async function DELETE(
  req: NextRequest
) {
  try {
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const id = segments[segments.indexOf('companies') + 1];
    const userId = segments[segments.indexOf('users') + 1];
    
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
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

    // Veritabanı bağlantısı
    await connectToDatabase();

    // ID kontrolü
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Geçersiz şirket ID'si" },
        { status: 400 }
      );
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Geçersiz kullanıcı ID'si" },
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

    // Kullanıcıyı getir
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Kullanıcının bu şirkete ait olduğunu kontrol et
    if (user.company !== company.name) {
      return NextResponse.json(
        { error: "Kullanıcı bu şirkete ait değil" },
        { status: 400 }
      );
    }

    // Kullanıcıyı silme yetkisi kontrolü (sadece admin ve manager)
    const isAdmin = sessionUser.role === "admin";
    const isManager = sessionUser.role === "manager" && sessionUser.company === company.name;

    if (!isAdmin && !isManager) {
      return NextResponse.json(
        { error: "Bu kullanıcıyı silme yetkiniz yok" },
        { status: 403 }
      );
    }

    // Kullanıcıyı sil
    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      success: true,
      message: "Kullanıcı başarıyla silindi"
    });
  } catch (error) {
    console.error("Kullanıcı silme hatası:", error);
    return NextResponse.json(
      { error: "Kullanıcı silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 