"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  BookOpen, 
  Plus,
  Globe,
  X,
  CalendarDays,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewType, setViewType] = useState<"month" | "week" | "day">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showNewEventDialog, setShowNewEventDialog] = useState(false);
  
  // Form state for creating new event
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "10:00",
    duration: "60",
    type: "meeting",
    description: "",
    attendees: ""
  });

  // Etkinlik verileri (gerçek uygulamada API'dan gelecek)
  const events = [
    { 
      id: 1, 
      title: "Haftalık Ekip Değerlendirmesi", 
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 15, 15, 0),
      duration: 60, // dakika cinsinden
      type: "meeting", 
      attendees: ["Ahmet Yılmaz", "Ayşe Demir", "Mehmet Kaya", "Zeynep Çelik"]
    },
    { 
      id: 2, 
      title: "React Gelişmiş Kurs Başlangıcı", 
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 12, 10, 0),
      duration: 120,
      type: "course",
      instructor: "Can Öztürk"
    },
    { 
      id: 3, 
      title: "Yeni Özellikler Demo", 
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 18, 13, 30),
      duration: 90,
      type: "webinar",
      presenter: "Murat Aydın"
    },
    { 
      id: 4, 
      title: "Proje Değerlendirme", 
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 22, 14, 0),
      duration: 45,
      type: "meeting",
      attendees: ["Ahmet Yılmaz", "Burak Kaya", "Deniz Şahin"]
    },
    { 
      id: 5, 
      title: "TypeScript Workshop", 
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 25, 9, 0),
      duration: 180,
      type: "course",
      instructor: "Sevgi Yıldız"
    }
  ];

  // Ay adlarını Türkçe olarak al
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  // Gün adlarını Türkçe olarak al
  const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  // Ayın ilk gününü ve son gününü bul
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  
  // Takvim için gün sayısını belirle
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Ayın ilk gününün haftanın hangi günü olduğunu belirle (0: Pazar, 1: Pazartesi, ..., 6: Cumartesi)
  // Türkiye'de hafta başlangıcı Pazartesi olduğu için 0 -> 6, 1 -> 0, 2 -> 1, ..., 6 -> 5 şeklinde dönüştürüyoruz
  const firstDayOfWeek = (firstDayOfMonth.getDay() || 7) - 1;
  
  // Takvim satır ve sütunlarını oluştur
  const calendarRows = [];
  let calendarDays = [];
  
  // Önceki aydan kalan günleri ekle
  for (let i = 0; i < firstDayOfWeek; i++) {
    const prevMonthDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0 - (firstDayOfWeek - i - 1));
    calendarDays.push({
      date: prevMonthDay,
      isCurrentMonth: false,
      events: []
    });
  }
  
  // Bu ayın günlerini ekle
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
    
    // Bu günde olan etkinlikleri bul
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === i && 
             eventDate.getMonth() === currentMonth.getMonth() && 
             eventDate.getFullYear() === currentMonth.getFullYear();
    });
    
    calendarDays.push({
      date,
      isCurrentMonth: true,
      events: dayEvents
    });
    
    // 7 günde bir satır oluştur
    if ((firstDayOfWeek + i) % 7 === 0 || i === daysInMonth) {
      calendarRows.push([...calendarDays]);
      calendarDays = [];
    }
  }
  
  // Son satırı tamamlamak için sonraki aydan günler ekle
  if (calendarDays.length > 0) {
    const daysNeeded = 7 - calendarDays.length;
    for (let i = 1; i <= daysNeeded; i++) {
      const nextMonthDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i);
      calendarDays.push({
        date: nextMonthDay,
        isCurrentMonth: false,
        events: []
      });
    }
    calendarRows.push([...calendarDays]);
  }

  // Önceki aya git
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Sonraki aya git
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Bugüne git
  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  // Görünümü değiştir
  const changeViewType = (view: "month" | "week" | "day") => {
    setViewType(view);
  };

  // Etkinlik türüne göre renk ve ikon belirle
  const getEventStyle = (type: string) => {
    switch (type) {
      case "meeting":
        return { 
          bgColor: "bg-blue-100 dark:bg-blue-900/30", 
          textColor: "text-blue-700 dark:text-blue-300",
          icon: <Users className="h-3 w-3" />
        };
      case "course":
        return { 
          bgColor: "bg-orange-100 dark:bg-orange-900/30", 
          textColor: "text-orange-700 dark:text-orange-300",
          icon: <BookOpen className="h-3 w-3" />
        };
      case "webinar":
        return { 
          bgColor: "bg-purple-100 dark:bg-purple-900/30", 
          textColor: "text-purple-700 dark:text-purple-300",
          icon: <Globe className="h-3 w-3" />
        };
      default:
        return { 
          bgColor: "bg-gray-100 dark:bg-gray-800", 
          textColor: "text-gray-700 dark:text-gray-300",
          icon: <CalendarIcon className="h-3 w-3" />
        };
    }
  };

  // Tarihi formatla
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  // Bugünün tarihi
  const today = new Date();
  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Haftalık görünüm için gerekli hesaplamalar
  const getWeekDays = () => {
    const weekDays = [];
    const startOfWeek = new Date(currentMonth);
    const day = startOfWeek.getDay() || 7; // Pazar günü için 0 değerini 7'ye çeviriyoruz
    startOfWeek.setDate(startOfWeek.getDate() - (day - 1)); // Haftanın başlangıcı (Pazartesi)
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      // Bu günde olan etkinlikleri bul
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === date.getDate() && 
               eventDate.getMonth() === date.getMonth() && 
               eventDate.getFullYear() === date.getFullYear();
      });
      
      weekDays.push({
        date,
        events: dayEvents
      });
    }
    
    return weekDays;
  };

  // Günlük görünüm için saat dilimleri
  const getHourSlots = () => {
    const hourSlots = [];
    for (let i = 8; i < 20; i++) { // 08:00 - 19:00 arası
      hourSlots.push({
        hour: i,
        label: `${i}:00`
      });
    }
    return hourSlots;
  };

  // Günün etkinliklerini getir
  const getDayEvents = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Etkinlik detaylarını göster
  const showEventDetails = (event: any) => {
    setSelectedEvent(event);
    setShowDetailDialog(true);
  };

  // Yeni etkinlik oluştur
  const createNewEvent = () => {
    // Gerçek uygulamada bir API'ye gönderilir
    console.log("Yeni etkinlik oluşturuldu:", newEvent);
    setShowNewEventDialog(false);
    
    // Form state'ini sıfırla
    setNewEvent({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "10:00",
      duration: "60",
      type: "meeting",
      description: "",
      attendees: ""
    });
    
    // Başarılı olduğunu kullanıcıya bildir
    alert("Etkinlik başarıyla oluşturuldu!");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Etkinlik Takvimi</h1>
          <p className="text-muted-foreground">
            Günlük, haftalık ve aylık etkinliklerinizi takip edin
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToPreviousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            onClick={goToToday}
          >
            Bugün
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {viewType === "month" && `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
            {viewType === "week" && `${format(getWeekDays()[0].date, "d MMM", { locale: tr })} - ${format(getWeekDays()[6].date, "d MMM yyyy", { locale: tr })}`}
            {viewType === "day" && format(currentMonth, "d MMMM yyyy", { locale: tr })}
          </h2>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={viewType} onValueChange={(value) => changeViewType(value as any)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Görünüm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Aylık</SelectItem>
              <SelectItem value="week">Haftalık</SelectItem>
              <SelectItem value="day">Günlük</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowNewEventDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Etkinlik
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Aylık Görünüm */}
          {viewType === "month" && (
            <>
              <div className="grid grid-cols-7 divide-x divide-y border-b">
                {dayNames.map((day, index) => (
                  <div 
                    key={index} 
                    className="py-2 text-center font-medium text-sm"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="divide-y">
                {calendarRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-7 divide-x min-h-[100px] lg:min-h-[120px]">
                    {row.map((day, colIndex) => (
                      <div 
                        key={colIndex} 
                        className={`p-1 ${!day.isCurrentMonth ? 'bg-muted/30 text-muted-foreground' : ''} 
                        ${isToday(day.date) ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm font-medium ${isToday(day.date) ? 'text-primary' : ''}`}>
                            {day.date.getDate()}
                          </span>
                          {isToday(day.date) && (
                            <Badge variant="outline" className="text-[10px] h-4 border-primary text-primary">Bugün</Badge>
                          )}
                        </div>
                        <div className="space-y-1 overflow-y-auto max-h-[80px]">
                          {day.events.map((event) => {
                            const { bgColor, textColor, icon } = getEventStyle(event.type);
                            return (
                              <div 
                                key={event.id}
                                className={`${bgColor} ${textColor} text-xs p-1 rounded flex items-center gap-1 truncate cursor-pointer hover:opacity-80 transition-opacity`}
                                title={event.title}
                                onClick={() => showEventDetails(event)}
                              >
                                {icon}
                                <span className="truncate">{formatTime(event.date)} {event.title}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Haftalık Görünüm */}
          {viewType === "week" && (
            <>
              <div className="grid grid-cols-7 divide-x divide-y border-b">
                {getWeekDays().map((day, index) => (
                  <div 
                    key={index} 
                    className={`py-2 text-center ${isToday(day.date) ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                  >
                    <div className="font-medium">{dayNames[index]}</div>
                    <div className={`text-sm ${isToday(day.date) ? 'text-primary font-bold' : ''}`}>
                      {format(day.date, "d MMM", { locale: tr })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 divide-x min-h-[500px]">
                {getWeekDays().map((day, index) => (
                  <div 
                    key={index} 
                    className={`p-2 ${isToday(day.date) ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                  >
                    <div className="space-y-2">
                      {day.events.map((event) => {
                        const { bgColor, textColor, icon } = getEventStyle(event.type);
                        return (
                          <div 
                            key={event.id}
                            className={`${bgColor} ${textColor} p-2 rounded flex flex-col gap-1 cursor-pointer hover:opacity-80 transition-opacity shadow-sm`}
                            onClick={() => showEventDetails(event)}
                          >
                            <div className="flex items-center gap-1">
                              {icon}
                              <span className="font-medium">{formatTime(event.date)}</span>
                            </div>
                            <div className="text-sm font-medium">{event.title}</div>
                            <div className="text-xs">
                              {event.duration} dakika
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Günlük Görünüm */}
          {viewType === "day" && (
            <div className="p-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold">{format(currentMonth, "d MMMM yyyy, EEEE", { locale: tr })}</h3>
              </div>
              <div className="space-y-4">
                {getDayEvents(currentMonth).length > 0 ? (
                  getDayEvents(currentMonth).map((event) => {
                    const { bgColor, textColor, icon } = getEventStyle(event.type);
                    return (
                      <div 
                        key={event.id}
                        className={`${bgColor} p-3 rounded-lg shadow-sm cursor-pointer hover:opacity-90`}
                        onClick={() => showEventDetails(event)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-full">
                              {icon}
                            </div>
                            <h4 className="font-medium">{event.title}</h4>
                          </div>
                          <div className="text-sm">
                            {formatTime(event.date)} - {formatTime(new Date(event.date.getTime() + event.duration * 60000))}
                          </div>
                        </div>
                        
                        {event.type === "meeting" && event.attendees && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {event.attendees.map((attendee: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {attendee}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {event.type === "course" && event.instructor && (
                          <div className="mt-2 text-sm">
                            <span className="text-muted-foreground">Eğitmen: </span>
                            <span className="font-medium">{event.instructor}</span>
                          </div>
                        )}
                        
                        {event.type === "webinar" && event.presenter && (
                          <div className="mt-2 text-sm">
                            <span className="text-muted-foreground">Sunucu: </span>
                            <span className="font-medium">{event.presenter}</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>Bu gün için planlanmış etkinlik bulunmuyor.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4" 
                      onClick={() => setShowNewEventDialog(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Etkinlik Ekle
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Yaklaşan Etkinlikler Listesi */}
      <Card>
        <CardHeader>
          <CardTitle>Yaklaşan Etkinlikler</CardTitle>
          <CardDescription>Sonraki 14 gün içindeki etkinlikleriniz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter(event => {
                const today = new Date();
                const eventDate = new Date(event.date);
                const twoWeeksLater = new Date();
                twoWeeksLater.setDate(today.getDate() + 14);
                return eventDate >= today && eventDate <= twoWeeksLater;
              })
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map(event => {
                const { bgColor, textColor, icon } = getEventStyle(event.type);
                return (
                  <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                    <div className={`p-3 ${bgColor} rounded-lg`}>
                      {event.type === "meeting" ? (
                        <Users className="h-5 w-5" />
                      ) : event.type === "course" ? (
                        <BookOpen className="h-5 w-5" />
                      ) : (
                        <Globe className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>
                            {event.date.toLocaleDateString('tr-TR', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatTime(event.date)} ({event.duration} dakika)
                          </span>
                        </div>
                      </div>
                      {event.type === "meeting" && event.attendees && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {event.attendees.map((attendee, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {attendee}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {event.type === "course" && event.instructor && (
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Eğitmen: </span>
                          <span className="font-medium">{event.instructor}</span>
                        </div>
                      )}
                      {event.type === "webinar" && event.presenter && (
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Sunucu: </span>
                          <span className="font-medium">{event.presenter}</span>
                        </div>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-shrink-0"
                      onClick={() => showEventDetails(event)}
                    >
                      Detaylar
                    </Button>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Etkinlik Detay Modalı */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-md z-50 bg-background/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              Etkinlik detayları
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                <div className="text-muted-foreground">Tarih:</div>
                <div>{selectedEvent.date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                
                <div className="text-muted-foreground">Saat:</div>
                <div>{formatTime(selectedEvent.date)}</div>
                
                <div className="text-muted-foreground">Süre:</div>
                <div>{selectedEvent.duration} dakika</div>
                
                <div className="text-muted-foreground">Tür:</div>
                <div className="capitalize">{selectedEvent.type}</div>
                
                {selectedEvent.type === "meeting" && selectedEvent.attendees && (
                  <>
                    <div className="text-muted-foreground">Katılımcılar:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedEvent.attendees.map((attendee: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {attendee}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
                
                {selectedEvent.type === "course" && selectedEvent.instructor && (
                  <>
                    <div className="text-muted-foreground">Eğitmen:</div>
                    <div>{selectedEvent.instructor}</div>
                  </>
                )}
                
                {selectedEvent.type === "webinar" && selectedEvent.presenter && (
                  <>
                    <div className="text-muted-foreground">Sunucu:</div>
                    <div>{selectedEvent.presenter}</div>
                  </>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            <Button variant="secondary" onClick={() => setShowDetailDialog(false)}>
              Kapat
            </Button>
            <Button variant="outline" className="gap-1">
              <CalendarDays className="h-4 w-4" />
              Takvime Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Yeni Etkinlik Oluşturma Modalı */}
      <Dialog open={showNewEventDialog} onOpenChange={setShowNewEventDialog}>
        <DialogContent className="sm:max-w-md z-50 bg-background/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Yeni Etkinlik Oluştur</DialogTitle>
            <DialogDescription>
              Takvime yeni bir etkinlik ekleyin
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                placeholder="Etkinlik Başlığı" 
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Tarih</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Saat</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Süre (dakika)</Label>
              <Input 
                id="duration" 
                type="number" 
                placeholder="60" 
                value={newEvent.duration}
                onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Etkinlik Türü</Label>
              <RadioGroup 
                value={newEvent.type}
                onValueChange={(value) => setNewEvent({...newEvent, type: value})}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="meeting" id="meeting" />
                  <Label htmlFor="meeting" className="cursor-pointer">Toplantı</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="course" id="course" />
                  <Label htmlFor="course" className="cursor-pointer">Eğitim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="webinar" id="webinar" />
                  <Label htmlFor="webinar" className="cursor-pointer">Webinar</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea 
                id="description" 
                placeholder="Etkinlik hakkında kısa açıklama yazın"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attendees">Katılımcılar (virgülle ayırın)</Label>
              <Textarea 
                id="attendees" 
                placeholder="Ahmet Yılmaz, Mehmet Kaya, Ayşe Demir"
                value={newEvent.attendees}
                onChange={(e) => setNewEvent({...newEvent, attendees: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewEventDialog(false)}>İptal</Button>
            <Button onClick={createNewEvent} className="gap-1">
              <Save className="h-4 w-4" />
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 