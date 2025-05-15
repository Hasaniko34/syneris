import { Inter, Manrope } from 'next/font/google';

// Inter fontunu ana font olarak kullanıyoruz
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Manrope fontunu başlıklar için kullanıyoruz
export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
}); 