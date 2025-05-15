import './globals.css'
import type { Metadata } from 'next'
import { inter, manrope } from '@/lib/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from './providers'
import { Inter } from "next/font/google"

// Inter fontunu ana font olarak kullanıyoruz
const interFont = Inter({ subsets: ["latin"] })

export const fontSans = interFont

export const metadata: Metadata = {
  title: 'TEB Akademi - Eğitim ve Gelişim Platformu',
  description: 'TEB çalışanları için özelleştirilmiş eğitim ve gelişim platformu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${interFont.className} teb-theme min-h-screen bg-background text-foreground antialiased`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
        <ThemeProvider
          attribute="class"
          defaultTheme="blue-theme"
          enableSystem
          themes={["system", "light", "dark", "blue-theme", "dark-blue"]}
        >
            {children}
            <Toaster />
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
