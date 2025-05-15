"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, Lock, UserCog, Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const [language, setLanguage] = useState("tr");
  const [timezone, setTimezone] = useState("Europe/Istanbul");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appNotifications, setAppNotifications] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormSubmitting(false);
      toast({
        title: "Profil güncellendi",
        description: "Profil bilgileriniz başarıyla kaydedildi.",
        action: (
          <ToastAction altText="Tamam">Tamam</ToastAction>
        ),
      });
    }, 1500);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormSubmitting(false);
      toast({
        title: "Şifre güncellendi",
        description: "Şifreniz başarıyla değiştirildi.",
        action: (
          <ToastAction altText="Tamam">Tamam</ToastAction>
        ),
      });
    }, 1500);
  };

  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormSubmitting(false);
      toast({
        title: "Bildirim ayarları güncellendi",
        description: "Bildirim tercihleriniz başarıyla kaydedildi.",
        action: (
          <ToastAction altText="Tamam">Tamam</ToastAction>
        ),
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-5xl">
      <div className="flex items-center">
        <Link href="/dashboard/profile">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hesap Ayarları</h1>
          <p className="text-muted-foreground">
            Profil, güvenlik ve bildirim tercihlerinizi yönetin.
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <UserCog className="h-4 w-4" />
            <span>Profil</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Lock className="h-4 w-4" />
            <span>Güvenlik</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" />
            <span>Bildirimler</span>
          </TabsTrigger>
        </TabsList>

        {/* Profil Ayarları */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>
                Kişisel bilgilerinizi güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad</Label>
                    <Input id="name" defaultValue="Ahmet Yılmaz" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input id="email" type="email" defaultValue="ahmet.yilmaz@sirket.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Ünvan</Label>
                    <Input id="title" defaultValue="Kıdemli Yazılım Geliştirici" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departman</Label>
                    <Input id="department" defaultValue="Yazılım Geliştirme" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" defaultValue="+90 555 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Dil Tercihi</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Dil seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tr">Türkçe</SelectItem>
                        <SelectItem value="en">İngilizce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biyografi</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Kendinizi kısaca tanıtın..." 
                    defaultValue="10+ yıllık tecrübeye sahip Kıdemli Yazılım Geliştiriciyim. React, Node.js ve TypeScript konularında uzmanlığım var." 
                    className="min-h-[120px]" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zaman Dilimi</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Zaman dilimi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Istanbul">Türkiye (UTC+03:00)</SelectItem>
                      <SelectItem value="Europe/London">Londra (UTC+00:00)</SelectItem>
                      <SelectItem value="America/New_York">New York (UTC-05:00)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (UTC+09:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={formSubmitting}>
                    {formSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Değişiklikleri Kaydet
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Veri Dışa Aktarma */}
          <Card>
            <CardHeader>
              <CardTitle>Veri Yönetimi</CardTitle>
              <CardDescription>
                Kişisel verilerinize erişim ve silme işlemleri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Verilerimi Dışa Aktar</h4>
                <p className="text-sm text-muted-foreground">
                  Profiliniz, eğitim ilerlemeleriniz ve sertifikalarınız dahil olmak üzere tüm verilerinizi dışa aktarın.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline">
                    JSON Formatında İndir
                  </Button>
                  <Button variant="outline">
                    CSV Formatında İndir
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium text-destructive">Hesabımı Sil</h4>
                <p className="text-sm text-muted-foreground">
                  Hesabınızı ve tüm verilerinizi kalıcı olarak silmek için. Bu işlem geri alınamaz.
                </p>
                <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      Hesabımı Sil
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Hesabı Silmeyi Onayla</DialogTitle>
                      <DialogDescription>
                        Bu işlem geri alınamaz. Tüm verileriniz, eğitim ilerlemeleriniz ve sertifikalarınız kalıcı olarak silinecektir.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="confirm-delete">Onaylamak için "HESABIMI SİL" yazın</Label>
                        <Input id="confirm-delete" />
                      </div>
                      <div className="border rounded-md p-3 bg-destructive/10 text-destructive">
                        <p className="text-sm font-medium">Uyarı</p>
                        <p className="text-xs">
                          Bu işlem şirketinizin eğitim yöneticisine bildirilecektir ve hesabınıza bağlı tüm lisanslar serbest bırakılacaktır.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                        İptal
                      </Button>
                      <Button variant="destructive">
                        Hesabımı Kalıcı Olarak Sil
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Güvenlik Ayarları */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Şifre Değiştir</CardTitle>
              <CardDescription>
                Hesabınızın güvenliği için şifrenizi düzenli olarak değiştirin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mevcut Şifre</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Yeni Şifre</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={formSubmitting}>
                    {formSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                        Güncelleniyor...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Şifreyi Güncelle
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İki Faktörlü Doğrulama</CardTitle>
              <CardDescription>
                Hesabınızı daha güvenli hale getirmek için iki faktörlü doğrulamayı etkinleştirin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">İki Faktörlü Doğrulama</h4>
                  <p className="text-sm text-muted-foreground">
                    Giriş yaparken SMS veya Authenticator uygulaması ile ek doğrulama gerektirir
                  </p>
                </div>
                <Switch id="2fa" />
              </div>
              <Separator className="my-4" />
              <div className="flex justify-end">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  İki Faktörlü Doğrulama Ekle
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bildirim Ayarları */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Tercihleri</CardTitle>
              <CardDescription>
                Nasıl ve ne zaman bildirim almak istediğinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationUpdate} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">E-posta Bildirimleri</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-system">Sistem Bildirimleri</Label>
                        <p className="text-sm text-muted-foreground">Hesap güvenliği, şifre sıfırlama vb.</p>
                      </div>
                      <Switch 
                        id="email-system" 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-learning">Eğitim Bildirimleri</Label>
                        <p className="text-sm text-muted-foreground">Yeni eğitimler, sertifikalar ve ilerlemeler</p>
                      </div>
                      <Switch id="email-learning" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-marketing">Pazarlama ve Duyurular</Label>
                        <p className="text-sm text-muted-foreground">Özel teklifler, etkinlikler ve yeni özellikler</p>
                      </div>
                      <Switch id="email-marketing" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Bildirimleri</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-system">Sistem Bildirimleri</Label>
                        <p className="text-sm text-muted-foreground">Hesap güvenliği, doğrulama kodları vb.</p>
                      </div>
                      <Switch 
                        id="sms-system" 
                        checked={smsNotifications} 
                        onCheckedChange={setSmsNotifications} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-reminders">Hatırlatmalar</Label>
                        <p className="text-sm text-muted-foreground">Yaklaşan etkinlikler, son teslim tarihleri</p>
                      </div>
                      <Switch id="sms-reminders" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Uygulama Bildirimleri</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-all">Tüm Bildirimler</Label>
                        <p className="text-sm text-muted-foreground">Tüm bildirim türlerini etkinleştirin veya devre dışı bırakın</p>
                      </div>
                      <Switch 
                        id="app-all" 
                        checked={appNotifications} 
                        onCheckedChange={setAppNotifications} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-learning">Eğitim Bildirimleri</Label>
                        <p className="text-sm text-muted-foreground">Yeni içerik, öneriler ve hatırlatmalar</p>
                      </div>
                      <Switch id="app-learning" defaultChecked disabled={!appNotifications} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-social">Sosyal Etkileşimler</Label>
                        <p className="text-sm text-muted-foreground">Yorumlar, beğeniler ve mesajlar</p>
                      </div>
                      <Switch id="app-social" defaultChecked disabled={!appNotifications} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={formSubmitting}>
                    {formSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Değişiklikleri Kaydet
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 