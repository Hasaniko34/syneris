'use client';

import { useState, useEffect, FormEvent, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Bot, Send, RefreshCcw, AlertCircle, ArrowLeft, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import Markdown from 'react-markdown';

export default function SynbotChatPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string, timestamp?: Date}[]>([
    {role: 'bot', content: 'Merhaba! Ben SynBot, Turkcell\'in yapay zeka asistanıyım. Sistemler, süreçler ve hata kodları hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?', timestamp: new Date()}
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom effect
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userQuery = query;
    setQuery('');
    setMessages(prev => [...prev, {role: 'user', content: userQuery, timestamp: new Date()}]);
    setLoading(true);
    setError(null);

    // Add typing indicator
    setMessages(prev => [...prev, {role: 'bot', content: '...'}]);

    try {
      // Direct Gemini API request
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
      
      // Remove typing indicator
      setMessages(prev => prev.slice(0, -1));
      // Add actual response
      setMessages(prev => [...prev, {role: 'bot', content: geminiResponse, timestamp: new Date()}]);
      
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
      // Remove typing indicator
      setMessages(prev => prev.slice(0, -1));
      // Add error message
      setMessages(prev => [...prev, {role: 'bot', content: `⚠️ Hata: ${err.message}`, timestamp: new Date()}]);
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Format message content with code blocks
  const formatMessage = (content: string) => {
    if (content === '...') {
      return (
        <div className="flex space-x-2 items-center">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      );
    }
    
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:mb-2 prose-headings:mt-4">
        <Markdown 
          components={{
            code(props) {
              const {children, className, node, ...rest} = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <div className="relative my-2 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div className="bg-gray-200 dark:bg-gray-700 px-4 py-1 text-xs flex justify-between items-center">
                    <span>{match[1]}</span>
                  </div>
                  <pre className="p-4 overflow-auto">
                    <code className={className} {...rest}>
                      {children}
                    </code>
                  </pre>
                </div>
              ) : (
                <code className="px-1 py-0.5 rounded-sm bg-gray-100 dark:bg-gray-800" {...rest}>
                  {children}
                </code>
              )
            }
          }}
        >
          {content}
        </Markdown>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 h-screen flex flex-col">
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
      
      <Card className="flex-1 border-2 border-[#00a0d2]/20 flex flex-col overflow-hidden">
        <CardHeader className="bg-[#00a0d2]/5 border-b py-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/synbot-avatar.png" />
              <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">SynBot</CardTitle>
              <p className="text-xs text-muted-foreground">Turkcell sistemleri uzmanı</p>
            </div>
          </div>
        </CardHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
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
                  <div>
                    <div 
                      className={`p-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      {formatMessage(msg.content)}
                    </div>
                    
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      {msg.timestamp && (
                        <span>{formatTime(msg.timestamp)}</span>
                      )}
                      
                      {msg.role === 'bot' && msg.content !== '...' && (
                        <div className="flex ml-auto gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6"
                                  onClick={() => copyToClipboard(msg.content, index)}
                                >
                                  {copiedIndex === index ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{copiedIndex === index ? 'Kopyalandı' : 'Kopyala'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Beğen</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Beğenme</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
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
              placeholder="Turkcell sistemleri veya süreçleri hakkında bir soru sorun..." 
              className="flex-1" 
              disabled={loading}
            />
            <Button 
              type="submit" 
              disabled={loading} 
              className="bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] text-white hover:opacity-90"
            >
              {loading ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
} 