"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { motion } from "framer-motion"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Bu bileşen CLIENT'ta render edildiğinde, mounted state'ini true yap
  useEffect(() => {
    setMounted(true)
  }, [])

  // Tema değişikliği yaparken HTML sınıfını yönet
  const handleChangeTheme = (newTheme: string) => {
    // Temayı ayarla - next-themes bunu dokument sınıflarına da uygulayacak
    setTheme(newTheme)
    
    // Tarayıcı depolamasında tema tercihini sakla
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  // Sayfa yüklendiğinde depolanmış temayı kontrol et ve uygula
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        setTheme(savedTheme)
      }
    }
  }, [mounted, setTheme])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <div className="h-4 w-4 bg-foreground/30 rounded-full animate-pulse" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
          {theme === "light" && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Icons.sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-orange-500" />
            </motion.div>
          )}
          
          {theme === "dark" && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Icons.moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-slate-200" />
            </motion.div>
          )}
          
          {theme === "system" && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Icons.laptop className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          )}
          
          {(theme === "blue-theme") && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Icons.palette className="h-[1.2rem] w-[1.2rem] text-blue-500" />
            </motion.div>
          )}

          {(theme === "dark-blue") && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Icons.palette className="h-[1.2rem] w-[1.2rem] text-blue-400" />
            </motion.div>
          )}
          
          <span className="sr-only">Tema değiştir</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="min-w-[180px] p-2 z-50 bg-card/95 backdrop-blur-lg">
        <DropdownMenuItem 
          onClick={() => handleChangeTheme("system")}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          <Icons.laptop className="h-4 w-4 mr-1" />
          <span>Sistem</span>
          {theme === "system" && (
            <Icons.check className="h-4 w-4 ml-auto text-green-500" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleChangeTheme("light")}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          <Icons.sun className="h-4 w-4 mr-1 text-orange-500" />
          <span>Açık</span>
          {theme === "light" && (
            <Icons.check className="h-4 w-4 ml-auto text-green-500" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleChangeTheme("dark")}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          <Icons.moon className="h-4 w-4 mr-1 text-slate-400" />
          <span>Koyu</span>
          {theme === "dark" && (
            <Icons.check className="h-4 w-4 ml-auto text-green-500" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleChangeTheme("blue-theme")}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          <Icons.palette className="h-4 w-4 mr-1 text-blue-500" />
          <span>Mavi Tema</span>
          {theme === "blue-theme" && (
            <Icons.check className="h-4 w-4 ml-auto text-green-500" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleChangeTheme("dark-blue")}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          <Icons.palette className="h-4 w-4 mr-1 text-blue-400" />
          <span>Koyu Mavi</span>
          {theme === "dark-blue" && (
            <Icons.check className="h-4 w-4 ml-auto text-green-500" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 