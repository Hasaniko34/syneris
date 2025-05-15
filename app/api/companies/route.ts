import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Company from "@/lib/models/Company";
import { secureApiRoute, standardApiResponse } from "@/lib/utils/api-security";
import { apiLogger } from "@/lib/utils/api-logger";

// Şirketleri listeleme
export async function GET(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    // Veritabanı bağlantısı
    await connectToDatabase();

    // URL parametrelerini al
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    // Şirketleri getir
    const total = await Company.countDocuments();
    const companies = await Company.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    return standardApiResponse({
      companies,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    }, {
      message: 'Şirketler başarıyla listelendi'
    });
  }, { 
    allowedRoles: ['admin'],
    operationName: 'Şirketleri Listeleme'
  });
}

// Yeni şirket oluşturma
export async function POST(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const data = await req.json();
    const { name, domain } = data;

    if (!name || !domain) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: "Şirket adı ve domain alanları zorunludur"
      });
    }

    // Veritabanı bağlantısı
    await connectToDatabase();

    // Domain'in benzersiz olduğunu kontrol et
    const existingCompany = await Company.findOne({ domain });
    if (existingCompany) {
      apiLogger.logSecurity(req, 'Var olan domain ile şirket oluşturma girişimi', {
        domain,
        userId: authData.session.user.id
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: "Bu domain ile kayıtlı bir şirket zaten mevcut"
      });
    }

    // Varsayılan ayarlarla yeni şirket oluştur
    const newCompany = new Company({
      name,
      domain,
      plan: "free",
      settings: {
        allowedEmailDomains: [domain],
        autoApproveUsers: true,
        defaultUserRole: "user",
        customization: {},
        features: {
          enabledFeatures: ["courses", "profile"],
          maxUsers: 10,
          maxCourses: 5,
          maxStorage: 1024
        }
      },
      createdBy: authData.session.user.id
    });

    await newCompany.save();
    
    // Başarılı işlemi logla
    apiLogger.logAuth(req, true, authData.session.user.id, authData.session.user.role, {
      action: 'create-company',
      companyId: newCompany._id,
      companyName: name,
      domain
    });

    return standardApiResponse(newCompany, {
      status: 201,
      message: "Şirket başarıyla oluşturuldu"
    });
  }, { 
    allowedRoles: ['admin'],
    operationName: 'Şirket Oluşturma'
  });
} 