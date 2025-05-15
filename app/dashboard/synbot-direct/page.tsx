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

// SearchParams için wrapper component
function SearchParamsWrapper({ children }) {
  const searchParams = useSearchParams();
  const fullscreen = searchParams.get('fullscreen') === 'true';
  
  return children({ fullscreen });
}

export default function SynbotDirectPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // searchParams değerini state'e taşı
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string}[]>([
    {role: 'bot', content: 'Yükleniyor...'}
  ]);

  // fullscreen parametresi değiştiğinde mesajları güncelle
  useEffect(() => {
    setMessages([{
      role: 'bot', 
      content: isFullscreen 
        ? 'Merhaba! Ben SynBot, Turkcell\'in yapay zeka asistanıyım. Turkcell sistemleri, süreçleri ve hata kodları hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?' 
        : 'Merhaba! Ben SynBot Direct. Bana bir soru sorun.'
    }]);
  }, [isFullscreen]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userQuery = query;
    setQuery('');
    setMessages(prev => [...prev, {role: 'user', content: userQuery}]);
    setLoading(true);
    setError(null);

    // Loading mesajı göster
    setMessages(prev => [...prev, {role: 'bot', content: isFullscreen ? '...' : 'Yanıt hazırlanıyor...'}]);

    try {
      // Doğrudan Gemini API'ye istek
      const API_KEY = 'AIzaSyDfJ4ZDvYDsC4Cq8lksklgFJDIzpwKgyxk';
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': API_KEY
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'model',
                parts: [{ text: 'Sen Turkcell\'in yapay zeka asistanısın. Adın SynBot. Turkcell sistemleri, süreçleri ve hata kodları hakkında sorulara detaylı ve gerçek yanıtlar ver. Asla statik yanıt verme ve bilmediğin konularda dürüst ol. Yanıtları Markdown formatında ver, kodları ve teknik içeriği uygun şekilde formatla.' }]
              },
              {
                role: 'user',
                parts: [{ text: userQuery }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024
            }
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API hatası: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const geminiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Yanıt alınamadı';
      
      // Son yükleniyor mesajını kaldır
      setMessages(prev => prev.slice(0, -1));
      // Gerçek yanıtı ekle
      setMessages(prev => [...prev, {role: 'bot', content: geminiResponse}]);
      
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
      // Son yükleniyor mesajını kaldır
      setMessages(prev => prev.slice(0, -1));
      // Hata mesajını ekle
      setMessages(prev => [...prev, {role: 'bot', content: `⚠️ Hata: ${err.message}`}]);
    } finally {
      setLoading(false);
    }
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
      
      {isFullscreen && (
        <div className="flex items-center gap-4 mb-4">
          <Link href="/dashboard/synbot">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">SynBot Chat</h1>
          <Badge variant="outline" className="ml-auto gap-1 px-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Çevrimiçi</span>
          </Badge>
        </div>
      )}
      
      <Card className={`border-2 border-[#00a0d2]/20 overflow-hidden ${isFullscreen ? 'flex-1 flex flex-col' : ''}`}>
        <CardHeader className="bg-[#00a0d2]/5 border-b">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/synbot-avatar.png" />
              <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{isFullscreen ? 'SynBot' : 'SynBot Direct (Gemini API)'}</CardTitle>
              {!isFullscreen && (
                <p className="text-xs text-muted-foreground">Doğrudan API bağlantısı ile çalışan versiyon</p>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className={`p-0 ${isFullscreen ? 'flex-1 overflow-hidden flex flex-col' : ''}`}>
          <div className={`${isFullscreen ? 'flex-1 ' : 'h-[500px] '}overflow-y-auto p-4 space-y-4`}>
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                    {msg.role === 'user' ? (
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        U
                      </AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage src="/images/synbot-avatar.png" />
                        <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div 
                    className={`p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-center">
                <RefreshCcw className="h-6 w-6 animate-spin text-[#00a0d2]" />
              </div>
            )}
          </div>
        </CardContent>
        
        {error && (
          <div className="px-4 py-2">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Hata</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
        
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder={isFullscreen ? "Turkcell sistemleri veya süreçleri hakkında bir soru sorun..." : "SynBot'a bir şey sorun..."} 
              className="flex-1" 
              disabled={loading}
            />
            <Button type="submit" disabled={loading} className="bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] text-white hover:opacity-90">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
      
      {!isFullscreen && (
        <div className="mt-6">
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Dikkat</AlertTitle>
            <AlertDescription className="text-amber-700">
              Bu sayfa SynBot'u bypass edip doğrudan Gemini API'ye istek atıyor. Gemini API çalışıyorsa, bu sayfada yanıt alabilirsiniz.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
} 