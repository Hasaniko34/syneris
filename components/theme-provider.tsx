"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  themes?: string[]
  defaultTheme?: string
  attribute?: "class" | "data-theme" | "data-mode"
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
}

export function ThemeProvider({
  children,
  themes = ["light", "dark", "system", "blue-theme", "dark-blue"],
  defaultTheme = "blue-theme",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = false,
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  // Tema değişikliklerinde işlemleri yapmak için ref kullanıyoruz
  const initialized = React.useRef(false)

  // Client tarafında tema değişikliklerini izleyelim
  React.useEffect(() => {
    const root = window.document.documentElement
    
    // Sadece bir kez çalışacak, hydration tamamlandıktan sonra
    if (!initialized.current) {
      // Tüm tema sınıflarını temizle
      const themeClasses = ["light", "dark", "blue-theme", "dark-blue", "system"]
      themeClasses.forEach(cls => root.classList.remove(cls))
      
      // localStorage'dan mevcut temayı al veya varsayılanı kullan
      const storedTheme = localStorage.getItem(storageKey) || defaultTheme
      
      // Tema sınıfını doğrudan HTML elementine ekle
      if (storedTheme && storedTheme !== "system") {
        root.classList.add(storedTheme)
      }
      
      initialized.current = true
    }
  }, [defaultTheme, storageKey])

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      themes={themes}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey={storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
} 