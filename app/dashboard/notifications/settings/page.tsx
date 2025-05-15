'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { NotificationType } from '@/lib/models/Notification';
import DashboardLayout from '@/app/dashboard/layout';

// Mock data - Production implementation would require a backend API
interface NotificationSetting {
  type: string; 
  name: string;
  description: string;
  email: boolean;
  push: boolean;
  inApp: boolean;
}

const NotificationSettingsPage = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  
  // Notification settings state
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      type: NotificationType.TRAINING,
      name: 'Eğitim Bildirimleri',
      description: 'Yeni eğitimler, tamamlanan eğitimler, hatırlatıcılar vb.',
      email: true,
      push: true,
      inApp: true,
    },
    {
      type: NotificationType.ASSIGNMENT,
      name: 'Görev Bildirimleri',
      description: 'Size atanan görevler, görev değişiklikleri ve hatırlatıcılar',
      email: true,
      push: true,
      inApp: true,
    },
    {
      type: NotificationType.COMMENT,
      name: 'Yorum Bildirimleri',
      description: 'Gönderilerinize ve yorumlarınıza yapılan yorumlar',
      email: false,
      push: true,
      inApp: true,
    },
    {
      type: NotificationType.MENTION,
      name: '@Bahsetme Bildirimleri',
      description: 'Birisi sizi bir gönderide veya yorumda bahsettiğinde',
      email: true,
      push: true,
      inApp: true,
    },
    {
      type: NotificationType.SYSTEM,
      name: 'Sistem Bildirimleri',
      description: 'Sistem güncellemeleri, bakım bildirimleri ve önemli duyurular',
      email: true,
      push: false,
      inApp: true,
    },
  ]);

  // Fetch user notification settings from API
  useEffect(() => {
    // Bu fonksiyon gerçek API entegrasyonu tamamlandığında kullanılacak
    const fetchSettings = async () => {
      try {
        // const response = await fetch('/api/notifications/settings');
        // const data = await response.json();
        // setSettings(data.settings);
      } catch (error) {
        console.error('Bildirim ayarları alınamadı:', error);
      }
    };

    if (session?.user) {
      // fetchSettings();
    }
  }, [session]);

  // Toggle notification preference
  const toggleSetting = (index: number, channel: 'email' | 'push' | 'inApp') => {
    const updatedSettings = [...settings];
    updatedSettings[index][channel] = !updatedSettings[index][channel];
    setSettings(updatedSettings);
  };

  // Save notification settings
  const saveSettings = async () => {
    try {
      // Gerçek uygulamada burada API çağrısı yapılacak
      // await fetch('/api/notifications/settings', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ settings }),
      // });

      toast({
        title: 'Ayarlar güncellendi',
        description: 'Bildirim tercihleriniz başarıyla kaydedildi.',
        variant: 'success',
      });
    } catch (error) {
      console.error('Ayarlar kaydedilemedi:', error);
      toast({
        title: 'Hata oluştu',
        description: 'Bildirim tercihleriniz kaydedilemedi. Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bildirim Ayarları</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Bildirim Tercihleri</CardTitle>
          <CardDescription>
            Hangi bildirimleri nasıl almak istediğinizi yönetin.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Tüm Bildirimler</TabsTrigger>
              <TabsTrigger value="email">E-posta</TabsTrigger>
              <TabsTrigger value="push">Push</TabsTrigger>
              <TabsTrigger value="inApp">Uygulama İçi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-6">
                {settings.map((setting, index) => (
                  <div key={index} className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{setting.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`email-${index}`} className="mr-2">E-posta</Label>
                        <Switch
                          id={`email-${index}`}
                          checked={setting.email}
                          onCheckedChange={() => toggleSetting(index, 'email')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`push-${index}`} className="mr-2">Push</Label>
                        <Switch
                          id={`push-${index}`}
                          checked={setting.push}
                          onCheckedChange={() => toggleSetting(index, 'push')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`inApp-${index}`} className="mr-2">Uygulama İçi</Label>
                        <Switch
                          id={`inApp-${index}`}
                          checked={setting.inApp}
                          onCheckedChange={() => toggleSetting(index, 'inApp')}
                        />
                      </div>
                    </div>
                    
                    {index < settings.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="email">
              <div className="space-y-6">
                {settings.map((setting, index) => (
                  <div key={index} className="flex justify-between items-center pb-4">
                    <div>
                      <h3 className="font-medium">{setting.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      id={`email-tab-${index}`}
                      checked={setting.email}
                      onCheckedChange={() => toggleSetting(index, 'email')}
                    />
                    {index < settings.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="push">
              <div className="space-y-6">
                {settings.map((setting, index) => (
                  <div key={index} className="flex justify-between items-center pb-4">
                    <div>
                      <h3 className="font-medium">{setting.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      id={`push-tab-${index}`}
                      checked={setting.push}
                      onCheckedChange={() => toggleSetting(index, 'push')}
                    />
                    {index < settings.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inApp">
              <div className="space-y-6">
                {settings.map((setting, index) => (
                  <div key={index} className="flex justify-between items-center pb-4">
                    <div>
                      <h3 className="font-medium">{setting.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      id={`inApp-tab-${index}`}
                      checked={setting.inApp}
                      onCheckedChange={() => toggleSetting(index, 'inApp')}
                    />
                    {index < settings.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button onClick={saveSettings}>Ayarları Kaydet</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Genel Bildirim Ayarları</CardTitle>
          <CardDescription>
            Bildirim davranışını ve diğer tercihlerinizi yönetin.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="digest" className="font-medium">Günlük Özet E-postaları</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Günlük bildirim özeti almak için etkinleştirin.
                </p>
              </div>
              <Switch id="digest" defaultChecked={true} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dnd" className="font-medium">Rahatsız Etmeyin Modu</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Aktif olduğunda push ve uygulama içi bildirimler engellenecektir.
                </p>
              </div>
              <Switch id="dnd" defaultChecked={false} />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline">Tüm Bildirimleri Sıfırla</Button>
          <Button onClick={saveSettings}>Ayarları Kaydet</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationSettingsPage; 