'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  AlertCircle, 
  Bot, 
  Zap, 
  MessageSquare, 
  FileText, 
  Users, 
  Code, 
  BarChart3 as BarChart, 
  ArrowRight, 
  Sparkles,
  Lightbulb,
  ThumbsUp,
  Clock as Timer,
  CheckCircle,
  Send,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  GraduationCap,
  Star,
  RefreshCw,
  ThumbsDown,
  Copy
} from "lucide-react";
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Markdown from 'react-markdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/components/ui/use-toast";
import { FeedbackType, SynbotInteractionType, SessionStatus as SynbotSessionStatus } from '@/lib/types/SynbotTypes';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { SynbotChatUI } from "@/components/synbot/SynbotChatUI";
import { SynbotAnalyzeErrorCard } from "@/components/synbot/SynbotAnalyzeErrorCard";
import { SynbotInsightsCard } from "@/components/synbot/SynbotInsightsCard";
import { SynbotTrainingCard } from "@/components/synbot/SynbotTrainingCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// SynBot mesaj tipleri
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  liked?: boolean;
  disliked?: boolean;
  isCode?: boolean;
  isUser?: boolean;
  type: SynbotInteractionType;
  feedback?: FeedbackType;
  confidence?: number;
}

interface BotSuggestion {
  id: string;
  text: string;
  icon?: React.ReactNode;
}

interface ConversationHistory {
  id: string;
  title: string;
  date: Date;
  messageCount: number;
}

// Örnek konversasyon geçmişi - Turkcell için özelleştirilmiş
const sampleConversations: ConversationHistory[] = [
  { id: '1', title: 'Turkcell Mobil Uygulama Eğitimi', date: new Date('2024-05-14'), messageCount: 12 },
  { id: '2', title: 'Paycell Entegrasyon Soruları', date: new Date('2024-05-12'), messageCount: 8 },
  { id: '3', title: 'Lifebox Yedekleme Hatası', date: new Date('2024-05-10'), messageCount: 5 },
  { id: '4', title: '5G Network Optimizasyonu', date: new Date('2024-05-08'), messageCount: 7 },
  { id: '5', title: 'BiP Güvenlik Protokolleri', date: new Date('2024-05-05'), messageCount: 10 },
];

// Örnek öneriler - Turkcell için özelleştirilmiş
const botSuggestions: BotSuggestion[] = [
  { id: '1', text: 'Turkcell Mobil Uygulama özelliklerini anlatır mısın?', icon: <BookOpen className="h-4 w-4" /> },
  { id: '2', text: 'Paycell ile ödeme entegrasyonu nasıl yapılır?', icon: <HelpCircle className="h-4 w-4" /> },
  { id: '3', text: 'Lifebox bulut depolama limitlerini nasıl yönetirim?', icon: <AlertTriangle className="h-4 w-4" /> },
  { id: '4', text: 'BiP güvenli mesajlaşma özelliklerini göster', icon: <TrendingUp className="h-4 w-4" /> },
  { id: '5', text: 'Dijital servis aktivasyonu nasıl yapılır?', icon: <CreditCard className="h-4 w-4" /> },
];

// Kod örnekleri ve açıklamalar için formatlamayı sağlayacak yardımcı fonksiyon
const formatMessage = (content: string) => {
  // Kod bloklarını işaretlemek için regex
  const codeBlockRegex = /```([\s\S]*?)```/g;
  const inlineCodeRegex = /`([^`]+)`/g;
  
  // Markdown bağlantılarını işaretlemek için regex
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  // Listeleri işaretlemek için regex
  const listItemRegex = /^\s*[-*]\s+(.+)$/gm;
  
  // Başlıkları işaretlemek için regex
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  
  // Kalın ve italik metinleri işaretlemek için regex
  const boldRegex = /\*\*([^*]+)\*\*/g;
  if (!content.includes('```')) return <p>{content}</p>;

  const parts = content.split(/(```(?:.*?\n)?.*?```)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          // Kod bloklarını işaretlemek için regex
          const code = part.slice(3, -3).trim();
          const language = code.split('\n')[0].trim();
          const actualCode = language ? code.substring(language.length).trim() : code;
          
          return (
            <div key={index} className="relative my-3 rounded-md bg-muted overflow-hidden">
              <div className="bg-muted/50 px-4 py-1 text-xs flex justify-between items-center border-b">
                <span>{language || 'kod'}</span>
                <button 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => navigator.clipboard.writeText(actualCode)}
                >
                  Kopyala
                </button>
              </div>
              <pre className="p-4 overflow-auto">
                <code>{actualCode}</code>
              </pre>
            </div>
          );
        }
        return <p key={index} className="my-2">{part}</p>;
      })}
    </>
  );
};

// Her etkileşim türü için rozet rengi - Turkcell kurumsal renkleri
const badgeColors: Record<string, string> = {
  [SynbotInteractionType.CHAT]: 'bg-[#ffc72c] text-[#333333]', // Turkcell sarı
  [SynbotInteractionType.TRAINING]: 'bg-[#ffc72c]/80 text-[#333333]',
  [SynbotInteractionType.CODE_GENERATION]: 'bg-[#ffc72c]/60 text-[#333333]',
  [SynbotInteractionType.ASSESSMENT]: 'bg-[#ffc72c]/40 text-[#333333]',
  [SynbotInteractionType.ERROR_CORRECTION]: 'bg-[#ffc72c]/20 text-[#333333]',
  [SynbotInteractionType.RECOMMENDATION]: 'bg-[#333333] text-[#ffc72c]', // Turkcell siyah
  [SynbotInteractionType.CODE_EXPLANATION]: 'bg-[#333333]/80 text-[#ffc72c]',
  [SynbotInteractionType.TRAINING_GUIDANCE]: 'bg-[#333333]/60 text-[#ffc72c]',
};

