"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Bell, CheckCheck, Info, AlertTriangle, AlertCircle, Award, Calendar, Clock, FileCheck, Mail, MessageSquare, User, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

// Bildirim türlerini tanımlama
export type NotificationType = 
  | "info" 
  | "success" 
  | "warning" 
  | "error" 
  | "achievement" 
  | "event" 
  | "task" 
  | "message" 
  | "education" 
  | "system";

// Bildirimlere özel varyasyonları tanımlama
const notificationVariants = cva(
  "relative flex items-start gap-3 p-4 rounded-lg transition-all",
  {
    variants: {
      variant: {
        info: "bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500",
        success: "bg-green-50 dark:bg-green-950 border-l-4 border-green-500",
        warning: "bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500",
        error: "bg-red-50 dark:bg-red-950 border-l-4 border-red-500",
        achievement: "bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-500",
        event: "bg-indigo-50 dark:bg-indigo-950 border-l-4 border-indigo-500",
        task: "bg-cyan-50 dark:bg-cyan-950 border-l-4 border-cyan-500",
        message: "bg-teal-50 dark:bg-teal-950 border-l-4 border-teal-500",
        education: "bg-emerald-50 dark:bg-emerald-950 border-l-4 border-emerald-500",
        system: "bg-slate-50 dark:bg-slate-950 border-l-4 border-slate-500",
        default: "bg-background border",
      },
      size: {
        default: "",
        sm: "p-3 text-sm",
        lg: "p-5",
      },
      hoverable: {
        true: "hover:brightness-95 dark:hover:brightness-110 cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hoverable: false,
    },
  }
);

// Bildirim türüne göre ikon seçme
export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "info":
      return <Info className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
    case "success":
      return <CheckCheck className="h-5 w-5 text-green-600 dark:text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />;
    case "error":
      return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />;
    case "achievement":
      return <Award className="h-5 w-5 text-purple-600 dark:text-purple-500" />;
    case "event":
      return <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-500" />;
    case "task":
      return <FileCheck className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />;
    case "message":
      return <MessageSquare className="h-5 w-5 text-teal-600 dark:text-teal-500" />;
    case "education":
      return <FileCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />;
    case "system":
      return <Bell className="h-5 w-5 text-slate-600 dark:text-slate-500" />;
    default:
      return <Bell className="h-5 w-5 text-slate-600 dark:text-slate-500" />;
  }
};

// Bildirim türüne göre etiket metin ve renk bilgilerini alma
export const getNotificationBadgeDetails = (type: NotificationType) => {
  switch (type) {
    case "info":
      return { text: "Bilgi", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" };
    case "success":
      return { text: "Başarılı", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" };
    case "warning":
      return { text: "Uyarı", className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100" };
    case "error":
      return { text: "Hata", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" };
    case "achievement":
      return { text: "Başarı", className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" };
    case "event":
      return { text: "Etkinlik", className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100" };
    case "task":
      return { text: "Görev", className: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100" };
    case "message":
      return { text: "Mesaj", className: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100" };
    case "education":
      return { text: "Eğitim", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100" };
    case "system":
      return { text: "Sistem", className: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100" };
    default:
      return { text: "Bildirim", className: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100" };
  }
};

// Türkçe tarih formatı için yardımcı fonksiyon
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} saniye önce`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} dakika önce`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} saat önce`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} gün önce`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} hafta önce`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ay önce`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} yıl önce`;
};

// Bildirim bileşeni için props tanımlama
export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  type: NotificationType;
  title: string;
  content?: string;
  timestamp?: Date;
  read?: boolean;
  link?: string;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
  showBadge?: boolean;
  showTimestamp?: boolean;
  showActions?: boolean;
}

// Bildirim bileşeni
export function Notification({
  type = "info",
  title,
  content,
  timestamp,
  read = false,
  link,
  onMarkAsRead,
  onDelete,
  showBadge = true,
  showTimestamp = true,
  showActions = true,
  className,
  variant = type,
  size = "default",
  hoverable = true,
  ...props
}: NotificationProps) {
  const badgeDetails = getNotificationBadgeDetails(type);
  const icon = getNotificationIcon(type);
  
  // Link verilmişse bildirim için Link component'i oluştur, yoksa normal div döndür
  const NotificationWrapper = ({ children }: { children: React.ReactNode }) => {
    if (link) {
      return (
        <Link href={link} className="block">
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  return (
    <Card className={cn(!read && "border-l-4 border-l-primary", className)}>
      <CardContent className="p-0">
        <NotificationWrapper>
          <div
            className={cn(
              notificationVariants({ variant, size, hoverable }),
              "group",
              className
            )}
            {...props}
          >
            {!read && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            )}
            
            {/* İkon alanı */}
            <div className="shrink-0">
              {icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-1">
                {/* Başlık ve etiket */}
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h4 className="font-semibold text-sm leading-none">
                    {title}
                  </h4>
                  
                  {showBadge && (
                    <Badge variant="secondary" className={cn("text-xs", badgeDetails.className)}>
                      {badgeDetails.text}
                    </Badge>
                  )}
                </div>
                
                {/* İçerik */}
                {content && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {content}
                  </p>
                )}
                
                {/* Tarih ve işlemler */}
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                  {showTimestamp && timestamp && (
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatRelativeTime(timestamp)}
                    </span>
                  )}
                  
                  {showActions && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!read && onMarkAsRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onMarkAsRead();
                          }}
                        >
                          <CheckCheck className="h-3 w-3 mr-1" />
                          Okundu
                        </Button>
                      )}
                      
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs hover:bg-destructive hover:text-destructive-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete();
                          }}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Sil
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </NotificationWrapper>
      </CardContent>
    </Card>
  );
}

// Bildirim sayacı bileşeni
export interface NotificationCounterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  maxCount?: number;
}

export function NotificationCounter({
  count,
  maxCount = 99,
  className,
  ...props
}: NotificationCounterProps) {
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  
  if (count === 0) return null;
  
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-medium",
        count < 10 ? "h-5 w-5" : "h-5 min-w-5 px-1",
        className
      )}
      {...props}
    >
      {displayCount}
    </div>
  );
}

// Boş bildirim durumu
export function NotificationEmpty({
  message = "Bildiriminiz bulunmuyor",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { message?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8",
        className
      )}
      {...props}
    >
      <Bell className="h-10 w-10 text-muted-foreground/50 mb-2" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

// Bildirimleri yükleme durumu
export function NotificationSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="rounded-full h-5 w-5 bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

// Bildirim gruplama bileşeni
export function NotificationGroup({
  title,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { title: string }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
} 