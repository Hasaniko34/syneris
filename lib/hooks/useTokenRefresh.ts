import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Access token yenileme hook'u
 * 
 * @param refreshInterval - Yenileme kontrolü için interval süresi (ms) (varsayılan: 5 dakika)
 * @param refreshThreshold - Token süre bitiminden kaç saniye önce yenileme başlatılacak (varsayılan: 5 dakika)
 * @param onError - Hata durumunda çağrılacak callback fonksiyonu
 */
export function useTokenRefresh({
  refreshInterval = 5 * 60 * 1000, // 5 dakika
  refreshThreshold = 5 * 60, // 5 dakika (saniye cinsinden)
  onError = (error: Error) => console.error('Token yenileme hatası:', error),
}: {
  refreshInterval?: number;
  refreshThreshold?: number;
  onError?: (error: Error) => void;
} = {}) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Yenileme işlemi için fonksiyon
  const refreshToken = async () => {
    try {
      console.log('Token yenileme talebi gönderiliyor...');
      
      const response = await fetch('/api/auth/refresh', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Token yenileme başarısız');
      }
      
      // Oturumu güncelle
      await update();
      
      console.log('Token başarıyla yenilendi');
      return true;
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Bilinmeyen hata'));
      return false;
    }
  };
  
  // İşlem başladığında ve session değiştiğinde çalış
  useEffect(() => {
    // Eğer oturum yoksa veya yüklenmediyse işlem yapma
    if (status !== 'authenticated' || !session) {
      // Eğer bir zamanlayıcı varsa temizle
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      return;
    }
    
    // Token kontrolü ve yenileme intervalı başlat
    const startTokenRefreshTimer = () => {
      // Eğer bir zamanlayıcı varsa temizle
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
      
      // Yeni zamanlayıcı oluştur
      refreshTimerRef.current = setInterval(async () => {
        // Eğer oturum yoksa veya expires yoksa işlem yapma
        if (!session || !session.expires) return;
        
        // Token son kullanma tarihini hesapla
        const expiresAt = new Date(session.expires).getTime();
        const now = Date.now();
        const secondsLeft = Math.floor((expiresAt - now) / 1000);
        
        // Debug için kalan süreyi yazdır
        // console.log(`Token geçerlilik süresi: ${secondsLeft} saniye`);
        
        // Eğer yenileme eşiğine ulaşıldıysa token'ı yenile
        if (secondsLeft <= refreshThreshold) {
          console.log(`Token yenileme eşiğine ulaşıldı (${secondsLeft} saniye kaldı)`);
          const success = await refreshToken();
          
          // Eğer yenileme başarısız olduysa ve token süresi dolduysa, oturumu kapat
          if (!success && secondsLeft <= 0) {
            console.warn('Token süresi doldu ve yenileme başarısız oldu, oturum sonlandırılıyor');
            router.push('/auth/signin?error=TokenExpired');
          }
        }
      }, refreshInterval);
    };
    
    // Zamanlayıcıyı başlat
    startTokenRefreshTimer();
    
    // Temizleme fonksiyonu
    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };
  }, [session, status, refreshInterval, refreshThreshold, update, router, onError]);
  
  // Token'ı manuel olarak yenilemek için fonksiyonu dışa aktar
  return { refreshToken };
} 