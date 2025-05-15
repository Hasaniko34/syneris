import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Company from "@/lib/models/Company";
import mongoose from "mongoose";
import { secureApiRoute, standardApiResponse } from "@/lib/utils/api-security";
import { apiLogger } from "@/lib/utils/api-logger";

// Şirket bilgilerini getirme
export async function GET(
  request: NextRequest
) {
  const id = request.nextUrl.pathname.split('/').pop();
  
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    // Veritabanı bağlantısı
    await connectToDatabase();

    // ID kontrolü
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: "Geçersiz şirket ID'si"
      });
    }

    // Şirketi getir
    const company = await Company.findById(id);

    if (!company) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: "Şirket bulunamadı"
      });
    }

    // Manager değilse, sadece kendi şirketine erişebilir
    if (authData.session.user.role === "manager" && 
        String(authData.session.user.company) !== String(company._id)) {
      
      apiLogger.logSecurity(req, 'Manager rolü başka şirkete erişim girişimi', {
        userId: authData.session.user.id,
        userRole: authData.session.user.role,
        userCompany: authData.session.user.company,
        requestedCompany: company._id
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: "Bu şirkete erişim yetkiniz yok"
      });
    }

    return standardApiResponse(company, {
      message: "Şirket bilgileri başarıyla alındı"
    });
  }, { 
    allowedRoles: ['admin', 'manager'],
    operationName: 'Şirket Detayı'
  });
}

// Şirket bilgilerini güncelleme
export async function PUT(
  request: NextRequest
) {
  const id = request.nextUrl.pathname.split('/').pop();
  
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    // Veritabanı bağlantısı
    await connectToDatabase();

    // ID kontrolü
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: "Geçersiz şirket ID'si"
      });
    }

    // Güncellenecek veriyi al
    const data = await req.json();
    
    // Şirketi bul
    const company = await Company.findById(id);

    if (!company) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: "Şirket bulunamadı"
      });
    }

    // Manager ise, sadece kendi şirketini güncelleyebilir
    if (authData.session.user.role === "manager" && 
        String(authData.session.user.company) !== String(company._id)) {
      
      apiLogger.logSecurity(req, 'Manager rolü başka şirketi güncelleme girişimi', {
        userId: authData.session.user.id,
        userRole: authData.session.user.role,
        userCompany: authData.session.user.company,
        requestedCompany: company._id
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: "Sadece kendi şirketinizin bilgilerini düzenleyebilirsiniz"
      });
    }

    // Plan değişikliğini sadece admin yapabilir
    if (data.plan && authData.session.user.role !== "admin") {
      apiLogger.logSecurity(req, 'Manager rolü şirket planını değiştirme girişimi', {
        userId: authData.session.user.id,
        userRole: authData.session.user.role,
        companyId: company._id
      });
      
      delete data.plan;
    }

    // Güvenli güncelleme: domain değişikliğine izin verme (kritik bir alan)
    if (data.domain && data.domain !== company.domain) {
      apiLogger.logSecurity(req, 'Şirket domain değiştirme girişimi', {
        userId: authData.session.user.id,
        userRole: authData.session.user.role,
        companyId: company._id,
        oldDomain: company.domain,
        newDomain: data.domain
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: "Domain değiştirilemez"
      });
    }
    
    // Güncelleme bilgilerini ekle
    data.updatedBy = authData.session.user.id;
    data.updatedAt = new Date();

    // Güncelleme
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    // İşlemi logla
    apiLogger.logAuth(req, true, authData.session.user.id, authData.session.user.role, {
      action: 'update-company',
      companyId: id,
      updatedFields: Object.keys(data)
    });

    return standardApiResponse(updatedCompany, {
      message: "Şirket bilgileri başarıyla güncellendi"
    });
  }, { 
    allowedRoles: ['admin', 'manager'],
    operationName: 'Şirket Güncelleme'
  });
}

// Şirketi silme
export async function DELETE(
  request: NextRequest
) {
  const id = request.nextUrl.pathname.split('/').pop();
  
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    // Veritabanı bağlantısı
    await connectToDatabase();

    // ID kontrolü
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: "Geçersiz şirket ID'si"
      });
    }

    // Şirketi bul
    const company = await Company.findById(id);
    
    if (!company) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: "Şirket bulunamadı"
      });
    }
    
    // Silme işlemini logla
    apiLogger.logAuth(req, true, authData.session.user.id, authData.session.user.role, {
      action: 'delete-company',
      companyId: id,
      companyName: company.name,
      domain: company.domain
    });

    // Şirketi sil
    await Company.findByIdAndDelete(id);

    return standardApiResponse(null, {
      message: "Şirket başarıyla silindi"
    });
  }, { 
    allowedRoles: ['admin'],
    operationName: 'Şirket Silme'
  });
} 