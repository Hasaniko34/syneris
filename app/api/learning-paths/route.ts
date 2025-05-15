import { NextRequest, NextResponse } from 'next/server';
import { getAllLearningPaths, createLearningPath } from '@/lib/services/learningPathService';
import { secureApiRoute, standardApiResponse } from '@/lib/utils/api-security';
import { apiLogger } from '@/lib/utils/api-logger';

export async function GET(request: NextRequest) {
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    // URL parametrelerini al
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId') || undefined;
    const category = searchParams.get('category') || undefined;
    const level = searchParams.get('level') || undefined;
    const published = searchParams.get('published') !== 'false';
    
    // Kullanıcı rolüne göre erişim kısıtlamaları
    let effectiveCompanyId = companyId;
    const userRole = authData.session.user.role;
    const userId = authData.session.user.id;
    
    // Manager rolü sadece kendi şirketinin öğrenme yollarını görebilir
    if (userRole === 'manager') {
      effectiveCompanyId = authData.session.user.company;
      
      apiLogger.logAuth(req, true, userId, userRole, {
        action: 'get-learning-paths',
        originalCompanyId: companyId,
        effectiveCompanyId: effectiveCompanyId,
        message: 'Manager rolü kendi şirketine kısıtlandı'
      });
    }
    
    // Tüm öğrenme yollarını getir
    const result = await getAllLearningPaths(effectiveCompanyId, category, level, published);
    
    if (!result.success) {
      return standardApiResponse(null, {
        success: false, 
        status: 404,
        message: result.error
      });
    }
    
    return standardApiResponse(result.data, {
      message: 'Öğrenme yolları başarıyla alındı'
    });
  }, { 
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Öğrenme Yolları Listele'
    });
}

export async function POST(request: NextRequest) {
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    // Gönderilen verileri al
    const data = await req.json();
    
    // Veri doğrulama
    if (!data.title || !data.description) {
      return standardApiResponse(null, {
      success: false, 
        status: 400,
        message: 'Başlık ve açıklama alanları zorunludur'
      });
  }
    
    // Kullanıcı rolüne göre ek kontroller
    const userRole = authData.session.user.role;
    const userId = authData.session.user.id;
    
    // Manager rolü sadece kendi şirketine öğrenme yolu ekleyebilir
    if (userRole === 'manager' && data.companyId && data.companyId !== authData.session.user.company) {
      apiLogger.logSecurity(req, 'Manager rolü başka şirkete öğrenme yolu ekleme girişimi', {
        userId,
        userRole,
        requestedCompanyId: data.companyId,
        userCompanyId: authData.session.user.company
      });
      
      return standardApiResponse(null, {
        success: false, 
        status: 403,
        message: 'Sadece kendi şirketiniz için öğrenme yolu oluşturabilirsiniz'
      });
    }
    
    // Şirket bilgisini ekle
    if (userRole === 'manager') {
      data.companyId = authData.session.user.company;
    }
    
    // Oluşturan kullanıcı bilgisini ekle
    data.createdBy = userId;
    
    // Yeni öğrenme yolu oluştur
    const result = await createLearningPath(data);
    
    if (!result.success) {
      return standardApiResponse(null, {
        success: false, 
        status: 400,
        message: result.error
      });
    }
    
    // Başarılı sonucu logla
    apiLogger.logAuth(req, true, userId, userRole, {
      action: 'create-learning-path',
      learningPathId: result.data._id,
      title: data.title
    });
    
    return standardApiResponse(result.data, {
      status: 201,
      message: 'Öğrenme yolu başarıyla oluşturuldu'
    });
  }, { 
    allowedRoles: ['admin', 'manager', 'trainer'],
    operationName: 'Öğrenme Yolu Oluştur'
  });
} 