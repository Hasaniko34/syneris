'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Maximize2, Minimize2, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/CodeBlock';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DirectSynbotPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { 
      role: 'assistant', 
      content: 'Merhaba! Ben SynBot - Turkcell\'in Eğitim Asistanı. Size nasıl yardımcı olabilirim?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // SynBot API isteği
      const response = await fetch('/api/synbot/force-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`Hata: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage = {
        role: 'assistant',
        content: data.response || 'Üzgünüm, yanıt alınamadı.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Hata:', error);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  return (
    <div className={`flex justify-center items-center p-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      <Card className={`w-full ${isFullscreen ? 'h-full' : 'max-w-3xl'} flex flex-col overflow-hidden`}>
        <CardHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <CardTitle>{isFullscreen ? 'SynBot' : 'SynBot Turkcell Eğitim Asistanı'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 /> : <Maximize2 />}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
              Bu sayfa SynBot ile direkt iletişim kurmanızı sağlar. Turkcell sistemleri, eğitim içerikleri ve iş süreçleri hakkında sorular sorabilirsiniz.
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2 mb-4`}
                >
                  {msg.role === 'assistant' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>SB</AvatarFallback>
                      <AvatarImage src="/icons/synbot-icon.png" alt="SynBot" />
                    </Avatar>
                  )}
                  
                  <div 
                    className={`rounded-lg p-3 max-w-[85%] ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted'
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '');
                            return className?.includes('language-') ? (
                              <CodeBlock
                                language={(match && match[1]) || ''}
                                value={String(children).replace(/\n$/, '')}
                                {...props}
                              />
                            ) : (
                              <code className="bg-muted-foreground/20 px-1 py-0.5 rounded text-sm" {...props}>
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                    <div className="text-xs text-right mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                  
                  {msg.role === 'user' && (
                    <Avatar className="h-8 w-8 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {session?.user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                      <AvatarImage src={session?.user?.image || ""} alt="User" />
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start gap-2 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SB</AvatarFallback>
                    <AvatarImage src="/icons/synbot-icon.png" alt="SynBot" />
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                    <div className="dot-flashing"></div>
                    <span className="text-sm">SynBot yanıt oluşturuyor...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              placeholder="Mesajınızı yazın..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
      
      <style jsx global>{`
        .dot-flashing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #6b7280;
          animation: dot-flashing 1s infinite linear alternate;
          animation-delay: .5s;
        }
        
        .dot-flashing::before, .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
        }
        
        .dot-flashing::before {
          left: -15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #6b7280;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 0s;
        }
        
        .dot-flashing::after {
          left: 15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #6b7280;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 1s;
        }
        
        @keyframes dot-flashing {
          0% {
            background-color: #6b7280;
          }
          50%, 100% {
            background-color: #e5e7eb;
          }
        }
      `}</style>
    </div>
  );
} 