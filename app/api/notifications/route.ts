import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Notification from '@/lib/models/Notification';
import User from '@/lib/models/User';
import mongoose from 'mongoose';
import { secureApiRoute, standardApiResponse } from '@/lib/utils/api-security';
import { apiLogger } from '@/lib/utils/api-logger';

/**
 * GET /api/notifications
 * Kullanıcının bildirimlerini döndürür
 */
export async function GET(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const userId = authData.session.user.id;
    const { searchParams } = new URL(req.url);
    
    // Query parametreleri
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const read = searchParams.get('read');
    const type = searchParams.get('type');
    
    await connectToDatabase();
    
    // Query oluştur
    const query: any = { userId };
    
    // Filtreler
    if (read !== null) {
      query.read = read === 'true';
    }
    
    if (type) {
      query.type = type;
    }
    
    // Bildirimleri getir
    const total = await Notification.countDocuments(query);
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    // Okunmamış bildirim sayısını getir
    const unreadCount = await Notification.countDocuments({ 
      userId, 
      read: false 
    });
    
    return standardApiResponse({
      notifications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      unreadCount
    }, {
      message: 'Bildirimler başarıyla alındı'
    });
  }, { 
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Bildirimleri Listeleme'
  });
}

/**
 * POST /api/notifications
 * Yeni bildirim oluşturur (sadece admin ve manager rolü için)
 */
export async function POST(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const data = await req.json();
    const userRole = authData.session.user.role;
    const userId = authData.session.user.id;
    
    if (!data.type || !data.title || !data.message) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Eksik veya geçersiz veriler'
      });
    }
    
    await connectToDatabase();
    
    // Hedef kullanıcıları belirle
    let userIds: mongoose.Types.ObjectId[] = [];
    
    if (data.userId) {
      // Belirli bir kullanıcıya bildirim gönder
      userIds = [new mongoose.Types.ObjectId(data.userId)];
    } else if (data.userIds && Array.isArray(data.userIds)) {
      // Belirli kullanıcılara bildirim gönder
      userIds = data.userIds.map((id: string) => new mongoose.Types.ObjectId(id));
    } else if (data.companyId) {
      // Manager rolü için şirket kontrolü
      if (userRole === 'manager' && data.companyId !== authData.session.user.company) {
        apiLogger.logSecurity(req, 'Manager rolü başka şirkete bildirim gönderme girişimi', {
          userId,
          userRole,
          requestedCompanyId: data.companyId,
          userCompanyId: authData.session.user.company
        });
        
        return standardApiResponse(null, {
          success: false,
          status: 403,
          message: 'Sadece kendi şirketinize bildirim gönderebilirsiniz'
        });
      }
      
      // Şirketteki tüm kullanıcılara bildirim gönder
      const users = await User.find({ company: data.companyId }, '_id');
      userIds = users.map(user => user._id);
    } else {
      // Hedef belirtilmemiş, hata döndür
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Bildirim hedefi belirtilmedi'
      });
    }
    
    // Toplu bildirim oluştur
    const notifications = userIds.map(userId => ({
      userId,
      type: data.type,
      title: data.title,
      message: data.message,
      link: data.link || null,
      read: false,
      createdBy: authData.session.user.id
    }));
    
    const result = await Notification.insertMany(notifications);
    
    // İşlemi logla
    apiLogger.logAuth(req, true, userId, userRole, {
      action: 'create-notifications',
      count: notifications.length,
      type: data.type,
      title: data.title
    });
    
    return standardApiResponse({
      count: notifications.length,
      success: true
    }, {
      message: `${notifications.length} bildirim başarıyla oluşturuldu`
    });
  }, { 
    allowedRoles: ['admin', 'manager'],
    operationName: 'Bildirim Oluşturma'
  });
}

/**
 * PUT /api/notifications
 * Tüm bildirimleri okundu olarak işaretle
 */
export async function PUT(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const userId = authData.session.user.id;
    
    await connectToDatabase();
    
    const result = await Notification.updateMany(
      { userId, read: false },
      { $set: { read: true } }
    );
    
    // İşlemi logla
    apiLogger.logAuth(req, true, userId, authData.session.user.role, {
      action: 'mark-notifications-read',
      count: result.modifiedCount
    });
    
    return standardApiResponse({
      modifiedCount: result.modifiedCount
    }, {
      message: `${result.modifiedCount} bildirim okundu olarak işaretlendi`
    });
  }, { 
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Bildirimleri Okundu İşaretleme'
  });
} 