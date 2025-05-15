import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Hata ayıklama için try-catch ile NextAuth handler'ı oluştur
let handler;

try {
  handler = NextAuth(authOptions);
  console.log("NextAuth başarıyla yüklendi");
} catch (error: any) {
  console.error("NextAuth yüklenirken hata:", error);
  // Hata durumunda yine de oluştur
  handler = NextAuth(authOptions);
}

// API rotaları için modül seviyesinde export
export { handler as GET, handler as POST }; 