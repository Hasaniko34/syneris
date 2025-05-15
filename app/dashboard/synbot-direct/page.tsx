'use client';

import { useState, useEffect, FormEvent, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Send, RefreshCcw, AlertCircle, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

// SearchParams için wrapper component
function SearchParamsWrapper({ children }: { children: (props: { fullscreen: boolean }) => React.ReactNode }) {
  const searchParams = useSearchParams();
  const fullscreen = searchParams.get('fullscreen') === 'true';
  
  return children({ fullscreen });
}

export default function SynbotDirectPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // searchParams değerini state'e taşı
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string}[]>([
    {role: 'bot', content: 'Yükleniyor...'}
  ]);

  // sayfa yüklendiğinde ana SynBot sayfasına yönlendir
  useEffect(() => {
    // 1 saniye bekle ve ana sayfaya yönlendir
    const timer = setTimeout(() => {
      router.push('/dashboard/synbot');
    }, 500);
    
    return () => clearTimeout(timer);
  }, [router]);

  // fullscreen parametresi değiştiğinde mesajları güncelle
  useEffect(() => {
    setMessages([{
      role: 'bot', 
      content: 'SynBot Direct yerine ana SynBot sayfasına yönlendiriliyorsunuz...'
    }]);
  }, [isFullscreen]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim() || loading) return;

    // Ana sayfaya yönlendir
    router.push('/dashboard/synbot');
  }

  return (
    <div className={`container mx-auto py-6 ${isFullscreen ? 'h-screen flex flex-col' : ''}`}>
      {/* SearchParams için Suspense boundary */}
      <Suspense fallback={<div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin"></div>}>
        <SearchParamsWrapper>
          {({ fullscreen }) => {
            // fullscreen değerini state'e ayarla
            if (fullscreen !== isFullscreen) {
              setIsFullscreen(fullscreen);
            }
            
            return null;
          }}
        </SearchParamsWrapper>
      </Suspense>
      
      <Card className={`border-2 border-[#00a0d2]/20 overflow-hidden ${isFullscreen ? 'flex-1 flex flex-col' : ''}`}>
        <CardHeader className="bg-[#00a0d2]/5 border-b">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/synbot-avatar.png" />
              <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>SynBot Yönlendirme</CardTitle>
              <p className="text-xs text-muted-foreground">Ana SynBot sayfasına yönlendiriliyorsunuz...</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 text-center">
          <div className="flex flex-col items-center gap-4 py-8">
            <RefreshCcw className="h-10 w-10 animate-spin text-[#00a0d2]" />
            <p>Ana SynBot sayfasına yönlendiriliyorsunuz...</p>
            <Link href="/dashboard/synbot">
              <Button className="bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] text-white hover:opacity-90">
                Hemen SynBot'a Git
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 