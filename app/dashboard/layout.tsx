"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "@/components/motion-wrapper";
import {
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Users,
  BookOpen,
  BarChart2,
  Bell,
  MessageSquare,
  Briefcase,
  Building2,
  Bot,
  Brain,
  Sparkles,
  CreditCard,
  PiggyBank,
  Target,
  Shield,
  Layers,
  FileText,
  HelpCircle,
  Calendar,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
  highlight?: boolean;
}

const NavItem = ({ href, icon, label, active, onClick, highlight }: NavItemProps) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative ${
      active
        ? "bg-[#005f9e] text-white"
        : "hover:bg-[#e0f0fa] text-[#333]"
    }`}
    onClick={onClick}
  >
    <span className={`${active ? "text-white" : "text-[#005f9e]"}`}>{icon}</span>
    <span>{label}</span>
    {active && (
      <motion.div
        layoutId="activeNavIndicator"
        className="absolute right-0 w-1 h-8 bg-white rounded-l-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    )}
    {highlight && !active && (
      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#005f9e]/50 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-[#005f9e]"></span>
      </span>
    )}
  </Link>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Geçici kullanıcı bilgileri - gerçek uygulamada veritabanından alınacak
  const user = {
    name: "Mehmet Yılmaz",
    email: "mehmet.yilmaz@turkcell.com.tr",
    role: "Bölge Müdürü",
    avatar: "/images/avatars/default.png",
    company: "Turkcell",
    branch: "İstanbul Levent Bölge Müdürlüğü"
  };

  // Ana navigasyon menüsü
  const mainNavItems = [
    { href: "/dashboard", icon: <Home size={20} />, label: "Ana Sayfa" },
    { href: "/dashboard/profile", icon: <User size={20} />, label: "Profilim" },
    { href: "/dashboard/egitimlerim", icon: <BookOpen size={20} />, label: "Eğitimlerim" },
    { href: "/dashboard/ogrenme-yollari", icon: <Target size={20} />, label: "Kariyer Yolum" },
    { href: "/dashboard/egitim-katalogu", icon: <Briefcase size={20} />, label: "Eğitim Kataloğu" },
    { 
      href: "/dashboard/synbot", 
      icon: <Bot size={20} />, 
      label: "SynBot",
      highlight: true 
    },
    { href: "/dashboard/analytics", icon: <BarChart2 size={20} />, label: "Performans Analitiği" },
  ];

  // Yönetim paneli menüsü
  const adminNavItems = [
    { href: "/dashboard/company", icon: <Building2 size={20} />, label: "Bölge Yönetimi" },
    { href: "/dashboard/employees", icon: <Users size={20} />, label: "Ekip Yönetimi" },
    { href: "/dashboard/egitim-yonetimi", icon: <BookOpen size={20} />, label: "Eğitim Yönetimi" },
  ];

  // Turkcell ürün ve hizmetleri menüsü
  const productNavItems = [
    { href: "/dashboard/bireysel-cozumler", icon: <Smartphone size={20} />, label: "Bireysel Çözümler" },
    { href: "/dashboard/kurumsal-cozumler", icon: <Building2 size={20} />, label: "Kurumsal Çözümler" },
    { href: "/dashboard/dijital-servisler", icon: <Layers size={20} />, label: "Dijital Servisler" },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#f7f9fb]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 border-r border-[#e0f0fa] bg-white fixed h-full z-30`}
      >
        <div className="flex flex-col h-full">
          {/* Logo ve menü toggle */}
          <div className="flex items-center justify-between p-4 border-b border-[#e0f0fa]">
            <Link href="/dashboard" className="flex items-center gap-2">
              {sidebarOpen ? (
                <h1 className="text-xl font-bold text-[#005f9e]">
                  Syneris
                </h1>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#005f9e] flex items-center justify-center text-white font-bold">
                  S
                </div>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8 text-[#005f9e] hover:bg-[#e0f0fa]"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>

          {/* Ana navigasyon */}
          <nav className="p-2 space-y-1">
            {mainNavItems.map((item) => {
              const isActive = item.href === "/dashboard" 
                ? pathname === "/dashboard" || pathname === "/dashboard/" 
                : pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/dashboard");
              
              return (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={sidebarOpen ? item.label : ""}
                  active={isActive}
                  highlight={item.highlight}
                  onClick={sidebarOpen ? undefined : toggleSidebar}
                />
              );
            })}
          </nav>

          {/* Bankacılık Ürünleri */}
          <div className="px-4 py-2 mt-2">
            {sidebarOpen && (
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Turkcell Ürün ve Hizmetleri
              </div>
            )}
            <div className="h-px bg-[#e0f0fa] my-2"></div>
          </div>

          <nav className="p-2 space-y-1">
            {productNavItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/dashboard");
              
              return (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={sidebarOpen ? item.label : ""}
                  active={isActive}
                  onClick={sidebarOpen ? undefined : toggleSidebar}
                />
              );
            })}
          </nav>

          {/* Yönetim bölümü, sadece yöneticiler için */}
          {user.role === "Şube Müdürü" || user.role === "Bölge Müdürü" || user.role === "Genel Müdürlük" ? (
            <>
              <div className="px-4 py-2 mt-2">
                {sidebarOpen && (
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Yönetim Paneli
                  </div>
                )}
                <div className="h-px bg-[#e0f0fa] my-2"></div>
              </div>

              {/* Admin navigasyon */}
              <nav className="p-2 space-y-1">
                {adminNavItems.map((item) => {
                  const isActive = pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/dashboard");
                  
                  return (
                    <NavItem
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      label={sidebarOpen ? item.label : ""}
                      active={isActive}
                      onClick={sidebarOpen ? undefined : toggleSidebar}
                    />
                  );
                })}
              </nav>
            </>
          ) : null}

          {/* Yardım & Destek */}
          <div className="mt-auto p-2">
            <NavItem
              href="/dashboard/help"
              icon={<HelpCircle size={20} />}
              label={sidebarOpen ? "Yardım & Destek" : ""}
              active={pathname === "/dashboard/help"}
              onClick={sidebarOpen ? undefined : toggleSidebar}
            />
          </div>
        </div>
      </aside>

      {/* Ana içerik */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b bg-white border-[#e0f0fa]">
          <div className="flex items-center gap-4">
            <div className="font-medium text-[#005f9e]">
              {user.branch}
                      </div>
                    </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard/calendar">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-[#005f9e] hover:bg-[#e0f0fa]"
              >
                <Calendar size={20} />
              </Button>
                    </Link>

            <Link href="/dashboard/bildirimler">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-[#005f9e] hover:bg-[#e0f0fa]"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#005f9e]/50 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#005f9e]"></span>
                </span>
                </Button>
              </Link>

              <ThemeSwitcher />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-10 text-[#333] hover:bg-[#e0f0fa]"
                >
                  <Avatar className="h-8 w-8 border border-[#e0f0fa]">
                      <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-[#e0f0fa] text-[#005f9e]">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                      </AvatarFallback>
                    </Avatar>
                  {sidebarOpen ? null : (
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.role}
                      </span>
                    </div>
                  )}
                  </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profilim</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                  <Link href="/dashboard/bildirim-ayarlari" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ayarlar</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                  <Link href="/auth/signout" className="cursor-pointer text-red-500 hover:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Çıkış Yap</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t text-center text-sm text-muted-foreground border-[#e0f0fa]">
          <p>© {new Date().getFullYear()} Turkcell Akademi. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </div>
  );
} 