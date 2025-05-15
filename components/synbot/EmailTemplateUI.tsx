import { useEffect, useRef, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Bot, Send, RefreshCw, RefreshCcw, User, ThumbsUp, ThumbsDown, AlertCircle, Mail, Copy, Check, Download } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/CodeBlock";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

type EmailTemplate = {
  id: string;
  subject: string;
  body: string;
  recipientType: string;
  tone: string;
  timestamp: Date;
};

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  feedback?: "like" | "dislike";
  template?: EmailTemplate;
};

export function EmailTemplateUI() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [emailSubject, setEmailSubject] = useState("");
  const [recipientType, setRecipientType] = useState("customer");
  const [emailTone, setEmailTone] = useState("professional");
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
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
        content: "Merhaba! Ben Turkcell E-mail Şablon Asistanı. Kurumsal e-mail şablonları oluşturmanıza yardımcı olabilirim. İstediğiniz e-posta içeriğini kısaca açıklayın, ben sizin için profesyonel bir şablon hazırlayayım.",
        role: "assistant",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Kopyalama işlemi için bir zamanlayıcı
  useEffect(() => {
    if (copiedTemplate) {
      const timer = setTimeout(() => {
        setCopiedTemplate(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedTemplate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    sendMessage(input);
    setInput('');
  };
  
  // Template kopyalama işlevi
  const copyToClipboard = (templateId: string, templateContent: string) => {
    navigator.clipboard.writeText(templateContent)
      .then(() => {
        setCopiedTemplate(templateId);
        toast({
          title: "Şablon kopyalandı",
          description: "E-mail şablonu panoya kopyalandı.",
          duration: 2000,
        });
      })
      .catch(() => {
        toast({
          title: "Kopyalama başarısız",
          description: "Şablon kopyalanırken bir hata oluştu.",
          variant: "destructive",
          duration: 2000,
        });
      });
  };
  
  // Kullanıcı mesajı gönderme
  const sendMessage = async (userMessage: string) => {
    try {
      console.log("E-mail şablonu talebi gönderiliyor...");
      
      // Kullanıcı mesajına şablon bilgilerini ekle
      const enhancedMessage = `
E-mail şablonu oluştur:
Konu: ${emailSubject || "Otomatik oluşturulsun"}
Alıcı Tipi: ${recipientType}
Üslup: ${emailTone}
İçerik Açıklaması: ${userMessage}
`;
      
      // Kullanıcı mesajını ekle
      const userMsg: Message = {
        id: uuidv4(),
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMsg]);
      
      // API'ye istek gönder
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 saniye timeout
      
      try {
        const response = await fetch("/api/synbot/force-api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: enhancedMessage,
            sessionId: "email-templates"
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        let templateResponse = "";
        let generatedTemplate: EmailTemplate | undefined;
        
        if (!response.ok) {
          console.error("API error:", response.status, response.statusText);
          templateResponse = "Sunucu yanıt vermedi. Lütfen daha sonra tekrar deneyin.";
        } else {
          try {
            const responseText = await response.text();
            console.log("Raw API response:", responseText.substring(0, 100) + "...");
            
            let data;
            try {
              data = JSON.parse(responseText);
            } catch (jsonError) {
              console.error("JSON parse error:", jsonError);
              throw new Error("API yanıtı geçerli bir JSON formatında değil");
            }
            
            console.log("API response received:", data);
            
            if (data && data.response) {
              templateResponse = data.response;
              
              // E-mail şablonu oluştur - API yanıtını işle
              // Yanıt formatını analiz edip konu ve gövde kısmını ayır
              let subject = emailSubject;
              const bodyContent = templateResponse;
              
              // Eğer konu yoksa ve yanıt içinde konu başlığı varsa onu ayıkla
              if (!subject && bodyContent.includes("Konu:")) {
                const subjectMatch = bodyContent.match(/Konu:([^\n]+)/);
                if (subjectMatch && subjectMatch[1]) {
                  subject = subjectMatch[1].trim();
                }
              }
              
              generatedTemplate = {
                id: uuidv4(),
                subject: subject || "Kurumsal İletişim",
                body: bodyContent,
                recipientType: recipientType,
                tone: emailTone,
                timestamp: new Date()
              };
            } else {
              console.error("Invalid API response format:", data);
              templateResponse = "API yanıtı beklenmeyen bir formatta. Teknik ekibe bildirin.";
            }
          } catch (parseError) {
            console.error("Error parsing API response:", parseError);
            templateResponse = "API yanıtı işlenemedi. Teknik ekibe bildirin.";
          }
        }

        // Asistan mesajını ekle
        const botMsg: Message = {
          id: uuidv4(),
          role: "assistant",
          content: templateResponse,
          timestamp: new Date(),
          template: generatedTemplate
        };
        
        setMessages((prev) => [...prev, botMsg]);
        
        // Yanıt gelince şablon sekmesine geç
        if (generatedTemplate) {
          setActiveTab("preview");
        }
        
      } catch (fetchError: any) {
        console.error("Fetch error:", fetchError.name, fetchError.message);
        
        // Handle timeout or network errors
        const errorContent = fetchError.name === "AbortError" 
          ? "İstek zaman aşımına uğradı. Sunucu yanıt vermiyor olabilir."
          : "Bir ağ hatası oluştu. İnternet bağlantınızı kontrol edin.";
        
        const errorMsg: Message = {
          id: uuidv4(),
          role: "assistant",
          content: errorContent,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);
      
      // Kullanıcıya hata mesajı ekle
      const errorMsg: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "Maalesef bir bağlantı hatası oluştu. İnternet bağlantınızı kontrol edin ve tekrar deneyin.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Son oluşturulan e-mail şablonunu al
  const getLatestTemplate = () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg.role === "assistant" && msg.template) {
        return msg.template;
      }
    }
    return null;
  };

  const latestTemplate = getLatestTemplate();
  
  return (
    <Card className="w-full h-full flex flex-col shadow-md">
      <CardHeader className="p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Turkcell Kurumsal E-mail Şablonları
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMessages([])}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Yeni Şablon
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Şablon Oluşturucu</TabsTrigger>
            <TabsTrigger value="preview" disabled={!latestTemplate}>Şablon Önizleme</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="mt-2">
            <Alert className="bg-amber-50 border border-amber-200 py-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-700 text-xs">
                  Kurumsal e-mail şablonları için AI destekli içerik asistanı
                </AlertDescription>
              </div>
            </Alert>
            
            <div className="grid gap-4 mt-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="subject">E-mail Konusu (opsiyonel)</Label>
                <Input
                  id="subject"
                  placeholder="Konu belirtmezseniz otomatik oluşturulacak"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="recipientType">Alıcı Tipi</Label>
                  <Select value={recipientType} onValueChange={setRecipientType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Alıcı tipi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Müşteri</SelectItem>
                      <SelectItem value="partner">İş Ortağı</SelectItem>
                      <SelectItem value="employee">Çalışan</SelectItem>
                      <SelectItem value="vendor">Tedarikçi</SelectItem>
                      <SelectItem value="executive">Yönetici</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="tone">E-mail Üslubu</Label>
                  <Select value={emailTone} onValueChange={setEmailTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Üslup seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Profesyonel</SelectItem>
                      <SelectItem value="formal">Resmi</SelectItem>
                      <SelectItem value="friendly">Samimi</SelectItem>
                      <SelectItem value="urgent">Acil</SelectItem>
                      <SelectItem value="informative">Bilgilendirici</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-2">
            {latestTemplate && (
              <div className="border rounded-md p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800">Konu: {latestTemplate.subject}</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(latestTemplate.id, latestTemplate.body)}
                    >
                      {copiedTemplate === latestTemplate.id ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copiedTemplate === latestTemplate.id ? "Kopyalandı" : "Kopyala"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      İndir
                    </Button>
                  </div>
                </div>
                
                <div className="prose prose-sm max-w-none border-t pt-3">
                  <ReactMarkdown>
                    {latestTemplate.body}
                  </ReactMarkdown>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Badge>{latestTemplate.recipientType === "customer" ? "Müşteri" : 
                         latestTemplate.recipientType === "partner" ? "İş Ortağı" : 
                         latestTemplate.recipientType === "employee" ? "Çalışan" : 
                         latestTemplate.recipientType === "vendor" ? "Tedarikçi" : "Yönetici"}</Badge>
                  <Badge>{latestTemplate.tone === "professional" ? "Profesyonel" : 
                         latestTemplate.tone === "formal" ? "Resmi" : 
                         latestTemplate.tone === "friendly" ? "Samimi" : 
                         latestTemplate.tone === "urgent" ? "Acil" : "Bilgilendirici"}</Badge>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardHeader>
      
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea 
          className="flex-1 p-4" 
        >
          <div className="space-y-4">
            {messages && messages.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Henüz mesaj yok. Bir şeyler yazarak e-mail şablonu oluşturmaya başlayın.</p>
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
                      <AvatarFallback>TS</AvatarFallback>
                      <AvatarImage src="/icons/synbot-icon.png" alt="Template Bot" />
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
                      >
                        {msg.content || ""}
                      </ReactMarkdown>
                    </div>
                    
                    {msg.role === "assistant" && msg.template && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-center"
                          onClick={() => {
                            setActiveTab("preview");
                          }}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          E-mail Şablonunu Görüntüle
                        </Button>
                      </div>
                    )}
                    
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
                  <AvatarFallback>TS</AvatarFallback>
                  <AvatarImage src="/icons/synbot-icon.png" alt="Template Bot" />
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%] flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4 animate-spin text-muted-foreground/80" />
                  <span className="text-sm text-muted-foreground">E-mail şablonu oluşturuluyor...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
      
      <CardFooter className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Textarea
            placeholder="E-mail içeriğini kısaca açıklayın..."
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