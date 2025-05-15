import { useEffect, useRef, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Bot, Send, RefreshCw, RefreshCcw, User, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/CodeBlock";
import { useSession } from "next-auth/react";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  feedback?: "like" | "dislike";
  metadata?: {
    simulated?: boolean;
    directApi?: boolean;
  };
};

export function SynbotChatUI() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionsLoading, setIsSessionsLoading] = useState(false);
  const [sessions, setSessions] = useState<{ id: string; title: string; updatedAt: Date }[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Otomatik kaydırma
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Komponent yüklendiğinde hoşgeldin mesajı göster
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome-" + Date.now(),
        content: "Merhaba! Ben SynBot. Size nasıl yardımcı olabilirim?",
        role: "assistant",
        timestamp: new Date(),
        metadata: {
          directApi: false,
          simulated: false
        }
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Mevcut sohbet oturumlarını yükle
  useEffect(() => {
    fetchSessions();
  }, []);

  // Aktif bir oturum varsa, o oturumun mesajlarını yükle
  useEffect(() => {
    if (activeSession) {
      fetchSessionMessages(activeSession);
    }
  }, [activeSession]);

  const fetchSessions = async () => {
    setIsSessionsLoading(true);
    try {
      const response = await fetch('/api/synbot');
      const data = await response.json();
      
      console.log("Oturumlar yanıtı:", data); // Hata ayıklama
      
      if (response.ok) {
        if (data.data?.sessions && Array.isArray(data.data.sessions)) {
          setSessions(data.data.sessions);
          if (data.data.sessions.length > 0 && !activeSession) {
            setActiveSession(data.data.sessions[0].id);
          }
        } else {
          console.error("Geçersiz oturum formatı:", data);
        }
      } else {
        toast({
          title: "Oturumlar yüklenemedi",
          description: data.error || "Sohbet oturumları yüklenirken bir sorun oluştu.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Bağlantı hatası",
        description: "Sunucu ile iletişim kurulurken bir sorun oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSessionsLoading(false);
    }
  };

  const fetchSessionMessages = async (sessionId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/synbot?sessionId=${sessionId}`);
      const data = await response.json();
      
      console.log("Oturum mesajları yanıtı:", data); // Hata ayıklama
      
      if (response.ok) {
        if (data.data?.messages && Array.isArray(data.data.messages)) {
          setMessages(data.data.messages);
        } else {
          console.error("Geçersiz mesaj formatı:", data);
          toast({
            title: "Format hatası",
            description: "Oturum mesajları geçersiz formatta. Mesajlar gösterilemiyor.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Mesajlar yüklenemedi",
          description: data.error || "Sohbet mesajları yüklenirken bir sorun oluştu.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Bağlantı hatası",
        description: "Sunucu ile iletişim kurulurken bir sorun oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createNewSession = async () => {
    setActiveSession(null);
    setMessages([]);
    const welcomeMessage: Message = {
      id: "welcome",
      content: "Merhaba! Ben SynBot. Size nasıl yardımcı olabilirim?",
      role: "assistant",
      timestamp: new Date(),
      metadata: {
        directApi: false,
        simulated: false
      }
    };
    setMessages([welcomeMessage]);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Kullanıcı mesajını ekle
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    
    const userQuery = input;
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);
    
    try {
      // Yükleniyor mesajını ekle
      const loadingMessage: Message = {
        id: "loading-" + Date.now().toString(),
        content: "Yanıt hazırlanıyor...",
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages([...updatedMessages, loadingMessage]);
      
      // Backend API'ye istek gönder
      const response = await fetch('/api/synbot/force-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userQuery
        })
      });
      
      // Son yükleniyor mesajını kaldır
      setMessages(messages => messages.filter(m => m.id !== loadingMessage.id));
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API hatası: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log("API yanıtı:", data);
      
      // API yanıtını çıkar
      const apiResponse = data.response || 'API yanıtı işlenemedi';
      
      // Bot yanıtını ekle
      const botMessage: Message = {
        id: Date.now().toString() + "-api-" + Math.random().toString(36).substring(2, 7),
        content: apiResponse,
        role: "assistant",
        timestamp: new Date(),
        metadata: {
          simulated: false,
          directApi: false
        }
      };
      
      // Bot mesajını mesajlara ekle
      setMessages(messages => [...messages.filter(m => m.id !== loadingMessage.id), botMessage]);
      
      // Oturum ID'si varsa, mesajı sunucuya kaydet
      if (activeSession) {
        try {
          await fetch(`/api/synbot/sessions/${activeSession}/messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userMessage: userQuery,
              botResponse: apiResponse
            })
          });
        } catch (err) {
          console.error("Mesaj sunucuya kaydedilemedi", err);
        }
      }
    } catch (err) {
      console.error("Mesaj gönderme hatası:", err);
      setError(err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu");
      
      // Hata mesajını ekle
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `Üzgünüm, bir hata oluştu: ${err instanceof Error ? err.message : "Bilinmeyen bir hata"}`,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages(messages => [...messages.filter(m => m.id.startsWith("loading-")), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const handleFeedback = (messageId: string, feedback: "like" | "dislike") => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId ? { ...msg, feedback } : msg
    );
    setMessages(updatedMessages);
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-md">
      <CardHeader className="p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            {activeSession ? (
              sessions.find(s => s.id === activeSession)?.title || "SynBot"
            ) : (
              "Yeni Sohbet (Doğrudan Gemini API)"
            )}
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={createNewSession}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Yeni Sohbet
          </Button>
        </div>
        
        {sessions && sessions.length > 0 && (
          <div className="flex gap-2 mt-2 overflow-x-auto pb-2 max-w-full hide-scrollbar">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-1.5 pb-1">
                {sessions.slice(0, 5).map((session) => (
                  <Badge
                    key={session.id}
                    variant={activeSession === session.id ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/10 flex-shrink-0"
                    onClick={() => setActiveSession(session.id)}
                  >
                    {session.title && session.title.length > 20
                      ? `${session.title.substring(0, 20)}...`
                      : session.title || "İsimsiz Sohbet"}
                  </Badge>
                ))}
                {sessions && sessions.length > 5 && (
                  <Badge variant="outline" className="cursor-pointer flex-shrink-0 bg-muted/50">
                    +{sessions.length - 5} daha
                  </Badge>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
        
        <div className="mt-2">
          <Alert className="bg-amber-50 border border-amber-200 py-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700 text-xs">
                Bu sürüm doğrudan Gemini API'ye bağlanır ve statik yanıtları atlar.
              </AlertDescription>
            </div>
          </Alert>
        </div>
      </CardHeader>
      
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea 
          className="flex-1 p-4" 
        >
          <div className="space-y-4">
            {messages && messages.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Henüz mesaj yok. Bir şeyler yazarak sohbete başlayın.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.role === "user" ? "justify-end" : ""
                  } mb-6`}
                >
                  {msg.role === "assistant" && (
                    <Avatar className="mt-0.5 border flex-shrink-0">
                      <AvatarFallback>SB</AvatarFallback>
                      <AvatarImage src="/icons/synbot-icon.png" alt="SynBot" />
                    </Avatar>
                  )}

                  <div
                    className={`rounded-lg px-4 py-3 max-w-[85%] sm:max-w-[75%] break-words ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
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
                              <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {msg.content || ""}
                      </ReactMarkdown>
                    </div>
                    <div
                      className={`flex items-center justify-end gap-2 mt-2 text-xs ${
                        msg.role === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span>
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }) : ""}
                      </span>
                      {msg.role === "assistant" && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full hover:bg-background/20"
                            onClick={() => handleFeedback(msg.id, "like")}
                          >
                            <ThumbsUp
                              className={`h-3.5 w-3.5 ${
                                msg.feedback === "like" ? "fill-current" : ""
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full hover:bg-background/20"
                            onClick={() => handleFeedback(msg.id, "dislike")}
                          >
                            <ThumbsDown
                              className={`h-3.5 w-3.5 ${
                                msg.feedback === "dislike" ? "fill-current" : ""
                              }`}
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <Avatar className="mt-0.5 bg-primary flex-shrink-0">
                      <AvatarFallback>
                        {session?.user?.name ? session.user.name.charAt(0) : "U"}
                      </AvatarFallback>
                      <AvatarImage src={session?.user?.image || ""} alt="User" />
                    </Avatar>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="mt-0.5 border flex-shrink-0">
                  <AvatarImage src="/images/synbot-avatar.png" alt="SynBot" />
                  <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%] flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4 animate-spin text-muted-foreground/80" />
                  <span className="text-sm text-muted-foreground">Gemini API yanıt oluşturuyor...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
      
      <CardFooter className="p-4 border-t bg-background">
        <form onSubmit={sendMessage} className="flex w-full gap-2">
          <Textarea
            placeholder="Mesajınızı yazın..."
            className="min-h-10 max-h-40 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
} 