"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  List,
  Maximize2,
  PlayCircle,
  Video,
} from "lucide-react";
import Link from "next/link";

// Aynı örnek veri (gerçeklikte API'den gelecek)
const learningPaths = [
  {
    id: "dijital-teknolojiler-kariyer-yolu",
    title: "Dijital Teknolojiler Kariyer Yolu",
    description: "5G teknolojileri, mobil uygulama geliştirme ve dijital servisler konusunda uzmanlaşmanızı sağlayacak eğitimler.",
    progress: 75,
    modules: [
      {
        id: 1,
        title: "Telekomünikasyon Temelleri",
        description: "Telekomünikasyon sektörünün temel prensipleri ve Turkcell'in dijital altyapısı.",
        completed: true,
        lessons: [
          {
            id: 1,
            title: "Telekomünikasyon Sektörüne Giriş",
            description: "Telekomünikasyon sektörünün temel prensipleri ve Turkcell'in sektördeki rolü.",
            type: "video",
            content: "https://example.com/video1",
            duration: "45 dakika",
            completed: true
          },
          {
            id: 2,
            title: "Turkcell Dijital Altyapısı",
            description: "Turkcell'in dijital dönüşüm stratejisi ve teknolojik altyapısı.",
            type: "article",
            content: "Turkcell'in dijital altyapısı, müşteri deneyimini iyileştirmek ve yenilikçi hizmetler sunmak için tasarlanmıştır...",
            duration: "30 dakika",
            completed: true
          }
        ]
      },
      {
        id: 2,
        title: "5G Teknolojileri ve Uygulamaları",
        description: "5G teknolojisinin temelleri, uygulamaları ve gelecek vizyonu.",
        completed: true,
        lessons: [
          {
            id: 3,
            title: "5G Teknolojisine Giriş",
            description: "5G teknolojisinin temelleri ve uygulama alanları.",
            type: "video",
            content: "https://example.com/video2",
            duration: "1 saat",
            completed: true
          }
        ]
      },
      {
        id: 3,
        title: "Dijital Servis Platformları",
        description: "Turkcell'in dijital servis platformları ve API ekosistemi.",
        completed: false,
        lessons: [
          {
            id: 4,
            title: "Dijital Servis Mimarisi",
            description: "Turkcell'in dijital servis mimarisi ve uygulama alanları.",
            type: "video",
            content: "https://example.com/video3",
            duration: "1 saat",
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "mobil-uygulama-gelistirme",
    title: "Mobil Uygulama Geliştirme",
    progress: 45,
    modules: [
      {
        id: 1,
        title: "Mobil Uygulama Temelleri",
        description: "Mobil uygulama geliştirmenin temel prensipleri.",
        completed: true,
        lessons: [
          {
            id: 1,
            title: "Mobil Uygulama Ekosistemi",
            description: "Mobil uygulama ekosistemini ve Turkcell entegrasyonlarını anlama.",
            type: "video",
            content: "https://example.com/videohtml",
            duration: "2 saat",
            completed: true
          }
        ]
      }
    ]
  }
];

export default function CourseContentPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [path, setPath] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    // API'den veri çekilecek
    const pathId = params.id as string;
    const moduleId = searchParams.get('module') ? parseInt(searchParams.get('module')!) : undefined;
    const lessonId = searchParams.get('lesson') ? parseInt(searchParams.get('lesson')!) : undefined;
    
    const foundPath = learningPaths.find(p => p.id === pathId);
    
    if (foundPath) {
      setPath(foundPath);
      
      // Modül ve ders seçimi
      let selectedModule;
      let selectedLesson;
      
      if (moduleId) {
        selectedModule = foundPath.modules.find(m => m.id === moduleId);
      } else {
        // Tamamlanmamış ilk modülü bul
        selectedModule = foundPath.modules.find(m => !m.completed) || foundPath.modules[0];
      }
      
      if (selectedModule) {
        setCurrentModule(selectedModule);
        
        if (lessonId) {
          selectedLesson = selectedModule.lessons.find(l => l.id === lessonId);
        } else {
          // Tamamlanmamış ilk dersi bul
          selectedLesson = selectedModule.lessons.find(l => !l.completed) || selectedModule.lessons[0];
        }
        
        if (selectedLesson) {
          setCurrentLesson(selectedLesson);
        }
      }
    }
    
    setLoading(false);
  }, [params.id, searchParams]);
  
  const handleNextLesson = () => {
    if (!currentModule || !currentLesson) return;
    
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);
    
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      // Aynı modülün bir sonraki dersi
      const nextLesson = currentModule.lessons[currentLessonIndex + 1];
      router.push(`/dashboard/ogrenme-yollari/${path.id}/content?module=${currentModule.id}&lesson=${nextLesson.id}`);
    } else {
      // Bir sonraki modülün ilk dersi
      const currentModuleIndex = path.modules.findIndex(m => m.id === currentModule.id);
      
      if (currentModuleIndex < path.modules.length - 1) {
        const nextModule = path.modules[currentModuleIndex + 1];
        if (nextModule.lessons.length > 0) {
          router.push(`/dashboard/ogrenme-yollari/${path.id}/content?module=${nextModule.id}&lesson=${nextModule.lessons[0].id}`);
        }
      }
    }
  };
  
  const handlePreviousLesson = () => {
    if (!currentModule || !currentLesson) return;
    
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);
    
    if (currentLessonIndex > 0) {
      // Aynı modülün bir önceki dersi
      const prevLesson = currentModule.lessons[currentLessonIndex - 1];
      router.push(`/dashboard/ogrenme-yollari/${path.id}/content?module=${currentModule.id}&lesson=${prevLesson.id}`);
    } else {
      // Bir önceki modülün son dersi
      const currentModuleIndex = path.modules.findIndex(m => m.id === currentModule.id);
      
      if (currentModuleIndex > 0) {
        const prevModule = path.modules[currentModuleIndex - 1];
        if (prevModule.lessons.length > 0) {
          const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
          router.push(`/dashboard/ogrenme-yollari/${path.id}/content?module=${prevModule.id}&lesson=${lastLesson.id}`);
        }
      }
    }
  };
  
  const handleCompleteLesson = () => {
    // Gerçek uygulamada API'ye istek atılacak
    // Şu an için sadece uyarı gösterelim
    alert("Ders tamamlandı olarak işaretlendi!");
    
    // Sonraki derse ilerle
    handleNextLesson();
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Yükleniyor...</h1>
      </div>
    );
  }
  
  if (!path || !currentModule || !currentLesson) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">İçerik bulunamadı</h1>
        <p className="mt-4">
          <Link href="/dashboard/ogrenme-yollari" className="text-blue-500 hover:underline">
            Tüm öğrenme yollarına dön
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Üst Bar */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/dashboard/ogrenme-yollari/${path.id}`)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">{path.title}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Modül {currentModule.id}: {currentModule.title}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden"
          >
            <List className="h-4 w-4 mr-2" />
            İçerik
          </Button>
          <div className="hidden lg:flex items-center gap-1">
            <Badge variant="outline" className="bg-blue-50 text-blue-600 font-normal">
              <Clock className="h-3 w-3 mr-1" /> {currentLesson.duration}
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              İndir
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* İçerik Menüsü (Mobilde gizli, buton ile açılır) */}
        <div className={`
          ${menuOpen ? 'flex' : 'hidden'} 
          lg:flex flex-col w-full lg:w-80 border-r overflow-y-auto
        `}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">İlerleme</span>
              <span className="text-sm font-medium">{path.progress}%</span>
            </div>
            <Progress value={path.progress} className="h-2" />
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">İçerikler</h2>
            
            <div className="space-y-4">
              {path.modules.map((module) => (
                <div key={module.id}>
                  <div 
                    className={`
                      flex items-center gap-2 p-2 rounded-md
                      ${currentModule.id === module.id ? 'bg-[#FFD100]/20 text-[#00A0D2]' : ''}
                    `}
                  >
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs
                      ${module.completed ? 'bg-[#00A0D2]/20 text-[#00A0D2]' : 'bg-gray-100 text-gray-600'}
                    `}>
                      {module.completed ? <CheckCircle className="h-3 w-3" /> : module.id}
                    </div>
                    <span className="font-medium">{module.title}</span>
                  </div>
                  
                  {currentModule.id === module.id && (
                    <ul className="ml-8 mt-2 space-y-1">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id} className="relative">
                          <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2">
                            {lesson.completed && (
                              <CheckCircle className="h-3 w-3 text-[#00A0D2]" />
                            )}
                          </div>
                          <button
                            onClick={() => {
                              router.push(`/dashboard/ogrenme-yollari/${path.id}/content?module=${module.id}&lesson=${lesson.id}`);
                              setMenuOpen(false);
                            }}
                            className={`
                              w-full text-left py-1 px-2 rounded text-sm
                              ${currentLesson.id === lesson.id ? 'bg-[#FFD100]/20 text-[#00A0D2]' : ''}
                              ${lesson.completed ? 'text-gray-500' : ''}
                            `}
                          >
                            {lesson.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Ana İçerik */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="p-4 flex-1">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
              <p className="text-gray-600 mb-6">{currentLesson.description}</p>
              
              <div className="bg-[#F8F9FA] rounded-lg mb-8">
                {currentLesson.type === 'video' && (
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button className="bg-[#00A0D2] hover:bg-[#0080A8] h-16 w-16 rounded-full">
                        <PlayCircle className="h-10 w-10" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Button variant="outline" size="icon" className="bg-black/30 text-white border-0">
                        <Maximize2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentLesson.type === 'article' && (
                  <div className="p-6 bg-white rounded-lg border">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="h-5 w-5 text-[#00A0D2]" />
                      <span className="font-medium">Makale</span>
                    </div>
                    <div className="prose max-w-none">
                      <p>{currentLesson.content}</p>
                      <p>Bu ders içeriği, bir makale formatında sunulmaktadır. Gerçek uygulamada, burada zengin metin formatında bir içerik yer alacaktır.</p>
                    </div>
                  </div>
                )}
              </div>
              
              <Tabs defaultValue="notes" className="mt-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="notes" className="data-[state=active]:bg-[#FFD100]/20 data-[state=active]:text-[#00A0D2]">Notlar</TabsTrigger>
                  <TabsTrigger value="resources" className="data-[state=active]:bg-[#FFD100]/20 data-[state=active]:text-[#00A0D2]">Kaynaklar</TabsTrigger>
                  <TabsTrigger value="discussion" className="data-[state=active]:bg-[#FFD100]/20 data-[state=active]:text-[#00A0D2]">Tartışma</TabsTrigger>
                </TabsList>
                
                <TabsContent value="notes">
                  <div className="p-4 border rounded-lg">
                    <p className="text-gray-500">Bu ders için notlarınızı buraya ekleyebilirsiniz.</p>
                    <textarea 
                      className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      rows={5}
                      placeholder="Notlarınızı buraya yazın..."
                    ></textarea>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources">
                  <div className="p-4 border rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#00A0D2]" />
                        <a href="#" className="text-[#00A0D2] hover:underline">
                          Ders sunum dosyası
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-[#00A0D2]" />
                        <a href="#" className="text-[#00A0D2] hover:underline">
                          Alıştırma sayfası
                        </a>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="discussion">
                  <div className="p-4 border rounded-lg">
                    <p className="text-gray-500">Bu ders için henüz tartışma başlatılmamış.</p>
                    <Button className="mt-2 bg-[#00A0D2] hover:bg-[#0080A8]">Tartışma Başlat</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Alt Bar - Navigasyon */}
          <div className="flex items-center justify-between border-t p-4">
            <Button
              variant="outline"
              onClick={handlePreviousLesson}
              disabled={currentModule.id === 1 && currentLesson.id === 1}
              className="border-[#00A0D2]/20 text-[#00A0D2] hover:bg-[#FFD100]/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Önceki
            </Button>
            
            <div>
              {!currentLesson.completed && (
                <Button onClick={handleCompleteLesson} className="bg-[#00A0D2] hover:bg-[#0080A8]">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Tamamlandı Olarak İşaretle
                </Button>
              )}
            </div>
            
            <Button
              variant="outline"
              onClick={handleNextLesson}
              disabled={
                currentModule.id === path.modules.length && 
                currentLesson.id === currentModule.lessons.length
              }
              className="border-[#00A0D2]/20 text-[#00A0D2] hover:bg-[#FFD100]/10"
            >
              Sonraki
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 