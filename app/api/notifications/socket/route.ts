import { NextRequest } from 'next/server';
import { WebSocketServer } from 'ws';
import { parse } from 'cookie';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { notificationEvents, NotificationEvent } from '@/lib/services/notificationService';
import mongoose from 'mongoose';

// Aktif bağlantıları saklamak için Map
const connections = new Map();
let wsServer: WebSocketServer | null = null;

// WebSocket sunucusunu başlat
function initWsServer() {
  if (wsServer) return;
  
  // WebSocket sunucusunu oluştur (port numarasını değiştirerek çalıştırın)
  wsServer = new WebSocketServer({ port: parseInt(process.env.WS_PORT || '3001') });
  
  wsServer.on('connection', async (ws, req) => {
    try {
      // Cookie'den oturum bilgisini al
      const cookies = parse(req.headers.cookie || '');
      const sessionToken = cookies['next-auth.session-token'];
      
      if (!sessionToken) {
        ws.close(1008, 'Oturum bulunamadı');
        return;
      }
      
      // Oturumu doğrula ve kullanıcı ID'sini al
      const session = await getServerSession(authOptions);
      // Session yapısı kontrol edilmeli: Next.js 15.3 ile session.user.id
      // olmayabilir, bu durumda email üzerinden kullanıcıyı sorgulayabiliriz
      let userId = null;
      
      if (session?.user?.email) {
        const user = await mongoose.models.User.findOne({ email: session.user.email });
        if (user) {
          userId = user._id.toString();
        }
      }
      
      if (!userId) {
        ws.close(1008, 'Geçersiz oturum');
        return;
      }
      
      // Kullanıcı bağlantısını kaydet
      connections.set(userId, ws);
      
      // Bağlantı kapatıldığında temizlik yap
      ws.on('close', () => {
        connections.delete(userId);
      });
      
      // Ping-pong ile bağlantı kontrolü
      ws.on('ping', () => {
        ws.pong();
      });
      
      // Hoşgeldin mesajı gönder
      ws.send(JSON.stringify({
        type: 'connected',
        message: 'Bildirim sistemine bağlanıldı'
      }));
      
    } catch (error) {
      console.error('WebSocket bağlantı hatası:', error);
      ws.close(1011, 'Sunucu hatası');
    }
  });
  
  // Bildirim olaylarını dinle
  notificationEvents.on(NotificationEvent.NEW_NOTIFICATION, (data) => {
    const { recipientId, notification } = data;
    sendToUser(recipientId, {
      type: NotificationEvent.NEW_NOTIFICATION,
      data: notification
    });
  });
  
  notificationEvents.on(NotificationEvent.READ_NOTIFICATION, (data) => {
    const { userId } = data;
    sendToUser(userId, {
      type: NotificationEvent.READ_NOTIFICATION,
      data
    });
  });
  
  notificationEvents.on(NotificationEvent.DELETE_NOTIFICATION, (data) => {
    const { userId } = data;
    sendToUser(userId, {
      type: NotificationEvent.DELETE_NOTIFICATION,
      data
    });
  });
}

// Belirli bir kullanıcıya mesaj gönder
function sendToUser(userId: string, data: any) {
  const ws = connections.get(userId);
  if (ws && ws.readyState === 1) { // WebSocket.OPEN
    ws.send(JSON.stringify(data));
  }
}

export async function GET(req: NextRequest) {
  // WebSocket sunucusu başlat
  initWsServer();
  
  // WebSocket bağlantı bilgilerini döndür
  return new Response(JSON.stringify({
    wsEndpoint: `ws://${req.headers.get('host')?.split(':')[0] || 'localhost'}:${process.env.WS_PORT || '3001'}/api/notifications/socket`,
    status: 'available'
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
} 