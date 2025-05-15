"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building,
  MapPin,
  Briefcase,
  Clock,
  Award,
  FileText,
  Users,
  Edit,
  Lock,
  Bell,
  ExternalLink,
  Upload,
  Trash2,
  Save,
  BookOpen,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  // Kullanıcı verilerini al
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError("");
        
        const response = await fetch('/api/users/profile');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Kullanıcı bilgileri alınamadı');
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Kullanıcı bilgileri alınamadı');
        }
        
        // Turkcell'e uygun örnek veriler
        const userData = {
          ...data.user,
          coverPhoto: data.user.coverPhoto || "",
          activity: data.user.activity || [
            {
              id: 1,
              action: "Eğitimi tamamladı",
              subject: "Turkcell Dijital Servisler Araç Seti",
              date: "Bugün, 14:35",
              icon: <BookOpen className="h-4 w-4 text-[#FFD100]" />
            },
            {
              id: 2,
              action: "Sertifika kazandı",
              subject: "5G Teknolojileri ve Şebeke Yönetimi",
              date: "Dün, 10:20",
              icon: <Award className="h-4 w-4 text-[#00A0D2]" />
            },
            {
              id: 3,
              action: "Eğitime katıldı",
              subject: "Müşteri Deneyimi ve Dijital Kanal Yönetimi",
              date: "2 gün önce, 09:15",
              icon: <Play className="h-4 w-4 text-[#FFD100]" />
            }
          ],
          certificates: data.user.certificates || [
            {
              id: 1,
              name: "Turkcell Dijital Servisler Sertifikası",
              issuer: "Turkcell Akademi",
              date: "15 Mayıs 2023",
              expires: "15 Mayıs 2025",
              id: "CERT-TCELL-123456"
            },
            {
              id: 2,
              name: "5G ve Şebeke Operasyonları Uzmanı",
              issuer: "Turkcell Akademi",
              date: "10 Ocak 2023",
              expires: "10 Ocak 2025",
              id: "CERT-TCELL-789012"
            }
          ],
          skills: data.user.skills || [
            {
              name: "Dijital Servisler Yönetimi",
              level: 90
            },
            {
              name: "Şebeke Operasyonları",
              level: 85
            },
            {
              name: "Müşteri Deneyimi",
              level: 80
            },
            {
              name: "Mobil Uygulama Geliştirme",
              level: 75
            }
          ],
          education: data.user.education || [
            {
              degree: "Turkcell Telekomünikasyon Temel Eğitimi",
              school: "Turkcell Akademi",
              year: "2022"
            },
            {
              degree: "Dijital Servisler ve İnovasyon Eğitimi",
              school: "Turkcell Dijital Dönüşüm Okulu",
              year: "2023"
            }
          ]
        };
        
        setUser(userData);
      } catch (error: any) {
        console.error('Kullanıcı verileri yüklenirken hata:', error);
        setError(error.message || 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const handleAvatarUpload = () => {
    // Gerçek uygulamada dosya yükleme işlemi burada olacak
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 2000);
  };

  const handleCoverPhotoUpload = () => {
    // Gerçek uygulamada kapak fotoğrafı yükleme işlemi burada olacak
    setIsCoverUploading(true);
    setTimeout(() => {
      setIsCoverUploading(false);
      // Burada başarı mesajı gösterme durumu eklenebilir
    }, 2000);
  };

  // Yükleniyor durumu
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Profil bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="bg-destructive/10 text-destructive p-3 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold">Profil bilgileri yüklenemedi</h3>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()}>Yeniden Dene</Button>
        </div>
      </div>
    );
  }

  // Kullanıcı bulunamadıysa
  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="bg-amber-500/10 text-amber-500 p-3 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold">Kullanıcı bilgileri bulunamadı</h3>
          <p className="text-muted-foreground">Oturum bilgileriniz geçersiz olabilir. Lütfen tekrar giriş yapın.</p>
          <Button onClick={() => window.location.href = '/auth/signin'}>Giriş Sayfasına Git</Button>
        </div>
      </div>
    );
  }

  // Tarih formatı
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Profil Üst Kısmı */}
      <motion.div variants={itemVariants} className="relative">
        {/* Kapak Fotoğrafı */}
        <div className="h-48 w-full rounded-xl bg-gradient-to-r from-[#FFD100] to-[#00A0D2] relative overflow-hidden">
          {user.coverPhoto ? (
            <Image
              src={user.coverPhoto}
              alt="Kapak Fotoğrafı"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                // Hata durumunda gradient arkaplanı göster
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-4 right-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="h-8 gap-1">
                  <Edit size={14} />
                  Kapak Fotoğrafını Değiştir
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-md border-none shadow-lg">
                <DialogHeader>
                  <DialogTitle>Kapak Fotoğrafını Güncelle</DialogTitle>
                  <DialogDescription>
                    Profiliniz için yeni bir kapak fotoğrafı yükleyin.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid place-items-center py-6">
                  <div className="relative w-full h-32 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 overflow-hidden">
                    {isCoverUploading && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Input 
                      id="cover-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleCoverPhotoUpload} 
                    />
                    <Button
                      variant="outline"
                      className="gap-1"
                      onClick={() => document.getElementById('cover-upload')?.click()}
                      disabled={isCoverUploading}
                    >
                      <Upload size={14} />
                      Fotoğraf Yükle
                    </Button>
                    <Button
                      variant="destructive"
                      className="gap-1"
                      disabled={isCoverUploading}
                    >
                      <Trash2 size={14} />
                      Fotoğrafı Kaldır
                    </Button>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCoverUploading(false)}>
                    İptal
                  </Button>
                  <Button type="submit" disabled={isCoverUploading}>
                    Kaydet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Avatar ve Temel Bilgiler */}
        <div className="flex flex-col md:flex-row gap-4 md:items-end -mt-16 md:-mt-12 px-4 md:px-6">
          <div className="relative z-10">
            <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-[#FFD100]/20">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="text-4xl bg-[#FFD100] text-white">
                {user.name.split(' ').map((name: string) => name[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-2 right-2 h-8 w-8 p-0 rounded-full shadow-md bg-[#FFD100] hover:bg-[#FFC100] text-white"
                >
                  <Edit size={14} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-md border-none shadow-lg">
                <DialogHeader>
                  <DialogTitle>Profil Fotoğrafını Güncelle</DialogTitle>
                  <DialogDescription>
                    Hesabınız için yeni bir profil fotoğrafı yükleyin veya mevcut fotoğrafı kaldırın.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid place-items-center py-6">
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-[#00A0D2]/20">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="text-4xl bg-[#00A0D2] text-primary-foreground">
                        {user.name.split(' ').map((name: string) => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    {isUploading && (
                      <div className="absolute inset-0 bg-background/80 rounded-full flex items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Input 
                      id="avatar-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarUpload} 
                    />
                    <Button
                      variant="outline"
                      className="gap-1"
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                      disabled={isUploading}
                    >
                      <Upload size={14} />
                      Fotoğraf Yükle
                    </Button>
                    <Button
                      variant="destructive"
                      className="gap-1"
                      disabled={isUploading || !user.image}
                    >
                      <Trash2 size={14} />
                      Fotoğrafı Kaldır
                    </Button>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploading(false)}>
                    İptal
                  </Button>
                  <Button type="submit" disabled={isUploading}>
                    Kaydet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold truncate text-[#00A0D2]">{user.name}</h1>
                <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{user.email}</span>
                  </div>
                  {user.role && (
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>{user.role === 'admin' ? 'TEB Yöneticisi' : user.role === 'manager' ? 'TEB Şube Müdürü' : user.role === 'trainer' ? 'TEB Eğitmeni' : 'TEB Çalışanı'}</span>
                    </div>
                  )}
                  {user.company && (
                    <div className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5" />
                      <span>{user.company.name || "Türk Ekonomi Bankası"}</span>
                    </div>
                  )}
                  {user.joinDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Katılma: {formatDate(user.joinDate)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="border-[#FFD100] text-[#FFD100]">
                  <Link href="/dashboard/profile/security">
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    Güvenlik Ayarları
                  </Link>
                </Button>
                <Button size="sm" asChild className="bg-[#FFD100] hover:bg-[#FFC100]">
                  <Link href="/dashboard/profile/edit">
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Profili Düzenle
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Ana İçerik */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#00A0D2]">Genel Bakış</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#00A0D2]">Aktiviteler</TabsTrigger>
          <TabsTrigger value="certificates" className="data-[state=active]:bg-[#e0f0fa] data-[state=active]:text-[#00A0D2]">Sertifikalar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Hakkında */}
            <Card className="md:col-span-2 border-[#00A0D2]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#00A0D2]">Hakkında</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 whitespace-pre-line">
                  {user.bio || "Turkcell bünyesinde telekomünikasyon profesyoneli olarak görev yapmaktayım. Müşteri memnuniyeti odaklı çalışarak, bankanın ürün ve hizmetlerini en iyi şekilde sunmayı hedefliyorum."}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#00A0D2]" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Telefon</p>
                        <p className="text-sm">{user.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {user.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#00A0D2]" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Şube</p>
                        <p className="text-sm">{user.location || "TEB Genel Müdürlük"}</p>
                      </div>
                    </div>
                  )}
                  
                  {user.department && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#00A0D2]" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Departman</p>
                        <p className="text-sm">{user.department || "Bireysel Bankacılık"}</p>
                      </div>
                    </div>
                  )}
                  
                  {user.joinDate && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#00A0D2]" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Katılma Tarihi</p>
                        <p className="text-sm">{formatDate(user.joinDate)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Beceriler */}
            <Card className="border-[#00A0D2]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#00A0D2]">Telekomünikasyon Yetkinlikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.skills && user.skills.length > 0 ? (
                    user.skills.map((skill: any, index: number) => (
                      <div key={index} className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-2 bg-[#e0f0fa]" 
                          indicatorClassName="bg-[#00A0D2]" 
                        />
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center">
                      <div className="mx-auto bg-[#e0f0fa] h-12 w-12 rounded-full flex items-center justify-center mb-3">
                        <Award className="h-6 w-6 text-[#00A0D2]" />
                      </div>
                      <p className="text-sm text-muted-foreground">Henüz yetkinlik eklenmemiş.</p>
                      <Button variant="link" size="sm" asChild className="mt-2 text-[#00A0D2]">
                        <Link href="/dashboard/profile/edit">
                          Yetkinlik Ekle
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Eğitim */}
            <Card className="md:col-span-3 border-[#00A0D2]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#00A0D2]">Turkcell Eğitimleri</CardTitle>
              </CardHeader>
              <CardContent>
                {user.education && user.education.length > 0 ? (
                  <div className="space-y-6">
                    {user.education.map((edu: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-[#e0f0fa] flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-[#00A0D2]" />
                        </div>
                        <div>
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">{edu.school}</p>
                          <p className="text-xs text-muted-foreground mt-1">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="mx-auto bg-[#e0f0fa] h-12 w-12 rounded-full flex items-center justify-center mb-3">
                      <FileText className="h-6 w-6 text-[#00A0D2]" />
                    </div>
                    <p className="text-sm text-muted-foreground">Henüz Turkcell eğitim bilgisi eklenmemiş.</p>
                    <Button variant="link" size="sm" asChild className="mt-2 text-[#00A0D2]">
                      <Link href="/dashboard/egitim-katalogu">
                        Eğitimlere Göz At
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card className="border-[#00A0D2]/20">
            <CardHeader>
              <CardTitle className="text-[#00A0D2]">Son Aktiviteler</CardTitle>
              <CardDescription>
                Turkcell Eğitim Platformundaki son aktiviteleriniz ve ilerlemeleriniz
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.activity && user.activity.length > 0 ? (
                <div className="space-y-6">
                  {user.activity.map((activity: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="mt-1">
                        <div className="h-8 w-8 rounded-full bg-[#e0f0fa] flex items-center justify-center">
                          {activity.icon}
                        </div>
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span>:{" "}
                          {activity.subject}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.date}
                        </p>
                        <Separator className="mt-3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto bg-[#e0f0fa] h-12 w-12 rounded-full flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <p className="text-sm text-muted-foreground">Henüz aktivite kaydı bulunmuyor.</p>
                  <Button variant="link" size="sm" asChild className="mt-2 text-[#00A0D2]">
                    <Link href="/dashboard/egitim-katalogu">
                      Eğitimlere Göz At
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="certificates" className="space-y-4">
          <Card className="border-[#00A0D2]/20">
            <CardHeader>
              <CardTitle className="text-[#00A0D2]">Turkcell Sertifikaları</CardTitle>
              <CardDescription>
                Turkcell Akademi'den kazandığınız tüm sertifikalar ve yeterlilikler
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.certificates && user.certificates.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {user.certificates.map((cert: any, index: number) => (
                    <div key={index} className="border border-[#00A0D2]/20 rounded-lg p-4 hover:bg-[#e0f0fa]/10 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-[#00A0D2]" />
                          <h4 className="font-medium">{cert.name}</h4>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Veren Kurum:</span>
                          <span>{cert.issuer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tarih:</span>
                          <span>{cert.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Geçerlilik:</span>
                          <span>{cert.expires}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sertifika ID:</span>
                          <span className="font-mono text-xs">{cert.id}</span>
                        </div>
                        <div className="pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full gap-1 border-[#00A0D2]/30 text-[#00A0D2] hover:bg-[#e0f0fa]/30"
                                onClick={() => setSelectedCertificate(cert)}
                              >
                                <ExternalLink size={14} />
                                Sertifikayı Görüntüle
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-md border-none shadow-lg">
                              <DialogHeader>
                                <DialogTitle className="text-[#00A0D2]">Sertifika Detayları</DialogTitle>
                                <DialogDescription>
                                  {cert.name} sertifikasının detayları ve doğrulama bilgileri.
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="p-6 border border-[#00A0D2]/20 rounded-lg bg-[#e0f0fa]/10 my-4 shadow-sm">
                                <div className="flex flex-col items-center mb-6">
                                  <Award className="h-16 w-16 text-[#00A0D2] mb-3" />
                                  <h3 className="text-xl font-bold text-center mb-1 text-[#00A0D2]">{cert.name}</h3>
                                  <p className="text-sm text-muted-foreground">Başarıyla tamamlandı</p>
                                </div>
                                
                                <div className="grid grid-cols-[0.8fr_1.2fr] gap-x-6 gap-y-4">
                                  <div className="text-sm text-muted-foreground border-b pb-2">Veren Kurum:</div>
                                  <div className="font-medium border-b pb-2 text-right">{cert.issuer}</div>
                                  
                                  <div className="text-sm text-muted-foreground border-b pb-2">Tarih:</div>
                                  <div className="border-b pb-2 text-right">{cert.date}</div>
                                  
                                  <div className="text-sm text-muted-foreground border-b pb-2">Geçerlilik:</div>
                                  <div className="border-b pb-2 text-right">{cert.expires}</div>
                                  
                                  <div className="text-sm text-muted-foreground">Sertifika ID:</div>
                                  <div className="text-right">
                                    <span className="font-mono text-xs bg-background px-2 py-1 rounded-md">{cert.id}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <DialogFooter className="flex gap-2 sm:justify-between">
                                <Button variant="outline" className="gap-1 border-[#00A0D2]/30 text-[#00A0D2]">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                  PDF İndir
                                </Button>
                                <Button variant="secondary" className="gap-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15v3H6v-3"/><path d="M3 9h18v6H3z"/><path d="M3 9v6a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9"/><line x1="8" y1="9" x2="8" y2="5"/><line x1="16" y1="9" x2="16" y2="5"/><line x1="12" y1="9" x2="12" y2="5"/></svg>
                                  Yazdır
                                </Button>
                                <Button className="gap-1 bg-[#00A0D2] hover:bg-[#008CB2]">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                                  Paylaş
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto bg-[#e0f0fa] h-12 w-12 rounded-full flex items-center justify-center mb-3">
                    <Award className="h-6 w-6 text-[#00A0D2]" />
                  </div>
                  <p className="text-sm text-muted-foreground">Henüz Turkcell sertifikası kazanmadınız.</p>
                  <Button variant="link" size="sm" asChild className="mt-2 text-[#00A0D2]">
                    <Link href="/dashboard/egitim-katalogu">
                      Eğitimlere Katılın
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
} 