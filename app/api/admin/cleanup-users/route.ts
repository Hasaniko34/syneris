import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import mongoose from "mongoose";

/**
 * GEÇİCİ API - TÜM KULLANICILARI SİLER
 * Bu endpoint yalnızca geliştirme amaçlıdır ve üretimde devre dışı bırakılmalıdır.
 * GET /api/admin/cleanup-users
 */
export async function GET(req: NextRequest) {
  try {
    // Üretim ortamında çalışmasını engelle
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { success: false, message: "Bu endpoint yalnızca geliştirme ortamında kullanılabilir" },
        { status: 403 }
      );
    }

    console.log("Veritabanına bağlanılıyor...");
    await dbConnect();
    console.log("Veritabanı bağlantısı başarılı");

    // Doğrudan bağlantı üzerinden koleksiyona eriş
    const db = mongoose.connection.db;
    
    // db'nin tanımlı olup olmadığını kontrol et
    if (!db) {
      console.error("Veritabanı bağlantısı bulunamadı");
      return NextResponse.json(
        { success: false, message: "Veritabanı bağlantısı sağlanamadı" },
        { status: 500 }
      );
    }
    
    const usersCollection = db.collection("users");

    // Tüm kullanıcıları sil
    const result = await usersCollection.deleteMany({});

    console.log(`${result.deletedCount} kullanıcı silindi`);

    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} kullanıcı başarıyla silindi`,
      deleted: result.deletedCount
    });
  } catch (error: any) {
    console.error("Kullanıcı temizleme hatası:", error);
    return NextResponse.json(
      { success: false, message: "Kullanıcılar silinirken bir hata oluştu: " + error.message },
      { status: 500 }
    );
  }
} 