import { NextRequest, NextResponse } from 'next/server';
import { getLearningPathById, updateLearningPath, deleteLearningPath } from '@/lib/services/learningPathService';
import { secureApiRoute, standardApiResponse } from '@/lib/utils/api-security';
import { apiLogger } from '@/lib/utils/api-logger';

export async function GET(
  request: NextRequest
) {
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    // URL'den öğrenme yolu ID'sini al
    const url = request.nextUrl.pathname;
    const segments = url.split('/');
    const id = segments[segments.indexOf('learning-paths') + 1];
    
    // Kullanıcı bilgilerini al
    const userId = authData.session.user.id;
    const userRole = authData.session.user.role;
    
    // Öğrenme yolunu getir
    const result = await getLearningPathById(id);
    
    if (!result.success) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: result.error
      });
    }
    
    // Manager rolü için şirket kontrolü
    if (userRole === 'manager' && 
        result.data.companyId && 
        result.data.companyId !== authData.session.user.company) {
      
      apiLogger.logSecurity(req, 'Manager rolü başka şirkete ait öğrenme yoluna erişim girişimi', {
        userId,
        userRole,
        learningPathId: id,
        learningPathCompany: result.data.companyId,
        userCompany: authData.session.user.company
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: 'Bu öğrenme yoluna erişim yetkiniz bulunmuyor'
      });
    }
    
    // İstek logla
    apiLogger.logAuth(req, true, userId, userRole, {
      action: 'get-learning-path',
      learningPathId: id,
      title: result.data.title
    });
    
    return standardApiResponse(result.data, {
      message: 'Öğrenme yolu başarıyla alındı'
    });
  }, { 
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Öğrenme Yolu Detayı'
  });
}

export async function PUT(
  request: NextRequest
) {
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    // URL'den öğrenme yolu ID'sini al
    const url = request.nextUrl.pathname;
    const segments = url.split('/');
    const id = segments[segments.indexOf('learning-paths') + 1];
    
    // Kullanıcı bilgilerini al
    const userId = authData.session.user.id;
    const userRole = authData.session.user.role;
    
    // Mevcut öğrenme yolunu kontrol et
    const existingPath = await getLearningPathById(id);
    if (!existingPath.success) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: existingPath.error || 'Öğrenme yolu bulunamadı'
      });
    }
    
    // Manager rolü için şirket kontrolü
    if (userRole === 'manager' && 
        existingPath.data.companyId && 
        existingPath.data.companyId !== authData.session.user.company) {
      
      apiLogger.logSecurity(req, 'Manager rolü başka şirkete ait öğrenme yolunu güncelleme girişimi', {
        userId,
        userRole,
        learningPathId: id
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: 'Bu öğrenme yolunu güncelleme yetkiniz bulunmuyor'
      });
    }
    
    // Güncelleme verilerini al
    const updateData = await req.json();
    
    // Trainer rolü sadece içerik güncelleyebilir, kritik alanları değiştiremez
    if (userRole === 'trainer') {
      // Kritik alanları güncelleme için filtrele
      delete updateData.companyId;
      delete updateData.createdBy;
      delete updateData.isPublished; // Yayınlama yetkisi yok
      
      apiLogger.logAuth(req, true, userId, userRole, {
        action: 'update-learning-path-filtered',
        learningPathId: id,
        filteredFields: ['companyId', 'createdBy', 'isPublished']
      });
    }
    
    // Güncelleme kaydını tut
    updateData.updatedBy = userId;
    updateData.updatedAt = new Date();
    
    // Öğrenme yolunu güncelle
    const result = await updateLearningPath(id, updateData);
    
    if (!result.success) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: result.error
      });
    }
    
    // Güncelleme logla
    apiLogger.logAuth(req, true, userId, userRole, {
      action: 'update-learning-path',
      learningPathId: id,
      title: result.data.title,
      updatedFields: Object.keys(updateData)
    });
    
    return standardApiResponse(result.data, {
      message: 'Öğrenme yolu başarıyla güncellendi'
    });
  }, { 
    allowedRoles: ['admin', 'manager', 'trainer'],
    operationName: 'Öğrenme Yolu Güncelleme'
  });
}

export async function DELETE(
  request: NextRequest
) {
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    // URL'den öğrenme yolu ID'sini al
    const url = request.nextUrl.pathname;
    const segments = url.split('/');
    const id = segments[segments.indexOf('learning-paths') + 1];
    
    // Kullanıcı bilgilerini al
    const userId = authData.session.user.id;
    const userRole = authData.session.user.role;
    
    // Mevcut öğrenme yolunu kontrol et
    const existingPath = await getLearningPathById(id);
    if (!existingPath.success) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: existingPath.error || 'Öğrenme yolu bulunamadı'
      });
    }
    
    // Trainer rolü için öğrenme yolu silme yetkisi yok
    if (userRole === 'trainer') {
      apiLogger.logSecurity(req, 'Trainer rolü öğrenme yolu silme girişimi', {
        userId,
        userRole,
        learningPathId: id
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: 'Eğitmen rolü öğrenme yolu silemez'
      });
    }
    
    // Manager rolü için şirket kontrolü
    if (userRole === 'manager' && 
        existingPath.data.companyId && 
        existingPath.data.companyId !== authData.session.user.company) {
      
      apiLogger.logSecurity(req, 'Manager rolü başka şirkete ait öğrenme yolunu silme girişimi', {
        userId,
        userRole,
        learningPathId: id
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: 'Bu öğrenme yolunu silme yetkiniz bulunmuyor'
      });
    }
    
    // Öğrenme yolunu sil
    const result = await deleteLearningPath(id);
    
    if (!result.success) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: result.error
      });
    }
    
    // Silme işlemini logla
    apiLogger.logAuth(req, true, userId, userRole, {
      action: 'delete-learning-path',
      learningPathId: id,
      title: existingPath.data.title
    });
    
    return standardApiResponse(null, {
      message: 'Öğrenme yolu başarıyla silindi'
    });
  }, { 
    allowedRoles: ['admin', 'manager'],
    operationName: 'Öğrenme Yolu Silme'
  });
} 