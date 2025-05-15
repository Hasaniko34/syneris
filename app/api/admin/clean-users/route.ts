import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";
import { secureApiRoute, standardApiResponse } from "@/lib/utils/api-security";
import { apiLogger } from "@/lib/utils/api-logger";

export async function GET(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    // Ek güvenlik kontrolü - özel bir parametre iste
    const { searchParams } = new URL(req.url);
    const confirmKey = searchParams.get('confirmKey');
    
    // Güvenlik anahtarı kontrolü
    if (confirmKey !== process.env.ADMIN_CLEANUP_KEY) {
      apiLogger.logSecurity(req, 'Geçersiz temizleme anahtarı kullanım girişimi', {
        userId: authData.session.user.id,
        userRole: authData.session.user.role
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 401,
        message: "Geçersiz güvenlik anahtarı. Bu işlem için özel yetkilendirme gereklidir."
      });
    }
    
    // Sadece production dışı ortamlarda çalıştır
    if (process.env.NODE_ENV === 'production') {
      apiLogger.logSecurity(req, 'Üretim ortamında kullanıcı temizleme girişimi', {
        userId: authData.session.user.id,
        userRole: authData.session.user.role
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: "Bu işlem üretim ortamında gerçekleştirilemez."
      });
    }
    
    // SİLME İŞLEMİ DEVRE DIŞI BIRAKILDI
    apiLogger.logAuth(req, false, authData.session.user.id, authData.session.user.role, {
      action: 'clean-users',
      message: 'Kullanıcı silme işlemi devre dışı bırakıldı'
    });
    
    return standardApiResponse(null, {
      success: false,
      message: "Kullanıcı silme işlemi güvenlik nedeniyle devre dışı bırakılmıştır. Kullanıcılar silinmedi."
    });
    
    /* Eski silme kodu yorum satırına alındı
    // MongoDB bağlantısını kur
    await connectToDatabase();
    
    // İşlemi log kaydet
    apiLogger.logAuth(req, true, authData.session.user.id, authData.session.user.role, {
      action: 'clean-users',
      message: 'Kullanıcı temizleme başlatıldı'
    });
    
    // Tüm kullanıcıları bul ve sil
    if (mongoose.models.User) {
      const result = await mongoose.models.User.deleteMany({});
      
      // Sonuç logla
      apiLogger.logAuth(req, true, authData.session.user.id, authData.session.user.role, {
        action: 'clean-users',
        result: result,
        message: `${result.deletedCount} kullanıcı silindi`
      });
      
      return standardApiResponse({
        deletedCount: result.deletedCount,
        acknowledged: result.acknowledged
      }, {
        status: 200,
        message: `${result.deletedCount} kullanıcı başarıyla silindi`
      });
    } else {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: "User modeli bulunamadı"
      });
    }
    */
  }, { 
    allowedRoles: ['admin'],
    operationName: 'Kullanıcı Temizleme İşlemi'
  });
} 