// Her etkileşim türü için etiket - Turkcell içeriği
const interactionLabels: Record<SynbotInteractionType, string> = {
  [SynbotInteractionType.CHAT]: 'Genel Destek',
  [SynbotInteractionType.TRAINING_GUIDANCE]: 'Turkcell Akademi',
  [SynbotInteractionType.ERROR_CORRECTION]: 'Teknik Destek',
  [SynbotInteractionType.RECOMMENDATION]: 'Dijital Servisler',
  [SynbotInteractionType.CODE_EXPLANATION]: 'API Dokümantasyon',
  [SynbotInteractionType.TRAINING]: 'Eğitim İçeriği',
  [SynbotInteractionType.CODE_GENERATION]: 'Entegrasyon',
  [SynbotInteractionType.ASSESSMENT]: 'Performans Analizi'
};

// Her etkileşim türü için başlık
const interactionTitles: Record<string, string> = {
  [SynbotInteractionType.CHAT]: 'Sohbet',
  [SynbotInteractionType.ERROR_CORRECTION]: 'Hata Analizi',
  [SynbotInteractionType.TRAINING]: 'Eğitim İçeriği',
  [SynbotInteractionType.CODE_GENERATION]: 'Kod Oluşturma',
  [SynbotInteractionType.ASSESSMENT]: 'Değerlendirme',
  [SynbotInteractionType.CODE_EXPLANATION]: 'Kod Açıklama',
  [SynbotInteractionType.TRAINING_GUIDANCE]: 'Eğitim Rehberliği',
  [SynbotInteractionType.RECOMMENDATION]: 'Öneriler'
};

// Etkileşim türüne göre rozet rengi alma fonksiyonu
const getBadgeColorForType = (type: SynbotInteractionType): string => {
  return badgeColors[type] || 'bg-gray-200 text-gray-800';
};

// Etkileşim türüne göre ikon alma fonksiyonu
const getIconForInteractionType = (type: SynbotInteractionType) => {
  switch (type) {
    case SynbotInteractionType.CHAT:
      return <MessageSquare className="h-4 w-4" />;
    case SynbotInteractionType.TRAINING:
      return <BookOpen className="h-4 w-4" />;
    case SynbotInteractionType.CODE_GENERATION:
      return <Code className="h-4 w-4" />;
    case SynbotInteractionType.ASSESSMENT:
      return <CheckCircle className="h-4 w-4" />;
    case SynbotInteractionType.ERROR_CORRECTION:
      return <AlertCircle className="h-4 w-4" />;
    case SynbotInteractionType.CODE_EXPLANATION:
      return <Lightbulb className="h-4 w-4" />;
    case SynbotInteractionType.TRAINING_GUIDANCE:
      return <GraduationCap className="h-4 w-4" />;
    case SynbotInteractionType.RECOMMENDATION:
      return <Star className="h-4 w-4" />;
    default:
      return <Bot className="h-4 w-4" />;
  }
};

// Etkileşim arayüzü
interface Interaction {
  _id?: string;
  userMessage: string;
  botResponse: string;
  type: SynbotInteractionType;
  timestamp: Date;
  feedback?: FeedbackType;
}

// Oturum arayüzü
interface Session {
  sessionId: string;
  lastMessage: string;
  lastResponse: string;
  interactionCount: number;
  lastInteractionTime: Date;
  startTime: Date;
  title: string;
  status: SynbotSessionStatus;
  primaryType: SynbotInteractionType;
  updatedAt: Date;
}

const SynBotPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [view, setView] = useState<'chat' | 'history'>('chat');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [interactionType, setInteractionType] = useState<SynbotInteractionType>(SynbotInteractionType.CHAT);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const [showFeatureHighlight, setShowFeatureHighlight] = useState(true);
  const [showFeaturePopup, setShowFeaturePopup] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContext, setEmailContext] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailType, setEmailType] = useState('normal');
  const { toast: showToast, dismiss } = useToast();
  const searchParams = useSearchParams();
  
  // Kullanıcı oturumu tanımlama
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      // Yeni bir oturum başlat
      if (!currentSessionId) {
        setCurrentSessionId(uuidv4());
      }
      
      // Oturum geçmişini yükle
      loadSessions();
      
      // URL parametrelerini kontrol et
      const tab = searchParams.get('tab');
      if (tab) {
        setActiveTab(tab);
        
        // Sayfanın yüklendiğinden emin olmak için bir miktar gecikme
        setTimeout(() => {
          document.querySelector('.space-y-6')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [status, router, currentSessionId, searchParams]);
  
  // Demo mesaj konuşması için state
  const [konusmaDemosu, setKonusmaDemosu] = useState([
    {
      type: 'bot' as 'user' | 'bot',
      message: 'Merhaba! Ben SynBot, Turkcell\'in yapay zeka asistanıyım. Sistemler, süreçler ve hata kodları hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  
  // Mesaj geçmişini yükle
  useEffect(() => {
    if (currentSessionId && view === 'chat') {
      loadInteractions(currentSessionId);
    }
  }, [currentSessionId, view]);
  
  // Otomatik kaydırma
  useEffect(() => {
    scrollToBottom();
  }, [interactions]);
  
  // Otomatik kaydırma fonksiyonu
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Oturum geçmişini yükleme
  const loadSessions = async () => {
    try {
      const response = await fetch('/api/synbot');
      const data = await response.json();
      
      if (data.sessions) {
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error('Oturum geçmişi yüklenirken hata:', error);
      showToast({
        title: 'Hata',
        description: 'Oturum geçmişi yüklenemedi.',
        variant: 'destructive',
      });
    }
  };
  
  // Etkileşimleri yükleme
  const loadInteractions = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/synbot?sessionId=${sessionId}`);
      
      if (response.status === 404) {
        console.warn(`Oturum bulunamadı veya yeni bir oturum: ${sessionId}`);
        // Eğer oturum bulunamadıysa, boş bir etkileşim listesi göster ve devam et
        setInteractions([]);
        setMessages([]);
        return;
      }
      
      if (!response.ok) {
        // Hata durumunda daha fazla bilgi almaya çalış
        const errorData = await response.json().catch(() => ({}));
        console.error('API yanıt hatası:', response.status, errorData);
        throw new Error(`API yanıt hatası: ${response.status} - ${errorData.message || 'Bilinmeyen hata'}`);
      }
      
      const data = await response.json();
      
      // interactions ve messages verileri varsa kullan
      if (data.interactions) {
        setInteractions(data.interactions);
      }
      
      if (data.messages) {
        setMessages(data.messages);
      } else if (data.interactions && data.interactions.length > 0) {
        // Eğer sadece interactions varsa, bunları Message formatına dönüştür
        const convertedMessages: Message[] = [];
        
        for (const interaction of data.interactions) {
          // Kullanıcı mesajı ekle
          convertedMessages.push({
            id: interaction._id || uuidv4(),
            role: 'user',
            content: interaction.userMessage,
            timestamp: new Date(interaction.timestamp),
            type: interaction.type || SynbotInteractionType.CHAT
          });
          
          // Bot yanıtı ekle
          convertedMessages.push({
            id: uuidv4(),
            role: 'assistant',
            content: interaction.botResponse,
            timestamp: new Date(interaction.timestamp),
            type: interaction.type || SynbotInteractionType.CHAT,
            feedback: interaction.feedback
          });
        }
        
        setMessages(convertedMessages);
      }
      
      // Son mesaja otomatik kaydır
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    } catch (error) {
      console.error('Etkileşimler yüklenirken hata:', error);
      showToast({
        title: 'Hata',
        description: 'Sohbet geçmişi yüklenemedi.',
        variant: 'destructive',
      });
      // Hata durumunda boş liste göster
      setInteractions([]);
      setMessages([]);
    }
  };
  
  // Oturum seçme fonksiyonu
  const selectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setView('chat');
  };
  
  // Mesaj gönderme fonksiyonu
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !currentSessionId) return;
    
    // Kullanıcı mesajını görüntüle
    const userInput = message;
    setMessage('');
    
    // Yeni mesaj oluştur
    const newMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: userInput,
      timestamp: new Date(),
      type: SynbotInteractionType.CHAT
    };
    
    // Kullanıcı mesajını ekle ve görüntüle
    setMessages(prev => [...prev, newMessage]);
    setLoading(true);
    
    try {
      // API çağrısı yapmadan önce, API kullanılabilirliğini kontrol etmek için bir fallback mekanizması ekleyelim
      // Bu, API henüz hazır değilse veya bağlantı sorunları varsa kullanılacak
      
      // Simüle edilmiş bot yanıtı
      const simulateResponse = () => {
        const responses = [
          "Merhaba! Size nasıl yardımcı olabilirim?",
          "Bu konu hakkında detaylı bilgi için Turkcell eğitim portalını inceleyebilirsiniz.",
          "Yanıtınızı anlamakta zorlanıyorum. Lütfen sorunuzu farklı bir şekilde ifade eder misiniz?",
          "Turkcell sistemleri hakkında yardımcı olmaktan memnuniyet duyarım. Hangi konuda bilgi almak istersiniz?",
          "Bu sorunun çözümü için Turkcell teknik destek birimini aramanızı öneririm.",
          "Sorduğunuz konu hakkında eğitim materyalleri mevcut. Size bir eğitim önerebilir miyim?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
      };
      
      let botResponse;
      let botMessageId;
      let responseType = interactionType;
      let confidence = 0.8;
      
      try {
        const response = await fetch('/api/synbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userInput,
            sessionId: currentSessionId,
            type: interactionType
          }),
          signal: AbortSignal.timeout(8000) // 8 saniye zaman aşımı
        });
        
        if (!response.ok) {
          throw new Error(`API yanıt hatası: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          botResponse = data.data.response;
          botMessageId = data.data.messageId;
          responseType = data.data.type || interactionType;
          confidence = data.data.confidence || 0.8;
        } else {
          throw new Error('Geçersiz API yanıtı');
        }
      } catch (error) {
        console.error('API çağrısı başarısız oldu, fallback yanıt kullanılıyor:', error);
        // API çağrısı başarısız olduysa veya veri alınamadıysa, bir fallback yanıt döndür
        botResponse = `${simulateResponse()} \n\n(Not: Şu anda sunucu yanıt vermekte zorlanıyor. Bu bir simülasyon yanıtıdır.)`;
        botMessageId = uuidv4();
      }
      
      // Bot yanıtını oluştur
      const botMsg: Message = {
        id: botMessageId || uuidv4(),
        role: 'assistant',
        content: botResponse || "Üzgünüm, bir yanıt oluşturulamadı.",
        timestamp: new Date(),
        type: responseType || SynbotInteractionType.CHAT,
        confidence: confidence
      };
      
      // Bot yanıtını messages state'ine ekle
      setMessages(prev => [...prev, botMsg]);
      
      // Oturum geçmişini yeniden yükle (eğer API çalışıyorsa)
      try {
        loadSessions();
      } catch (e) {
        console.error("Oturum geçmişi yüklenemedi:", e);
      }
      
      // Yeni mesaj eklendikten sonra otomatik kaydır
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    } catch (error) {
      console.error('Mesaj gönderilirken hata:', error);
      showToast({
        title: 'Hata',
        description: 'Sunucuyla bağlantı kurulamadı.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Geri bildirim gönderme fonksiyonu
  const sendFeedback = async (messageId: string | undefined, feedback: FeedbackType) => {
    if (!messageId || !currentSessionId) return;
    
    try {
      const response = await fetch(`/api/synbot/sessions/${currentSessionId}/messages`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          feedback,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Mesajları güncelleyerek göster
        setMessages(prevMessages =>
          prevMessages.map(message =>
            message.id === messageId
              ? { ...message, feedback }
              : message
          )
        );
        
        showToast({
          title: 'Başarılı',
          description: 'Geri bildiriminiz için teşekkürler!',
          duration: 3000,
        });
      } else {
        showToast({
          title: 'Hata',
          description: data.message || 'Geri bildirim gönderilemedi.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Geri bildirim gönderilirken hata:', error);
      showToast({
        title: 'Hata',
        description: 'Sunucuyla bağlantı kurulamadı.',
        variant: 'destructive',
      });
    }
  };
  
  // Yeni sohbet başlatma fonksiyonu
  const startNewChat = () => {
    const newSessionId = uuidv4();
    setCurrentSessionId(newSessionId);
    setMessages([]);
    setInteractions([]);
    setView('chat');
    setActiveSession(null);
    setInteractionType(SynbotInteractionType.CHAT);
    
    // Varsayılan karşılama mesajı ekle
    const initialMessages: Message[] = [
      {
        id: uuidv4(),
        role: 'assistant',
        content: 'Merhaba! Ben SynBot, Turkcell\'in yapay zeka asistanıyım. Size hangi sistem, modül veya süreç hakkında yardımcı olabilirim?',
        timestamp: new Date(),
        type: SynbotInteractionType.CHAT
      }
    ];
    setMessages(initialMessages);
  };
  
  // Tarih biçimlendirme fonksiyonu
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  
  // Saat biçimlendirme fonksiyonu
  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Oturumları yükleme
  useEffect(() => {
    if (session?.user) {
      fetchSessions();
    }
  }, [session]);

  // Oturumları getir
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/synbot/sessions');
      const data = await response.json();
      if (data.success) {
        setSessions(data.sessions);
        
        // Aktif oturum yoksa ve oturumlar varsa ilk oturumu seç
        if (!activeSession && data.sessions.length > 0) {
          setActiveSession(data.sessions[0].sessionId);
          fetchSessionMessages(data.sessions[0].sessionId);
        }
      }
    } catch (error) {
      console.error('Oturumlar yüklenirken hata oluştu:', error);
      showToast({
        title: 'Hata',
        description: 'Oturumlar yüklenirken bir sorun oluştu.',
        variant: 'destructive'
      });
    }
  };

  // Oturum mesajlarını getir
  const fetchSessionMessages = async (sessionId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/synbot/sessions/${sessionId}/messages`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages.map((msg: any) => ({
          id: msg.id,
          content: msg.content,
          isUser: msg.isUser,
          timestamp: new Date(msg.timestamp),
          type: msg.type,
          feedback: msg.feedback,
          confidence: msg.confidence
        })));
      }
    } catch (error) {
      console.error('Mesajlar yüklenirken hata oluştu:', error);
      showToast({
        title: 'Hata',
        description: 'Mesajlar yüklenirken bir sorun oluştu.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Yeni oturum oluştur
  const createNewSession = async () => {
    try {
      const response = await fetch('/api/synbot/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `Yeni Oturum ${new Date().toLocaleDateString('tr-TR')}`,
          primaryType: interactionType
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setSessions([data.session, ...sessions]);
        setActiveSession(data.session.sessionId);
        setMessages([
          {
            id: 'welcome',
            content: 'Merhaba! Ben SynBot, Syneris platformunun yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?',
            role: 'assistant',
            isUser: false,
            timestamp: new Date(),
            type: interactionType,
            confidence: 0.98
          }
        ]);
        
        showToast({
          title: 'Başarılı',
          description: 'Yeni oturum oluşturuldu.',
        });
      }
    } catch (error) {
      console.error('Oturum oluşturulurken hata oluştu:', error);
      showToast({
        title: 'Hata',
        description: 'Yeni oturum oluşturulurken bir sorun oluştu.',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("synbot-welcome-seen") && status === 'authenticated') {
      localStorage.setItem("synbot-welcome-seen", "true");
      
      // Karşılama mesajı göster
      setTimeout(() => {
        showToast({
          title: "Turkcell SynBot ile tanışın!",
          description: "Turkcell'in yapay zeka asistanı, sistem eğitimlerinizde rehberlik etmek, modüller hakkında bilgi vermek ve sorunlarınızı çözmek için hizmetinizde.",
          className: "z-[9999] relative backdrop-blur-sm bg-background/80",
          action: (
            <Button variant="default" size="sm" onClick={() => {
              dismiss();
              setActiveTab("training");
            }}>
              Eğitim Rehberimi Gör
            </Button>
          ),
        });
      }, 1000);
    }
  }, []);

  const dismissFeatureHighlight = () => {
    setShowFeatureHighlight(false);
    localStorage.setItem("synbot-highlight-seen", "true");
  };
  
  // Eğer kullanıcı oturumu yükleniyorsa
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-medium">Yükleniyor...</h3>
        </div>
      </div>
    );
  }
  
  // Yeni işlevler
  const dismissToast = (id?: string) => {
    if (id) {
      dismiss(id);
    } else {
      dismiss();
    }
  };

  // Yeni özellik popup'ını göster
  const showNewFeatures = () => {
    setShowFeaturePopup(true);
    
    showToast({
      title: "Yeni Özellikler",
      description: "Turkcell SynBot artık daha kapsamlı sistem bilgileriyle donatıldı!",
      action: <Button onClick={() => dismiss()}>Kapat</Button>
    });
  };

  // Özellik popup'ını kapat
  const closeFeaturePopup = () => {
    setShowFeaturePopup(false);
  };

  // E-posta şablonu oluşturma
  const handleGenerateEmail = async () => {
    if (!emailSubject.trim() || !emailContext.trim()) {
      setEmailError('Lütfen konu ve içerik bilgilerini doldurunuz.');
      return;
    }
    
    setEmailLoading(true);
    setEmailError('');
    setGeneratedEmail('');
    
    try {
      // Gemini API'ye doğrudan istek
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
                parts: [{ text: `Sen Turkcell'in profesyonel e-posta yazarısın. Aşağıdaki bilgilere dayanarak profesyonel bir ${emailType === 'formal' ? 'resmi' : emailType === 'friendly' ? 'samimi' : 'normal'} Turkcell kurumsal e-posta şablonu oluştur. E-posta Türkçe olmalı ve Turkcell'in kurumsal dilini yansıtmalı. Sadece e-posta metnini döndür, ek açıklama ekleme.

Konu: ${emailSubject}
İçerik bilgisi: ${emailContext}` }]
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
        throw new Error(`API hatası: ${response.status}`);
      }

      const data = await response.json();
      const emailTemplate = data.candidates?.[0]?.content?.parts?.[0]?.text || 'E-posta şablonu oluşturulamadı.';
      
      setGeneratedEmail(emailTemplate);
    } catch (err: any) {
      console.error('E-posta şablonu oluşturulurken hata:', err);
      setEmailError(err.message || 'E-posta şablonu oluşturulamadı.');
    } finally {
      setEmailLoading(false);
    }
  };

  // E-posta şablonunu kopyalama
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    showToast({
      title: 'Başarılı',
      description: 'E-posta şablonu panoya kopyalandı.',
      duration: 3000,
    });
  };

  const ozellikler = [
    {
      title: "Anlık Yanıtlar",
      description: "Turkcell sistemleri, süreçleri ve servislerine ilişkin sorularınıza anında yanıt alın",
      icon: Zap,
    },
    {
      title: "Akıllı Dokümantasyon",
      description: "Prosedür kılavuzları, süreç akışları ve teknik dokümanlara kolayca erişim",
      icon: FileText,
    },
    {
      title: "İşlem Rehberliği",
      description: "Karmaşık işlemlerde adım adım yönlendirme ve olası hataları önleme",
      icon: CheckCircle,
    },
    {
      title: "Kod Örnekleri",
      description: "Turkcell API'leri ve servislerini kullanmak için örnek kod parçaları",
      icon: Code,
    },
    {
      title: "Performans Analitiği",
      description: "İşlem ve süreçlerinizin verimliliğini artıracak öneriler",
      icon: BarChart,
    },
    {
      title: "Ekip İşbirliği",
      description: "Ekip arkadaşlarınızla bilgi ve yanıtları kolayca paylaşma",
      icon: Users,
    },
  ];

  const ornekSorular = [
    "Numara taşıma sürecinde dikkat edilmesi gereken adımlar nelerdir?",
    "BiP API'sine nasıl bağlanırım?",
    "Fatura itiraz sürecinde kullanılan evrak kodu nedir?",
    "5G şebeke optimizasyonu için hangi parametreler kontrol edilmeli?",
    "CRM sisteminde müşteri bilgilerini güncellerken yapılan yaygın hatalar nelerdir?",
    "Kurumsal müşteri VPN tanımlamasında gerekli onay süreci nasıl işler?",
    "Kampanya tanımlama ekranında fiyat parametreleri nerede bulunur?",
    "Lifebox servisinde dosya paylaşımı için izin seviyelerini nasıl ayarlarım?",
    "Yeni bir BTS kurulumunda sinyal kalitesi nasıl test edilir?",
    "Dijital Operatör servisinde 2040 hata kodu ne anlama gelir?"
  ];

  const synbotKategoriler = [
    { id: "destek", title: "Müşteri Desteği", icon: MessageSquare, count: 218 },
    { id: "servis", title: "Servis Yönetimi", icon: Zap, count: 156 },
    { id: "teknik", title: "Teknik Bilgi", icon: Code, count: 195 },
    { id: "surecler", title: "İş Süreçleri", icon: CheckCircle, count: 174 },
    { id: "hata", title: "Hata Giderme", icon: AlertCircle, count: 132 },
    { id: "oneri", title: "Verimlilik Önerileri", icon: Lightbulb, count: 89 },
  ];

  // Mesaj gönderme bileşeni
  const ChatInput = () => {
    const [localInput, setLocalInput] = useState('');
    const [isSending, setIsSending] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!localInput.trim() || isSending) return;
      
      setIsSending(true);
      
      try {
        // Kullanıcı mesajını ekle
        const userMessage = localInput;
        setLocalInput('');
        
        // Mesaj gönderme fonksiyonunu çağır
        await sendMessage({
          preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>);
      } catch (error) {
        console.error('Mesaj gönderme hatası:', error);
      } finally {
        setIsSending(false);
      }
    };
    
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
        <Input
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          placeholder="SynBot'a bir soru sorun veya yardım isteyin..."
          className="flex-1"
          disabled={isSending}
        />
        <Button 
          type="submit" 
          disabled={isSending}
          className="bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] text-white hover:opacity-90"
        >
          {isSending ? (
            <div className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="sr-only">Gönderiliyor...</span>
            </div>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    );
  };
  
  // Chat UI
  const ChatUI = () => {
    if (view !== 'chat') return null;
    
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <iframe 
            src="/dashboard/synbot-direct?fullscreen=true" 
            className="w-full h-full border-none" 
            title="SynBot - Doğrudan Gemini API"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-1 bg-gradient-to-b from-[#ffc72c] to-[#00a0d2]"></div>
          <h1 className="text-3xl font-bold">SynBot - Turkcell İç Kaynaklı Asistan</h1>
        </div>
        <p className="text-muted-foreground ml-10">
          Turkcell süreçleri, sistemleri ve servislerinde yapay zeka destekli işlem ve destek asistanı
        </p>
        
        <div className="flex ml-10 mt-2 gap-4">
          <Button 
            onClick={() => {
              router.push('/dashboard/synbot-direct?fullscreen=true');
            }}
            className="bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] hover:from-[#e0b025] hover:to-[#008db8] text-white"
            size="sm"
          >
            Tam Ekran SynBot'u Aç
          </Button>
          
          <Button 
            onClick={() => {
              router.push('/dashboard/synbot?tab=email');
            }}
            variant="outline"
            size="sm"
            className="border-[#00a0d2] text-[#00a0d2] hover:bg-[#00a0d2]/10"
          >
            E-posta Şablonu Oluştur
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffc72c]/20 to-[#00a0d2]/20"></div>
            <div className="p-8 relative">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] p-3 rounded-xl">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">SynBot ile Konuşun</h2>
                  <p className="text-muted-foreground">
                    Turkcell sistemleri, süreçleri ve hata kodları hakkında sorular sorun, adım adım yönlendirmeler alın
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-card border rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/images/synbot-avatar.png" alt="SynBot" />
                        <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">SynBot</span>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Çevrimiçi
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 h-[340px] overflow-y-auto space-y-4 bg-background">
                  {konusmaDemosu.map((item, index) => (
                    <div key={index} className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-[80%] ${item.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                          {item.type === 'user' ? (
                            <>
                              <AvatarImage src="/images/user-avatar.png" alt="Kullanıcı" />
                              <AvatarFallback className="bg-primary text-primary-foreground">HT</AvatarFallback>
                            </>
                          ) : (
                            <>
                              <AvatarImage src="/images/synbot-avatar.png" alt="SynBot" />
                              <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div>
                          <div className={`p-3 rounded-lg ${
                            item.type === 'user' 
                              ? 'bg-primary text-primary-foreground rounded-tr-none' 
                              : 'bg-muted rounded-tl-none'
                          }`}>
                            {item.message === '...' ? (
                              <div className="flex space-x-2 items-center">
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0ms'}}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '150ms'}}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '300ms'}}></div>
                              </div>
                            ) : (
                              <p className="text-sm whitespace-pre-line">{item.message}</p>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    
                    // Get demo input value
                    const input = (document.getElementById('demo-input') as HTMLInputElement).value;
                    if (!input.trim()) return;
                    
                    // Add to demo conversation
                    const newUserMsg = {
                      type: 'user' as 'user' | 'bot',
                      message: input,
                      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    };
                    
                    // Create a new array with the additional message
                    const updatedConversation = [...konusmaDemosu, newUserMsg];
                    
                    // Update the state
                    setKonusmaDemosu(updatedConversation);
                    
                    // Clear input
                    (document.getElementById('demo-input') as HTMLInputElement).value = '';
                    
                    // Add loading indicator
                    const loadingMsg = {
                      type: 'bot' as 'user' | 'bot',
                      message: '...',
                      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    };
                    setKonusmaDemosu(prev => [...prev, loadingMsg]);
                    
                    // Call Gemini API directly
                    const callGeminiAPI = async () => {
                      try {
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
                                  parts: [{ text: 'Sen Turkcell\'in yapay zeka asistanısın. Adın SynBot. Turkcell sistemleri, süreçleri ve hata kodları hakkında sorulara kısa, net ve gerçek yanıtlar ver. Asla statik yanıt verme ve bilmediğin konularda dürüst ol. Yanıtların 2-3 cümleden daha uzun olmasın.' }]
                                },
                                {
                                  role: 'user',
                                  parts: [{ text: input }]
                                }
                              ],
                              generationConfig: {
                                temperature: 0.7,
                                maxOutputTokens: 300
                              }
                            })
                          }
                        );
                        
                        if (!response.ok) {
                          throw new Error(`API hatası: ${response.status}`);
                        }
                        
                        const data = await response.json();
                        const geminiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Yanıt alınamadı';
                        
                        // Remove loading message
                        setKonusmaDemosu(prev => prev.filter(msg => msg.message !== '...'));
                        
                        // Add the actual response
                        const botMsg = {
                          type: 'bot' as 'user' | 'bot',
                          message: geminiResponse,
                          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        };
                        
                        setKonusmaDemosu(prev => [...prev, botMsg]);
                        
                      } catch (error) {
                        console.error('Gemini API hatası:', error);
                        
                        // Remove loading message
                        setKonusmaDemosu(prev => prev.filter(msg => msg.message !== '...'));
                        
                        // Add fallback message in case of error
                        const fallbackMsg = {
                          type: 'bot' as 'user' | 'bot',
                          message: 'Yanıt oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.',
                          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        };
                        
                        setKonusmaDemosu(prev => [...prev, fallbackMsg]);
                      }
                    };
                    
                    callGeminiAPI();
                    
                  }} className="flex gap-2">
                    <Input 
                      id="demo-input"
                      placeholder="Turkcell sistemleri veya süreçleri hakkında bir soru sorun..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] text-white hover:from-[#e0b025] hover:to-[#008db8]">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center gap-2">
                <Button 
                  onClick={() => {
                    // Redirect to the direct page with fullscreen parameter
                    router.push('/dashboard/synbot-direct?fullscreen=true');
                  }}
                  className="bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] hover:from-[#e0b025] hover:to-[#008db8] text-white"
                >
                  Tam Ekran SynBot'u Aç
                </Button>
                
                <Button 
                  onClick={() => {
                    router.push('/dashboard/synbot?tab=email');
                  }}
                  className="bg-white border border-[#00a0d2] text-[#00a0d2] hover:bg-[#00a0d2]/10"
                >
                  E-posta Şablonu Oluştur
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="ozellikler" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-flex">
              <TabsTrigger value="ozellikler">Özellikler</TabsTrigger>
              <TabsTrigger value="ornekler">Örnek Kullanımlar</TabsTrigger>
              <TabsTrigger value="entegrasyonlar">Entegrasyonlar</TabsTrigger>
              <TabsTrigger value="email">E-posta Oluştur</TabsTrigger>
            </TabsList>

            <TabsContent value="ozellikler" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ozellikler.map((ozellik, index) => (
                  <Card key={index} className="border-[#00a0d2]/20 hover:border-[#00a0d2]/40 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-gradient-to-br from-[#ffc72c]/20 to-[#00a0d2]/20 p-2 rounded-lg">
                          <ozellik.icon className="h-5 w-5 text-[#00a0d2]" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{ozellik.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{ozellik.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ornekler">
              <Card>
                <CardHeader>
                  <CardTitle>SynBot Kullanım Senaryoları</CardTitle>
                  <CardDescription>
                    SynBot'un günlük işlerinizi kolaylaştırdığı örnek senaryolar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <MessageSquare className="h-5 w-5 text-[#ffc72c]" />
                        Hata Kodları Çözümü
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Sistemlerde karşılaştığınız hata kodlarını anlamlandırma ve çözüm önerileri alma
                      </p>
                      <div className="bg-card border rounded-lg p-3">
                        <p className="text-sm font-medium mb-1">SynBot'a Sorun:</p>
                        <p className="text-sm text-muted-foreground">"BiP servisinde 'Error 10054' hatasını alıyorum. Bu ne anlama geliyor ve nasıl çözebilirim?"</p>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-[#00a0d2]" />
                        Süreç Rehberliği
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Karmaşık iş süreçlerinde adım adım yönlendirme ve rehberlik
                      </p>
                      <div className="bg-card border rounded-lg p-3">
                        <p className="text-sm font-medium mb-1">SynBot'a Sorun:</p>
                        <p className="text-sm text-muted-foreground">"Kurumsal müşteri için çoklu hat taşıma sürecini başlatmak istiyorum. Gerekli adımlar nelerdir?"</p>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <Code className="h-5 w-5 text-[#ffc72c]" />
                        API ve Entegrasyon Yardımı
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Turkcell API'leri ve servislerinin kullanımı için rehberlik ve örnek kodlar
                      </p>
                      <div className="bg-card border rounded-lg p-3">
                        <p className="text-sm font-medium mb-1">SynBot'a Sorun:</p>
                        <p className="text-sm text-muted-foreground">"Lifebox API'sini kullanarak dosya yükleme için Python kodu örneği gösterir misin?"</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="entegrasyonlar">
              <Card>
                <CardHeader>
                  <CardTitle>Sistem Entegrasyonları</CardTitle>
                  <CardDescription>
                    SynBot'un Turkcell sistemleriyle entegre çalışma özellikleri
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="bg-[#ffc72c]/10 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-[#ffc72c]" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Turkcell İş Dokümanları Entegrasyonu</h3>
                        <p className="text-sm text-muted-foreground">
                          Tüm Turkcell prosedürleri, iş süreçleri ve teknik dokümantasyonlarına erişim sağlar.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="bg-[#00a0d2]/10 p-2 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-[#00a0d2]" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">CRM Sistemi Entegrasyonu</h3>
                        <p className="text-sm text-muted-foreground">
                          CRM ekranlarına doğrudan entegre olarak, işlem yaparken içerik duyarlı yardım sunar.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="bg-[#ffc72c]/10 p-2 rounded-lg">
                        <BarChart className="h-5 w-5 text-[#ffc72c]" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">İş Analitiği Entegrasyonu</h3>
                        <p className="text-sm text-muted-foreground">
                          Performans metriklerinizi analiz ederek verimliliği artıracak öneriler sunar.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="bg-[#00a0d2]/10 p-2 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-[#00a0d2]" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Hata Yönetim Sistemi Entegrasyonu</h3>
                        <p className="text-sm text-muted-foreground">
                          Hata kodlarını ve sistem uyarılarını anlamlandırarak hızlı çözüm yolları sunar.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>Kurumsal E-posta Şablonu Oluştur</span>
                    <Badge className="bg-[#ffc72c] text-[#333333]">SynBot Asistan</Badge>
                  </CardTitle>
                  <CardDescription>
                    SynBot ile sohbet ederek Turkcell kurumsal diline uygun profesyonel bir e-posta şablonu oluşturun.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 h-[340px] overflow-y-auto space-y-4 border rounded-md bg-background">
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                          <AvatarImage src="/images/synbot-avatar.png" alt="SynBot" />
                          <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="p-3 rounded-lg bg-muted rounded-tl-none">
                            <p className="text-sm whitespace-pre-line">Merhaba! Size profesyonel bir e-posta şablonu oluşturmama yardımcı olayım. Lütfen önce e-posta tonunu seçin:</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-12">
                      <Button 
                        type="button" 
                        onClick={() => setEmailType('formal')}
                        variant={emailType === 'formal' ? 'default' : 'outline'}
                        size="sm"
                        className={emailType === 'formal' ? 'bg-[#ffc72c] text-[#333333] hover:bg-[#e0b025]' : ''}
                      >
                        Resmi
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => setEmailType('normal')}
                        variant={emailType === 'normal' ? 'default' : 'outline'}
                        size="sm"
                        className={emailType === 'normal' ? 'bg-[#ffc72c] text-[#333333] hover:bg-[#e0b025]' : ''}
                      >
                        Normal
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => setEmailType('friendly')}
                        variant={emailType === 'friendly' ? 'default' : 'outline'}
                        size="sm"
                        className={emailType === 'friendly' ? 'bg-[#ffc72c] text-[#333333] hover:bg-[#e0b025]' : ''}
                      >
                        Samimi
                      </Button>
                    </div>

                    {emailType && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                            <AvatarImage src="/images/synbot-avatar.png" alt="SynBot" />
                            <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="p-3 rounded-lg bg-muted rounded-tl-none">
                              <p className="text-sm whitespace-pre-line">
                                {emailType === 'formal' ? 'Resmi' : emailType === 'friendly' ? 'Samimi' : 'Normal'} ton seçtiniz. Şimdi lütfen e-postanızın konusunu girin:
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {emailType && (
                      <div className="ml-12 space-y-2">
                        <Input
                          value={emailSubject}
                          onChange={e => setEmailSubject(e.target.value)}
                          placeholder="Örn: Turkcell Dijital Hizmetler Bilgilendirmesi"
                          className="w-full"
                        />
                      </div>
                    )}

                    {emailSubject && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                            <AvatarImage src="/images/synbot-avatar.png" alt="SynBot" />
                            <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="p-3 rounded-lg bg-muted rounded-tl-none">
                              <p className="text-sm whitespace-pre-line">
                                Harika! Son olarak, e-postanızın içeriği hakkında bilgi verin:
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {emailSubject && (
                      <div className="ml-12 space-y-2">
                        <Textarea
                          value={emailContext}
                          onChange={e => setEmailContext(e.target.value)}
                          placeholder="Yazılacak e-postanın içeriği hakkında bilgi verin... Örn: Kurumsal müşterilerimize yeni dijital hizmetlerimiz hakkında bilgilendirme yapılacak."
                          className="min-h-24 w-full"
                        />
                      </div>
                    )}

                    {emailSubject && emailContext && (
                      <div className="ml-12 space-y-2">
                        <Button 
                          type="button" 
                          onClick={handleGenerateEmail}
                          className="w-full bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] text-white hover:opacity-90"
                          disabled={emailLoading}
                        >
                          {emailLoading ? (
                            <div className="flex items-center gap-2">
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              <span>E-posta Oluşturuluyor...</span>
                            </div>
                          ) : (
                            <span>E-posta Şablonu Oluştur</span>
                          )}
                        </Button>
                      </div>
                    )}

                    {emailLoading && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                            <AvatarImage src="/images/synbot-avatar.png" alt="SynBot" />
                            <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="p-3 rounded-lg bg-muted rounded-tl-none">
                              <div className="flex space-x-2 items-center">
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0ms'}}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '150ms'}}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '300ms'}}></div>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {generatedEmail && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                            <AvatarImage src="/images/synbot-avatar.png" alt="SynBot" />
                            <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="p-3 rounded-lg bg-muted rounded-tl-none">
                              <div className="flex flex-col gap-3">
                                <p className="text-sm font-medium">İşte oluşturulan e-posta şablonu:</p>
                                <div className="rounded-md border p-3 bg-card">
                                  <pre className="text-sm whitespace-pre-wrap font-sans">{generatedEmail}</pre>
                                </div>
                                <Button 
                                  onClick={copyEmailToClipboard}
                                  className="self-end text-xs bg-[#00a0d2] hover:bg-[#00a0d2]/80"
                                  size="sm"
                                >
                                  <Copy className="h-3 w-3 mr-1" /> Kopyala
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {emailError && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                            <AvatarImage src="/images/synbot-avatar.png" alt="SynBot" />
                            <AvatarFallback className="bg-gradient-to-br from-[#ffc72c] to-[#00a0d2] text-white">SB</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="p-3 rounded-lg bg-red-100 rounded-tl-none">
                              <p className="text-sm whitespace-pre-line text-red-700">
                                <AlertCircle className="h-4 w-4 inline-block mr-1" />
                                {emailError}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 border-t p-4">
                  <Input 
                    placeholder="Özel bir talimat girin veya şablonu düzeltmemi isteyin..."
                    className="flex-1"
                  />
                  <Button type="button" className="bg-gradient-to-r from-[#ffc72c] to-[#00a0d2] text-white hover:opacity-90">
                    <Send className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-[#ffc72c]/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#ffc72c]" />
                Örnek Sorular
              </CardTitle>
              <CardDescription>
                SynBot'a sorabileceğiniz örnek sorular
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {ornekSorular.slice(0, 5).map((soru, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#ffc72c] mt-1 flex-shrink-0" />
                    <p className="text-sm">{soru}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="gap-1 text-xs w-full justify-center">
                <span>Daha Fazla Örnek Gör</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-[#00a0d2]/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#00a0d2]" />
                Bilgi Kategorileri
              </CardTitle>
              <CardDescription>
                SynBot'un uzman olduğu alanlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {synbotKategoriler.map((kategori) => (
                  <div 
                    key={kategori.id} 
                    className="flex flex-col items-center p-3 border rounded-lg hover:border-[#00a0d2]/40 transition-colors text-center cursor-pointer"
                  >
                    <kategori.icon className="h-6 w-6 text-[#00a0d2] mb-2" />
                    <span className="text-sm font-medium">{kategori.title}</span>
                    <span className="text-xs text-muted-foreground">{kategori.count} konu</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#ffc72c]/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-[#ffc72c]" />
                SynBot Avantajları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Timer className="h-4 w-4 text-[#ffc72c] mt-1" />
                  <div>
                    <p className="text-sm font-medium">Zaman Tasarrufu</p>
                    <p className="text-xs text-muted-foreground">Ortalama işlem süresini %40 azaltır</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-[#ffc72c] mt-1" />
                  <div>
                    <p className="text-sm font-medium">Hata Oranı Düşürme</p>
                    <p className="text-xs text-muted-foreground">İşlem hatalarını %65 azaltır</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-[#ffc72c] mt-1" />
                  <div>
                    <p className="text-sm font-medium">Kolay Bilgi Paylaşımı</p>
                    <p className="text-xs text-muted-foreground">Ekipler arası bilgi aktarımını hızlandırır</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-[#ffc72c] mt-1" />
                  <div>
                    <p className="text-sm font-medium">Sürekli Öğrenme</p>
                    <p className="text-xs text-muted-foreground">Güncel Turkcell prosedürlerine hemen adapte olur</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SynBotPage; 