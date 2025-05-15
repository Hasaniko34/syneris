'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
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
import { motion, AnimatePresence } from "@/components/motion-wrapper";
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

// SearchParams için wrapper component
function SearchParamsWrapper({ children }: { children: (props: { sessionId: string | null }) => React.ReactNode }) {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  
  return children({ sessionId });
}

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
  const router = useRouter();
  const { data: session } = useSession();
  // Remove the direct call
  // const searchParams = useSearchParams();
  // Put this value in state instead 
  const [sessionIdFromParam, setSessionIdFromParam] = useState<string | null>(null);
  
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChatSession, setActiveChatSession] = useState<string>('');
  const [activeTabId, setActiveTabId] = useState('chat');
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState('Nasıl yardımcı olabilirim?');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showNewSessionInput, setShowNewSessionInput] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [showFeatureHighlight, setShowFeatureHighlight] = useState(false);
  const [showNewFeatureDialog, setShowNewFeatureDialog] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  
  // Oturumları yükle
  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 saniye zaman aşımı
      
      const response = await fetch('/api/synbot/sessions', {
        signal: controller.signal
      }).catch(error => {
        console.error("Fetch hatası:", error);
        return new Response(JSON.stringify({ success: false, error: "Bağlantı hatası" }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      });
      
      clearTimeout(timeoutId);
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSessions(data.sessions || []);
      } else {
        console.error("Oturumlar alınamadı:", data);
        toast({
          title: "Oturumlar yüklenemedi",
          description: "Veritabanına bağlanırken sorun oluştu. Sayfayı yenileyin veya daha sonra tekrar deneyin.",
          variant: "destructive"
        });
        // Boş oturumlar listesi ile devam et
        setSessions([]);
      }
    } catch (error) {
      console.error("Oturumlar yüklenirken hata:", error);
      toast({
        title: "Bağlantı hatası",
        description: "Sunucu ile iletişim kurulamadı. Daha sonra tekrar deneyin.",
        variant: "destructive"
      });
      // Hata durumunda boş liste
      setSessions([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Oturum seçme
  const selectSession = (sessionId: string) => {
    // Bu fonksiyon daha sonra implementasyon için eklenecek
    setActiveChatSession(sessionId);
  };
  
  useEffect(() => {
    if (sessionIdFromParam) {
      // Burası önceden searchParams.get("sessionId") olan kısmın yerine
      loadSessions().then(() => {
        if (sessionIdFromParam) {
          selectSession(sessionIdFromParam);
        }
      });
    } else {
      loadSessions();
    }
    // Check for new features
    const hasSeenNewFeatures = localStorage.getItem('synbot_seen_features_v1');
    if (!hasSeenNewFeatures) {
      setShowNewFeatureDialog(true);
    }
  }, [sessionIdFromParam]);

  return (
    <div className="container mx-auto h-[calc(100vh-6rem)] p-4 relative overflow-hidden">
      {/* Add the Suspense boundary and SearchParamsWrapper */}
      <Suspense fallback={<div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin"></div>}>
        <SearchParamsWrapper>
          {({ sessionId }) => {
            // Set the sessionId from URL parameter to state
            if (sessionId !== sessionIdFromParam) {
              setSessionIdFromParam(sessionId);
            }
            
            return null;
          }}
        </SearchParamsWrapper>
      </Suspense>
      
      {/* ... rest of the component JSX ... */}
    </div>
  );
};

export default SynBotPage; 