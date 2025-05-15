import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { hash } from "bcryptjs";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongoose";
import User from "@/lib/models/User";
import Company from "@/lib/models/Company";
import { checkAuth } from "@/lib/utils/auth";

// Kullanıcı bilgilerini güncelle
export async function PUT(
  req: NextRequest
) {
  try {
    // URL'den kullanıcı ID'sini al
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const userId = segments[segments.indexOf('users') + 1];
    
    const authCheck = await checkAuth(req, ['admin', 'manager']);
    
    if (!authCheck.success) {
      return NextResponse.json(
        { message: authCheck.message },
        { status: authCheck.status }
      );
    }
    
    const session = authCheck.session;
    const body = await req.json();
    
    await dbConnect();
    
    // Kullanıcıyı bul
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }
    
    // Yetki kontrolü - manager sadece kendi şirketindeki kullanıcıları güncelleyebilir
    if (
      session.user.role === 'manager' && 
      user.company.toString() !== session.user.company
    ) {
      return NextResponse.json(
        { message: "Bu kullanıcıyı güncelleme yetkiniz yok" },
        { status: 403 }
      );
    }
    
    // Admin olmayan kullanıcılar admin rolü atayamaz
    if (body.role === 'admin' && session.user.role !== 'admin') {
      return NextResponse.json(
        { message: "Admin rolü atama yetkiniz yok" },
        { status: 403 }
      );
    }
    
    // Güncellenecek alanları belirle
    const updateData: any = {};
    
    if (body.name) updateData.name = body.name;
    if (body.role) updateData.role = body.role;
    if (typeof body.active === 'boolean') updateData.active = body.active;
    if (body.phone) updateData.phone = body.phone;
    if (body.location) updateData.location = body.location;
    if (body.department) updateData.department = body.department;
    if (body.bio) updateData.bio = body.bio;
    
    // Şirket güncellemesi (sadece admin yapabilir)
    if (body.company && session.user.role === 'admin') {
      // Şirket var mı kontrol et
      const company = await Company.findById(body.company);
      if (!company) {
        return NextResponse.json(
          { message: "Belirtilen şirket bulunamadı" },
          { status: 404 }
        );
      }
      updateData.company = body.company;
    }
    
    // Şifre güncellemesi
    if (body.password) {
      updateData.password = await hash(body.password, 10);
    }
    
    // Kullanıcıyı güncelle
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select("-password");
    
    return NextResponse.json(
      { message: "Kullanıcı başarıyla güncellendi", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Kullanıcı güncelleme hatası:", error);
    return NextResponse.json(
      { message: error.message || "Kullanıcı güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// Kullanıcıyı sil
export async function DELETE(
  req: NextRequest
) {
  try {
    // URL'den kullanıcı ID'sini al
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const userId = segments[segments.indexOf('users') + 1];
    
    const authCheck = await checkAuth(req, ['admin', 'manager']);
    
    if (!authCheck.success) {
      return NextResponse.json(
        { message: authCheck.message },
        { status: authCheck.status }
      );
    }
    
    const session = authCheck.session;
    
    await dbConnect();
    
    // Kullanıcıyı bul
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }
    
    // Yetki kontrolü - manager sadece kendi şirketindeki kullanıcıları silebilir
    if (
      session.user.role === 'manager' && 
      user.company.toString() !== session.user.company
    ) {
      return NextResponse.json(
        { message: "Bu kullanıcıyı silme yetkiniz yok" },
        { status: 403 }
      );
    }
    
    // Kendini silmeye çalışıyor mu?
    if (userId === session.user.id) {
      return NextResponse.json(
        { message: "Kendi hesabınızı silemezsiniz" },
        { status: 403 }
      );
    }
    
    // Adminleri sadece adminler silebilir
    if (user.role === 'admin' && session.user.role !== 'admin') {
      return NextResponse.json(
        { message: "Admin kullanıcıları silme yetkiniz yok" },
        { status: 403 }
      );
    }
    
    // Kullanıcıyı sil
    await User.findByIdAndDelete(userId);
    
    return NextResponse.json(
      { message: "Kullanıcı başarıyla silindi" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Kullanıcı silme hatası:", error);
    return NextResponse.json(
      { message: error.message || "Kullanıcı silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 