import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { dbConnect } from "@/lib/mongoose";
import User from '@/lib/models/User';
import Company from '@/lib/models/Company';
import { secureApiRoute, standardApiResponse, apiErrorResponse } from '@/lib/utils/api-security';

// Kullanıcıları listele
export async function GET(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    await dbConnect();
    
    const session = authData.session;
    const { searchParams } = new URL(req.url);
    
    // Sayfalama parametreleri
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const companyId = searchParams.get('company') || '';
    
    // Sorgu filtresi
    const filter: any = {};
    
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
    
    // Admin tüm kullanıcıları görüntüleyebilir, manager sadece kendi şirketinin kullanıcılarını
    if (session.user.role === 'manager') {
      filter.company = session.user.company;
    } else if (companyId && session.user.role === 'admin') {
      filter.company = companyId;
    }
    
    // Toplam sayıyı al
    const total = await User.countDocuments(filter);
    
    // Kullanıcıları getir
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    // Şirket isimlerini ekle
    const companyIds = users.map(user => user.company).filter(id => id);
    const companies = await Company.find({ _id: { $in: companyIds } });
    
    const usersWithCompanyNames = users.map(user => {
      const userData = user.toObject();
      const company = companies.find(c => c._id.toString() === user.company?.toString());
      
      return {
        ...userData,
        companyName: company ? company.name : null
      };
    });
    
    // Sayfalama bilgisi
    const pages = Math.ceil(total / limit);
    
    return standardApiResponse({
      users: usersWithCompanyNames,
      pagination: {
        total,
        page,
        limit,
        pages
      }
    }, { message: 'Kullanıcılar başarıyla listelendi' });
  }, { allowedRoles: ['admin', 'manager'] });
}

// Yeni kullanıcı ekle
export async function POST(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const session = authData.session;
    const { name, email, role, password, company } = await req.json();
    
    // Gerekli alanları kontrol et
    if (!name || !email || !password) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: "Tüm zorunlu alanları doldurunuz"
      });
    }
    
    await dbConnect();
    
    // E-posta kullanımda mı kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return standardApiResponse(null, {
        success: false,
        status: 409,
        message: "Bu e-posta adresi zaten kullanımda"
      });
    }
    
    // Şirket kontrolü
    let companyId = company;
    
    // Yönetici ise kendi şirketine ekler
    if (session.user.role === 'manager') {
      companyId = session.user.company;
      
      // Yönetici, admin ekleyemez
      if (role === 'admin') {
        return standardApiResponse(null, {
          success: false,
          status: 403,
          message: "Şirket yöneticileri admin kullanıcı ekleyemez"
        });
      }
    } else if (session.user.role === 'admin') {
      // Admin, şirket belirtmemişse hata ver
      if (!companyId) {
        return standardApiResponse(null, {
          success: false,
          status: 400,
          message: "Şirket belirtilmelidir"
        });
      }
      
      // Şirket var mı kontrol et
      const companyExists = await Company.findById(companyId);
      if (!companyExists) {
        return standardApiResponse(null, {
          success: false,
          status: 404,
          message: "Belirtilen şirket bulunamadı"
        });
      }
    }
    
    // Şifreyi hash'le
    const hashedPassword = await hash(password, 10);
    
    // Kullanıcıyı oluştur
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      company: companyId,
      role: role || 'user',
      active: true,
      isVerified: session.user.role === 'admin', // Admin tarafından eklenen kullanıcılar otomatik doğrulanır
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return standardApiResponse(
      { userId: user._id },
      { status: 201, message: "Kullanıcı başarıyla oluşturuldu" }
    );
  }, { allowedRoles: ['admin', 'manager'] });
} 