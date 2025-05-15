'use client';

import { NextAuthProvider } from '@/lib/auth/NextAuthProvider';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface TokenRefreshErrorProps {
  message: string;
}

// Token yenileme hatası bileşeni
function TokenRefreshError({ message }: TokenRefreshErrorProps) {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: 'Oturum Hatası',
      description: message,
      variant: 'destructive',
    });
  }, [message, toast]);
  
  return null; // Görsel rendering yapmaz
}

export function Providers({ children }: React.PropsWithChildren) {
  const [tokenRefreshError, setTokenRefreshError] = useState<string | null>(null);
  
  return (
    <NextAuthProvider>
      {/* Token yenileme işlemleri TokenRefreshWrapper içerisinde yapılacak */}
      <TokenRefreshWrapper onError={(error) => {
        console.error('Token yenileme hatası:', error);
        setTokenRefreshError(error.message);
        
        // 5 saniye sonra hata mesajını temizle
        setTimeout(() => setTokenRefreshError(null), 5000);
      }}>
        {tokenRefreshError && <TokenRefreshError message={tokenRefreshError} />}
        <Toaster />
        {children}
      </TokenRefreshWrapper>
    </NextAuthProvider>
  );
}

// Token yenileme işlemleri için ayrı bir wrapper bileşeni
import { useTokenRefresh } from '@/lib/hooks/useTokenRefresh';

function TokenRefreshWrapper({ 
  children, 
  onError 
}: React.PropsWithChildren<{ 
  onError: (error: Error) => void 
}>) {
  // Token yenileme hook'unu kullan
  useTokenRefresh({
    // 15 dakikada bir kontrol et
    refreshInterval: 15 * 60 * 1000,
    // Süre bitiminden 10 dakika önce yenilemeyi başlat
    refreshThreshold: 10 * 60,
    // Hata durumunda callback'i çağır
    onError,
  });
  
  return <>{children}</>;
} 