'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format, formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  MoreVertical, Bell, Settings, CheckSquare, 
  Check, AlertTriangle, Info, MessageSquare, AtSign, BookOpen
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { NotificationType } from '@/lib/models/Notification';

// Mock notification data - Production implementation would fetch from API
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  createdAt: Date;
  read: boolean;
}

const getNotificationIcon = (type: NotificationType) => {
  switch(type) {
    case NotificationType.SYSTEM:
      return <Bell className="h-5 w-5 text-blue-500" />;
    case NotificationType.SUCCESS:
      return <CheckSquare className="h-5 w-5 text-green-500" />;
    case NotificationType.WARNING:
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case NotificationType.ERROR:
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case NotificationType.INFO:
      return <Info className="h-5 w-5 text-blue-500" />;
    case NotificationType.TRAINING:
      return <BookOpen className="h-5 w-5 text-purple-500" />;
    case NotificationType.COMMENT:
      return <MessageSquare className="h-5 w-5 text-indigo-500" />;
    case NotificationType.MENTION:
      return <AtSign className="h-5 w-5 text-cyan-500" />;
    case NotificationType.ASSIGNMENT:
      return <CheckSquare className="h-5 w-5 text-emerald-500" />;
    case NotificationType.COMPLETION:
      return <Check className="h-5 w-5 text-green-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: NotificationType.TRAINING,
    title: 'Yeni Eğitim',
    message: 'JavaScript Temelleri eğitimi sizin için hazır',
    link: '/dashboard/trainings/1',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 dakika önce
    read: false
  },
  {
    id: '2',
    type: NotificationType.SYSTEM,
    title: 'Sistem Güncellemesi',
    message: 'Syneris platformu v2.0.1 sürümüne güncellendi',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 saat önce
    read: true
  },
  {
    id: '3',
    type: NotificationType.MENTION,
    title: 'Bahsedilme',
    message: 'Ahmet Yılmaz sizi bir yorumda bahsetti',
    link: '/dashboard/posts/123',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 gün önce
    read: false
  },
  {
    id: '4',
    type: NotificationType.ASSIGNMENT,
    title: 'Yeni Görev',
    message: 'React Temel Kavramlar görevini tamamlamanız gerekiyor',
    link: '/dashboard/assignments/2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 gün önce
    read: false
  },
  {
    id: '5',
    type: NotificationType.COMMENT,
    title: 'Yeni Yorum',
    message: 'Mehmet Kaya gönderinize yorum yaptı',
    link: '/dashboard/posts/456',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 gün önce
    read: true
  },
  {
    id: '6',
    type: NotificationType.SUCCESS,
    title: 'Tebrikler!',
    message: 'HTML Temelleri eğitimini başarıyla tamamladınız',
    link: '/dashboard/trainings/complete/3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 gün önce
    read: true
  },
  {
    id: '7',
    type: NotificationType.WARNING,
    title: 'Görev Hatırlatma',
    message: 'CSS Flexbox görevini tamamlamanız için 2 gün kaldı',
    link: '/dashboard/assignments/5',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 hafta önce
    read: true
  },
  {
    id: '8',
    type: NotificationType.ERROR,
    title: 'Hata Oluştu',
    message: 'Ödev yükleme sırasında bir hata oluştu. Lütfen tekrar deneyin.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 gün önce
    read: true
  },
  {
    id: '9',
    type: NotificationType.INFO,
    title: 'Bilgilendirme',
    message: 'Kariyer gelişim webinarı yarın saat 14:00\'de başlayacak',
    link: '/dashboard/events/12',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 hafta önce
    read: true
  },
  {
    id: '10',
    type: NotificationType.COMPLETION,
    title: 'Hedef Tamamlandı',
    message: 'Aylık öğrenme hedefinizi başarıyla tamamladınız',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 ay önce
    read: true
  }
];

const NotificationsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Fetch notifications from API
  useEffect(() => {
    // Bu fonksiyon gerçek API entegrasyonu tamamlandığında kullanılacak
    const fetchNotifications = async () => {
      try {
        // const response = await fetch('/api/notifications');
        // const data = await response.json();
        // setNotifications(data.notifications);
      } catch (error) {
        console.error('Bildirimler alınamadı:', error);
      }
    };

    if (session?.user) {
      // fetchNotifications();
    }
  }, [session]);
  
  // Filter notifications based on active filter
  const filteredNotifications = notifications.filter(notification => {
    // Read/unread filter
    if (activeFilter === 'unread' && notification.read) return false;
    if (activeFilter === 'read' && !notification.read) return false;
    
    // Type filter
    if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
    
    return true;
  });
  
  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      // In production, this would be an API call
      // await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
      
      setNotifications(prevState => 
        prevState.map(notification => 
          notification.id === id 
            ? { ...notification, read: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Bildirim okundu olarak işaretlenemedi:', error);
    }
  };
  
  // Mark selected notifications as read
  const markSelectedAsRead = async () => {
    try {
      // In production, this would be an API call
      // await fetch('/api/notifications/mark-read', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ ids: selectedNotifications }),
      // });
      
      setNotifications(prevState => 
        prevState.map(notification => 
          selectedNotifications.includes(notification.id) 
            ? { ...notification, read: true } 
            : notification
        )
      );
      
      setSelectedNotifications([]);
      
      toast({
        title: 'Bildirimler okundu',
        description: `${selectedNotifications.length} bildirim okundu olarak işaretlendi.`,
      });
    } catch (error) {
      console.error('Bildirimler okundu olarak işaretlenemedi:', error);
    }
  };
  
  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // In production, this would be an API call
      // await fetch('/api/notifications/mark-all-read', { method: 'POST' });
      
      setNotifications(prevState => 
        prevState.map(notification => ({ ...notification, read: true }))
      );
      
      toast({
        title: 'Tüm bildirimler okundu',
        description: 'Tüm bildirimler okundu olarak işaretlendi.',
      });
    } catch (error) {
      console.error('Tüm bildirimler okundu olarak işaretlenemedi:', error);
    }
  };
  
  // Delete notification
  const deleteNotification = async (id: string) => {
    try {
      // In production, this would be an API call
      // await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
      
      setNotifications(prevState => 
        prevState.filter(notification => notification.id !== id)
      );
      
      toast({
        title: 'Bildirim silindi',
        description: 'Bildirim başarıyla silindi.',
      });
    } catch (error) {
      console.error('Bildirim silinemedi:', error);
    }
  };
  
  // Delete selected notifications
  const deleteSelected = async () => {
    try {
      // In production, this would be an API call
      // await fetch('/api/notifications/delete-multiple', {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ ids: selectedNotifications }),
      // });
      
      setNotifications(prevState => 
        prevState.filter(notification => !selectedNotifications.includes(notification.id))
      );
      
      setSelectedNotifications([]);
      
      toast({
        title: 'Bildirimler silindi',
        description: `${selectedNotifications.length} bildirim başarıyla silindi.`,
      });
    } catch (error) {
      console.error('Bildirimler silinemedi:', error);
    }
  };
  
  // Handle notification click (mark as read and navigate to link if present)
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.link) {
      router.push(notification.link);
    }
  };
  
  // Toggle notification selection
  const toggleSelection = (id: string) => {
    setSelectedNotifications(prevState => 
      prevState.includes(id)
        ? prevState.filter(notificationId => notificationId !== id)
        : [...prevState, id]
    );
  };
  
  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bildirimler</h1>
        <Link href="/dashboard/notifications/settings">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Bildirim Ayarları
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tüm Bildirimler</CardTitle>
              <CardDescription>
                {filteredNotifications.length} bildirim, {notifications.filter(n => !n.read).length} okunmamış
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tür Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Bildirimler</SelectItem>
                  <SelectItem value={NotificationType.SYSTEM}>Sistem</SelectItem>
                  <SelectItem value={NotificationType.TRAINING}>Eğitim</SelectItem>
                  <SelectItem value={NotificationType.ASSIGNMENT}>Görev</SelectItem>
                  <SelectItem value={NotificationType.COMMENT}>Yorum</SelectItem>
                  <SelectItem value={NotificationType.MENTION}>Bahsetme</SelectItem>
                  <SelectItem value={NotificationType.INFO}>Bilgi</SelectItem>
                  <SelectItem value={NotificationType.SUCCESS}>Başarı</SelectItem>
                  <SelectItem value={NotificationType.WARNING}>Uyarı</SelectItem>
                  <SelectItem value={NotificationType.ERROR}>Hata</SelectItem>
                  <SelectItem value={NotificationType.COMPLETION}>Tamamlama</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs 
            defaultValue="all" 
            value={activeFilter}
            onValueChange={(value) => setActiveFilter(value as 'all' | 'unread' | 'read')}
          >
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">Tümü</TabsTrigger>
                <TabsTrigger value="unread">Okunmamış</TabsTrigger>
                <TabsTrigger value="read">Okunmuş</TabsTrigger>
              </TabsList>
              
              {selectedNotifications.length > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {selectedNotifications.length} bildirim seçildi
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={markSelectedAsRead}
                    disabled={selectedNotifications.every(id => 
                      notifications.find(n => n.id === id)?.read
                    )}
                  >
                    Okundu İşaretle
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={deleteSelected}
                  >
                    Seçilenleri Sil
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={markAllAsRead}
                    disabled={!notifications.some(n => !n.read)}
                  >
                    Tümünü Okundu İşaretle
                  </Button>
                </div>
              )}
            </div>
            
            <TabsContent value="all" className="m-0">
              {filteredNotifications.length > 0 ? (
                <div className="rounded-md border">
                  <div className="flex items-center p-4 bg-muted/50">
                    <div className="flex items-center mr-4">
                      <Checkbox
                        checked={
                          filteredNotifications.length > 0 && 
                          selectedNotifications.length === filteredNotifications.length
                        }
                        onCheckedChange={toggleSelectAll}
                      />
                    </div>
                    <div className="flex-1 grid grid-cols-12 gap-4">
                      <div className="col-span-7 font-medium">Bildirim</div>
                      <div className="col-span-3 font-medium">Tarih</div>
                      <div className="col-span-2 font-medium text-right">İşlemler</div>
                    </div>
                  </div>
                  
                  {filteredNotifications.map((notification) => (
                    <div key={notification.id}>
                      <div 
                        className={`flex items-center p-4 hover:bg-muted/30 cursor-pointer ${!notification.read ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
                      >
                        <div className="flex items-center mr-4">
                          <Checkbox
                            checked={selectedNotifications.includes(notification.id)}
                            onCheckedChange={() => toggleSelection(notification.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        
                        <div 
                          className="flex-1 grid grid-cols-12 gap-4"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="col-span-7 flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {notification.title}
                                {!notification.read && (
                                  <Badge className="h-2 w-2 rounded-full p-0 bg-blue-500" />
                                )}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {notification.message}
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-span-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <div title={format(notification.createdAt, 'PPpp', { locale: tr })}>
                              {formatDistanceToNow(notification.createdAt, { 
                                addSuffix: true,
                                locale: tr 
                              })}
                            </div>
                          </div>
                          
                          <div className="col-span-2 flex justify-end items-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Menüyü Aç</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.read && (
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    Okundu İşaretle
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                  Bildirimi Sil
                                </DropdownMenuItem>
                                {notification.link && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push(notification.link!)}>
                                      İçeriğe Git
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Bildirim Bulunamadı</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                    Seçili filtrelerle eşleşen bildirim bulunamadı. Filtreleri değiştirerek daha fazla bildirim görüntüleyebilirsiniz.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="unread" className="m-0">
              {/* All tab'ı ile aynı içerik, ancak filtreleme kriterleri farklı - render optimizasyonu için bileşen ayırılabilir */}
            </TabsContent>
            
            <TabsContent value="read" className="m-0">
              {/* All tab'ı ile aynı içerik, ancak filtreleme kriterleri farklı - render optimizasyonu için bileşen ayırılabilir */}
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Bildirimler 30 gün sonra otomatik olarak silinir.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationsPage; 