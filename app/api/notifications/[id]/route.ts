import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Notification from '@/lib/models/Notification';
import mongoose from 'mongoose';
import { secureApiRoute, standardApiResponse } from '@/lib/utils/api-security';
import { apiLogger } from '@/lib/utils/api-logger';

/**
 * GET /api/notifications/[id]
 * Bildirim detaylarını getirir
 */
export async function GET(
  req: NextRequest
) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const userId = authData.session.user.id;
    
    // URL'den bildirim ID'sini al
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const notificationId = segments[segments.indexOf('notifications') + 1];
    
    // ID kontrolü
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Geçersiz bildirim ID'
      });
    }
    
    await connectToDatabase();
    
    // Bildirimi getir
    const notification = await Notification.findOne({
      _id: notificationId,
      userId
    });
    
    if (!notification) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: 'Bildirim bulunamadı'
      });
    }
    
    return standardApiResponse(notification, {
      message: 'Bildirim başarıyla alındı'
    });
  }, { 
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Bildirim Detayı'
  });
}

/**
 * PATCH /api/notifications/[id]
 * Bildirim güncelle (okundu olarak işaretle)
 */
export async function PATCH(
  req: NextRequest
) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const userId = authData.session.user.id;
    const userRole = authData.session.user.role;
    
    // URL'den bildirim ID'sini al
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const notificationId = segments[segments.indexOf('notifications') + 1];
    
    // ID kontrolü
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Geçersiz bildirim ID'
      });
    }
    
    const data = await req.json();
    
    await connectToDatabase();
    
    // Bildirimi güncelle
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { $set: { read: data.read } },
      { new: true }
    );
    
    if (!notification) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: 'Bildirim bulunamadı'
      });
    }
    
    // İşlemi logla
    apiLogger.logAuth(req, true, userId, userRole, {
      action: 'update-notification',
      notificationId,
      read: data.read
    });
    
    return standardApiResponse(notification, {
      message: 'Bildirim başarıyla güncellendi'
    });
  }, { 
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Bildirim Güncelleme'
  });
}

/**
 * DELETE /api/notifications/[id]
 * Bildirim siler
 */
export async function DELETE(
  req: NextRequest
) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const userId = authData.session.user.id;
    const userRole = authData.session.user.role;
    
    // URL'den bildirim ID'sini al
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const notificationId = segments[segments.indexOf('notifications') + 1];
    
    // ID kontrolü
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Geçersiz bildirim ID'
      });
    }
    
    await connectToDatabase();
    
    // Bildirimi sil
    const result = await Notification.findOneAndDelete({
      _id: notificationId,
      userId
    });
    
    if (!result) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: 'Bildirim bulunamadı'
      });
    }
    
    // İşlemi logla
    apiLogger.logAuth(req, true, userId, userRole, {
      action: 'delete-notification',
      notificationId
    });
    
    return standardApiResponse(null, {
      message: 'Bildirim başarıyla silindi'
    });
  }, { 
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Bildirim Silme'
  });
} 