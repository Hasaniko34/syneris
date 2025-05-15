"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Briefcase,
  Save,
  ArrowLeft,
  Trash2,
  Plus,
  X,
  Upload,
  Edit,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

export default function ProfileEditPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Geçici kullanıcı bilgileri - gerçek uygulamada veritabanından alınacak
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    avatar: "/images/avatars/default.png",
    company: "",
    department: "",
    phone: "",
    location: "",
    joinDate: "",
    bio: "",
    skills: [] as { id: number; name: string; level: number }[],
    education: [] as { id: number; degree: string; school: string; year: string }[],
    notificationPreferences: {
      email: true,
      push: true,
      sms: false,
      courseUpdates: true,
      marketingEmails: false
    }
  });

  // Yetenek ekleme ve düzenleme için yeni durum değişkenleri
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: 50 });
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);

  // Yetenek seviyesi açıklamaları
  const skillLevelDescriptions = {
    25: "Başlangıç",
    50: "Orta Seviye",
    75: "İleri Seviye",
    100: "Uzman"
  };

  // Yetenek seviye renk kodları
  const getSkillLevelColor = (level: number) => {
    if (level < 25) return "bg-slate-400";
    if (level < 50) return "bg-blue-500";
    if (level < 75) return "bg-green-500";
    return "bg-indigo-600";
  };

  // Eğitim ekleme ve düzenleme için yeni durum değişkenleri
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [newEducation, setNewEducation] = useState({ degree: "", school: "", year: "" });
  const [editingEducationId, setEditingEducationId] = useState<number | null>(null);

  // Şifre değiştirme state'leri
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Sayfa yüklendiğinde kullanıcı verilerini getir
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        const userData = response.data.user;
        
        setUser({
          id: userData.id || "",
          name: userData.name || "",
          email: userData.email || "",
          role: userData.role || "",
          avatar: userData.image || "/images/avatars/default.png",
          company: userData.company || "",
          department: userData.department || "",
          phone: userData.phone || "",
          location: userData.location || "",
          joinDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('tr-TR') : "",
          bio: userData.bio || "",
          skills: userData.skills || [],
          education: userData.education || [],
          notificationPreferences: userData.notificationPreferences || {
            email: true,
            push: true,
            sms: false,
            courseUpdates: true,
            marketingEmails: false
          }
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Kullanıcı bilgileri alınamadı:", error);
        toast({
          title: "Hata",
          description: "Kullanıcı bilgileri alınamadı. Lütfen tekrar deneyin.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Kişisel bilgileri güncelleme işleyicisi
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Yetenek düzenleme formu başlatıcı
  const startEditingSkill = (skill: { id: number; name: string; level: number }) => {
    setNewSkill({ name: skill.name, level: skill.level });
    setEditingSkillId(skill.id);
    setShowSkillForm(true);
  };

  // Eğitim düzenleme formu başlatıcı
  const startEditingEducation = (education: { id: number; degree: string; school: string; year: string }) => {
    setNewEducation({
      degree: education.degree,
      school: education.school,
      year: education.year,
    });
    setEditingEducationId(education.id);
    setShowEducationForm(true);
  };

  // Yetenek ekleme/güncelleme işleyicisi
  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSkillId) {
      // Mevcut yeteneği güncelle
      setUser((prev) => ({
        ...prev,
        skills: prev.skills.map((skill) =>
          skill.id === editingSkillId
            ? { ...skill, name: newSkill.name, level: newSkill.level }
            : skill
        ),
      }));
    } else {
      // Yeni yetenek ekle
      const newId = Math.max(0, ...user.skills.map((s) => s.id)) + 1;
      setUser((prev) => ({
        ...prev,
        skills: [...prev.skills, { id: newId, ...newSkill }],
      }));
    }
    
    // Formu sıfırla
    setNewSkill({ name: "", level: 50 });
    setEditingSkillId(null);
    setShowSkillForm(false);
  };

  // Eğitim ekleme/güncelleme işleyicisi
  const handleEducationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEducationId) {
      // Mevcut eğitimi güncelle
      setUser((prev) => ({
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === editingEducationId
            ? { ...edu, ...newEducation }
            : edu
        ),
      }));
    } else {
      // Yeni eğitim ekle
      const newId = Math.max(0, ...user.education.map((e) => e.id)) + 1;
      setUser((prev) => ({
        ...prev,
        education: [...prev.education, { id: newId, ...newEducation }],
      }));
    }
    
    // Formu sıfırla
    setNewEducation({ degree: "", school: "", year: "" });
    setEditingEducationId(null);
    setShowEducationForm(false);
  };

  // Yetenek silme işleyicisi
  const handleDeleteSkill = (id: number) => {
    setUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  // Eğitim silme işleyicisi
  const handleDeleteEducation = (id: number) => {
    setUser((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Şifre değiştirme form değişikliği
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  // Şifre değiştirme submit
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Hata",
        description: "Yeni şifre ve şifre tekrarı eşleşmiyor",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Hata",
        description: "Yeni şifre en az 8 karakter olmalıdır",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSaving(true);
      const response = await axios.post('/api/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      toast({
        title: "Başarılı",
        description: "Şifreniz başarıyla güncellendi"
      });
      
      // Form alanlarını temizle
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.response?.data?.error || "Şifre değiştirilirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Bildirim tercihlerini güncelleme
  const handleNotificationChange = (field: string, value: boolean) => {
    setUser(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [field]: value
      }
    }));
  };

  // Avatar yükleme işlemi
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    
    const file = event.target.files[0];
    
    // Dosya tipini kontrol et
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast({
        title: "Hata",
        description: "Sadece JPEG, PNG ve WEBP dosyaları yüklenebilir",
        variant: "destructive"
      });
      return;
    }
    
    // Dosya boyutunu kontrol et (1MB)
    if (file.size > 1048576) {
      toast({
        title: "Hata",
        description: "Dosya boyutu 1MB'tan küçük olmalıdır",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await axios.post('/api/users/upload-avatar', formData);
      
      // Avatar URL'sini state'e kaydet
      setUser(prev => ({
        ...prev,
        avatar: response.data.avatarUrl
      }));
      
      toast({
        title: "Başarılı",
        description: "Profil fotoğrafı başarıyla güncellendi"
      });
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.response?.data?.error || "Profil fotoğrafı yüklenirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Tüm profili kaydetme işleyicisi
  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      
      // Kullanıcı verilerini hazırla
      const userData = {
        name: user.name,
        phone: user.phone,
        department: user.department,
        location: user.location,
        bio: user.bio,
        skills: user.skills,
        education: user.education,
        notificationPreferences: user.notificationPreferences
      };
      
      // API isteği gönder
      const response = await axios.put('/api/users/update-profile', userData);
      
      if (response.data.success) {
        toast({
          title: "Profil güncellendi",
          description: "Profiliniz başarıyla güncellendi.",
          variant: "default",
        });
        
        // Başarılı sonuç sonrası profil sayfasına yönlendir
        setTimeout(() => {
          router.push('/dashboard/profile');
        }, 1500);
      } else {
        throw new Error(response.data.error || "Profil güncellenemedi");
      }
    } catch (error: any) {
      console.error("Profil güncelleme hatası:", error);
      toast({
        title: "Hata",
        description: error.message || "Profiliniz güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Yetenek düzeyini metin olarak göster
  const getSkillLevelText = (level: number) => {
    if (level <= 25) return "Başlangıç";
    if (level <= 50) return "Orta Seviye";
    if (level <= 75) return "İleri Seviye";
    return "Uzman";
  };

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/profile">
              <ArrowLeft size={16} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Profili Düzenle</h1>
        </div>
        <Button 
          onClick={handleSaveProfile} 
          disabled={isSaving}
          className="gap-2"
        >
          <Save size={16} />
          {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </Button>
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sol Sütun - Kişisel Bilgiler */}
        <div className="space-y-6 md:col-span-1">
          {/* Profil Resmi */}
          <Card>
            <CardHeader>
              <CardTitle>Profil Fotoğrafı</CardTitle>
              <CardDescription>
                Profil fotoğrafınızı güncelleyin veya değiştirin.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <div className="relative">
                <Avatar className="h-36 w-36 border-4 border-muted ring-2 ring-primary/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-5xl bg-primary text-primary-foreground">
                    {user.name.split(' ').map(name => name[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isUploading && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 w-full">
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  disabled={isUploading}
                >
                  <Upload size={16} />
                  Yeni Fotoğraf Yükle
                </Button>
                <Input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/jpeg, image/png, image/webp" 
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
                <p className="text-xs text-muted-foreground text-center">
                  Max 1MB - JPEG, PNG veya WEBP
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hesap Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle>Hesap Bilgileri</CardTitle>
              <CardDescription>
                Hesabınızla ilgili temel bilgilerinizi düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-1.5">
                <Label htmlFor="email">E-posta</Label>
                <div className="flex items-center gap-2 h-10 px-3 py-2 border rounded-md bg-muted">
                  <Mail size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  E-posta adresiniz değiştirilemez. Destek ekibiyle iletişime geçin.
                </p>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="join-date">Katılım Tarihi</Label>
                <div className="flex items-center gap-2 h-10 px-3 py-2 border rounded-md bg-muted">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{user.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Sütun - Profil Detayları */}
        <div className="space-y-6 md:col-span-2">
          {/* Kişisel Bilgiler */}
          <Card id="personal-info">
            <CardHeader>
              <CardTitle>Kişisel Bilgiler</CardTitle>
              <CardDescription>
                Profilinizde görünen bilgilerinizi güncelleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Ad Soyad</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ad Soyad"
                      value={user.name}
                      onChange={handlePersonalInfoChange}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="phone">Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Telefon"
                      value={user.phone}
                      onChange={handlePersonalInfoChange}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="role">Pozisyon</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="role"
                      name="role"
                      placeholder="Pozisyon"
                      value={user.role}
                      onChange={handlePersonalInfoChange}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="location">Konum</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="Konum"
                      value={user.location}
                      onChange={handlePersonalInfoChange}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="company">Şirket</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      name="company"
                      placeholder="Şirket"
                      value={user.company}
                      onChange={handlePersonalInfoChange}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="department">Departman</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="department"
                      name="department"
                      placeholder="Departman"
                      value={user.department}
                      onChange={handlePersonalInfoChange}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-1.5" id="bio">
                <Label htmlFor="bio">Hakkında</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Kendiniz hakkında kısa bir bilgi..."
                  value={user.bio}
                  onChange={handlePersonalInfoChange}
                  className="min-h-32"
                />
              </div>
            </CardContent>
          </Card>

          {/* Yetenekler */}
          <Card id="skills">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Yetenekler</CardTitle>
                <CardDescription>
                  Sahip olduğunuz yetenekleri ve uzmanlık seviyelerinizi ekleyin.
                </CardDescription>
              </div>
              {!showSkillForm && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => setShowSkillForm(true)}
                >
                  <Plus size={14} />
                  Yetenek Ekle
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {showSkillForm && (
                <form onSubmit={handleSkillSubmit} className="border rounded-lg p-4 mb-4 bg-muted/30">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <Label htmlFor="skill-name" className="mb-1.5 block">
                        Yetenek Adı
                      </Label>
                      <Input
                        id="skill-name"
                        placeholder="Örn: JavaScript, Python, UI Tasarım..."
                        value={newSkill.name}
                        onChange={(e) =>
                          setNewSkill({ ...newSkill, name: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="skill-level" className="mb-1.5 block">
                        Seviye: {newSkill.level}%
                      </Label>
                      <Input
                        id="skill-level"
                        type="range"
                        min="0"
                        max="100"
                        value={newSkill.level}
                        onChange={(e) =>
                          setNewSkill({
                            ...newSkill,
                            level: parseInt(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowSkillForm(false);
                        setEditingSkillId(null);
                        setNewSkill({ name: "", level: 50 });
                      }}
                    >
                      İptal
                    </Button>
                    <Button
                      type="submit"
                      disabled={!newSkill.name}
                    >
                      {editingSkillId ? "Güncelle" : "Ekle"}
                    </Button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {user.skills.length === 0 ? (
                  <div className="text-center p-4 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      Henüz bir yetenek eklenmemiş.
                    </p>
                  </div>
                ) : (
                  user.skills.map((skill, index) => (
                    <div key={index} className="space-y-1.5 relative group">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}% - {getSkillLevelText(skill.level)}</span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.level} className={`h-2 ${getSkillLevelColor(skill.level)}`} />
                        <div className="absolute inset-0 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => startEditingSkill(skill)}
                            >
                              <Edit size={12} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive"
                              onClick={() => handleDeleteSkill(skill.id)}
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Eğitim Bilgileri */}
          <Card id="education">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Eğitim Bilgileri</CardTitle>
                <CardDescription>
                  Eğitim geçmişinizi ekleyin veya düzenleyin.
                </CardDescription>
              </div>
              {!showEducationForm && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => setShowEducationForm(true)}
                >
                  <Plus size={14} />
                  Eğitim Ekle
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {showEducationForm && (
                <form onSubmit={handleEducationSubmit} className="border rounded-lg p-4 mb-4 bg-muted/30">
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <Label htmlFor="education-degree" className="mb-1.5 block">
                        Derece / Program
                      </Label>
                      <Input
                        id="education-degree"
                        placeholder="Örn: Bilgisayar Mühendisliği, Lisans"
                        value={newEducation.degree}
                        onChange={(e) =>
                          setNewEducation({
                            ...newEducation,
                            degree: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="education-school" className="mb-1.5 block">
                        Okul / Üniversite
                      </Label>
                      <Input
                        id="education-school"
                        placeholder="Örn: İstanbul Teknik Üniversitesi"
                        value={newEducation.school}
                        onChange={(e) =>
                          setNewEducation({
                            ...newEducation,
                            school: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="education-year" className="mb-1.5 block">
                        Yıl Aralığı
                      </Label>
                      <Input
                        id="education-year"
                        placeholder="Örn: 2015-2019"
                        value={newEducation.year}
                        onChange={(e) =>
                          setNewEducation({
                            ...newEducation,
                            year: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowEducationForm(false);
                        setEditingEducationId(null);
                        setNewEducation({ degree: "", school: "", year: "" });
                      }}
                    >
                      İptal
                    </Button>
                    <Button
                      type="submit"
                      disabled={!newEducation.degree || !newEducation.school}
                    >
                      {editingEducationId ? "Güncelle" : "Ekle"}
                    </Button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {user.education.length === 0 ? (
                  <div className="text-center p-4 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      Henüz bir eğitim bilgisi eklenmemiş.
                    </p>
                  </div>
                ) : (
                  user.education.map((education) => (
                    <div key={education.id} className="border rounded-lg p-4 bg-card">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-medium">{education.degree}</h4>
                          <p className="text-sm text-muted-foreground">
                            {education.school} • {education.year}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => startEditingEducation(education)}
                          >
                            Düzenle
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-destructive"
                            onClick={() => handleDeleteEducation(education.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Şifre Değiştirme */}
          <Card>
            <CardHeader>
              <CardTitle>Şifre Değiştir</CardTitle>
              <CardDescription>
                Güvenlik için şifrenizi düzenli olarak değiştirmenizi öneririz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                  <Input 
                    id="currentPassword" 
                    name="currentPassword"
                    type="password" 
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="newPassword">Yeni Şifre</Label>
                  <Input 
                    id="newPassword" 
                    name="newPassword"
                    type="password" 
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    En az 8 karakter olmalıdır
                  </p>
                </div>
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type="password" 
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Bildirim Tercihleri */}
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Tercihleri</CardTitle>
              <CardDescription>
                Hangi bildirimler almak istediğinizi belirleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">E-posta Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">
                      Önemli güncellemeler ve bildirimler için e-posta alın
                    </p>
                  </div>
                  <Switch
                    checked={user.notificationPreferences.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">
                      Anlık bildirimler ve güncellemeler için
                    </p>
                  </div>
                  <Switch
                    checked={user.notificationPreferences.push}
                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">
                      Önemli bildirimler için SMS alın
                    </p>
                  </div>
                  <Switch
                    checked={user.notificationPreferences.sms}
                    onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Kurs Güncellemeleri</Label>
                    <p className="text-sm text-muted-foreground">
                      Kurslarınızla ilgili güncellemeler ve yeni içerikler hakkında
                    </p>
                  </div>
                  <Switch
                    checked={user.notificationPreferences.courseUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('courseUpdates', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Pazarlama E-postaları</Label>
                    <p className="text-sm text-muted-foreground">
                      Yeni özellikler, kampanyalar ve öneriler hakkında
                    </p>
                  </div>
                  <Switch
                    checked={user.notificationPreferences.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Alt Kısım - Kaydet Butonu */}
      <motion.div
        variants={itemVariants}
        className="flex justify-end gap-2 sticky bottom-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg border shadow-sm"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/profile">İptal</Link>
        </Button>
        <Button 
          onClick={handleSaveProfile} 
          disabled={isSaving}
          className="gap-2"
        >
          <Save size={16} />
          {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </Button>
      </motion.div>
    </motion.div>
  );
} 