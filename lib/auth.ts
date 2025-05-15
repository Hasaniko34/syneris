import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { dbConnect } from "./mongoose";
import User from "./models/User";
import { JWT } from "next-auth/jwt";

// Kullanıcı oturum arayüzü
export interface ISession {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
    company: string;
  };
}

// JWT için genişletilmiş arayüz
interface ExtendedJWT extends JWT {
  id?: string;
  role?: string;
  company?: string;
  createdAt?: number;
  updatedAt?: number;
  accessTokenExpires?: number;
}

/**
 * Access token için varsayılan yaşam süresi: 4 saat
 * Not: Süreleri saniye cinsinden tanımlıyoruz
 */
const ACCESS_TOKEN_MAXAGE = 4 * 60 * 60; // 4 saat

/**
 * JWT token için maksimum yaşam süresi: 7 gün
 * Bu süre, refresh token işlemi için maksimum süreyi belirler
 */
const JWT_MAXAGE = 7 * 24 * 60 * 60; // 7 gün

// Kimlik doğrulama ayarları
export const authOptions: AuthOptions = {
  // Sayfa yapılandırması
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/signup",
  },
  
  // Oturum yapılandırması
  session: {
    strategy: "jwt",
    maxAge: ACCESS_TOKEN_MAXAGE, // Access token süresi (4 saat)
  },
  
  // JWT yapılandırması
  jwt: {
    maxAge: JWT_MAXAGE, // JWT için maksimum süre (7 gün)
  },
  
  // Sağlayıcılar
  providers: [
    // Credentials sağlayıcısı
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      
      // Yetkilendirme işlevi
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("E-posta ve şifre gereklidir");
          }
          
          // Veritabanına bağlan
          await dbConnect();

          // Kullanıcıyı e-posta ile ara
          const user = await User.findOne({ email: credentials.email.toLowerCase() });
          
          // Kullanıcı bulunamadı
          if (!user) {
            throw new Error("Kullanıcı bulunamadı");
          }
          
          // Kullanıcı aktif değil
          if (!user.active) {
            throw new Error("Bu hesap devre dışı bırakılmış. Lütfen yöneticinizle iletişime geçin");
          }
          
          // Kullanıcı hesabı doğrulanmamış
          if (!user.isVerified) {
            throw new Error("Hesabınız henüz doğrulanmamış. Lütfen e-posta onayını tamamlayın");
          }
          
          // Parola yok
          if (!user.password) {
            throw new Error("Bu hesap için parola ayarlanmamış. Sosyal giriş veya şifre sıfırlama kullanın");
          }
          
          // Parolayı kontrol et
          const isPasswordValid = await compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            throw new Error("Geçersiz şifre");
          }
          
          // Son giriş tarihini güncelle
          user.lastLogin = new Date();
          await user.save();
          
          // Kullanıcı bilgilerini döndür
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            company: user.company,
          };
        } catch (error: any) {
          console.error("Kimlik doğrulama hatası:", error.message);
          throw new Error(error.message || "Kimlik doğrulama hatası");
        }
      },
    }),
    
    // Google sağlayıcısı geçici olarak devre dışı bırakıldı
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    //   // İzin talebi yapılandırması
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code"
    //     }
    //   },
    // }),
  ],
  
  // Callback'ler
  callbacks: {
    // JWT callback'i - JWT oluşturulurken çağrılır
    async jwt({ token, user, trigger }) {
      const now = Math.floor(Date.now() / 1000); // Şimdiki zaman (saniye cinsinden)
      
      // İlk oturum açma durumunda kullanıcı bilgilerini token'a ekleme
      if (user) {
        (token as ExtendedJWT).id = user.id;
        (token as ExtendedJWT).role = (user as any).role;
        (token as ExtendedJWT).company = (user as any).company;
        (token as ExtendedJWT).createdAt = now;
        (token as ExtendedJWT).updatedAt = now;
        (token as ExtendedJWT).accessTokenExpires = now + ACCESS_TOKEN_MAXAGE;
        
        return token;
      }
      
      // Token yenileme için kontrol
      const extendedToken = token as ExtendedJWT;
      
      // Oturum güncellemesi yapılıyorsa veya access token süresi dolmuşsa
      if (trigger === "update" || (extendedToken.accessTokenExpires && now >= extendedToken.accessTokenExpires)) {
        console.log("Token yenileniyor...");
        
        try {
          // Kullanıcının hala geçerli olduğunu doğrula (opsiyonel: DB kontrolü yapabilirsiniz)
          await dbConnect();
          
          const user = await User.findOne({ _id: extendedToken.id });
          
          // Kullanıcı aktif değilse veya silindiyse token yenilemeyi reddet
          if (!user || !user.active) {
            console.warn(`Token yenileme reddedildi: Geçersiz kullanıcı - ${extendedToken.id}`);
            throw new Error("Token yenilenemiyor: Kullanıcı artık geçerli değil");
          }
          
          // Token'ı yenile
          extendedToken.updatedAt = now;
          extendedToken.accessTokenExpires = now + ACCESS_TOKEN_MAXAGE;
          
          console.log("Token başarıyla yenilendi.");
          
          // Kullanıcı nesnesi güncellenmiş olabilir, varsa bilgileri de güncelle
          extendedToken.role = user.role;
          extendedToken.company = user.company;
        } catch (error) {
          console.error("Token yenileme hatası:", error);
          // Hata durumunda yine de token'ı döndür, oturum sona erecek
        }
      }
      
      // JWT'nin toplam ömrü dolmuş mu kontrol et
      if (extendedToken.createdAt && now > extendedToken.createdAt + JWT_MAXAGE) {
        console.log("JWT maksimum yaşam süresini aştı, oturum sonlandırılıyor.");
        throw new Error("JWT maksimum yaşam süresini aştı");
      }
      
      return token;
    },
    
    // Oturum callback'i - oturum nesnesi oluşturulurken çağrılır
    async session({ session, token }) {
      if (token) {
        // Token'dan kullanıcı bilgilerini alarak oturum nesnesine ekle
        session.user = {
          ...session.user,
          id: (token as ExtendedJWT).id || "",
          role: (token as ExtendedJWT).role || "user",
          company: (token as ExtendedJWT).company || "",
        };
        
        // Oturumun ne zaman sona ereceği bilgisini de ekle
        if ((token as ExtendedJWT).accessTokenExpires) {
          session.expires = new Date(
            (token as ExtendedJWT).accessTokenExpires! * 1000
          ).toISOString();
        }
      }
      
      return session;
    },
  },
  
  // Diğer olaylar
  events: {
    async signIn({ user }) {
      console.log(`Kullanıcı giriş yaptı: ${user.id}`);
    },
    async signOut({ token }) {
      console.log(`Kullanıcı çıkış yaptı: ${(token as ExtendedJWT).id}`);
    },
    async createUser({ user }) {
      console.log(`Yeni kullanıcı oluşturuldu: ${user.id}`);
    },
  },
  
  // Güvenlik ayarları - ortam değişkeni yoksa sabit değer kullan
  secret: process.env.NEXTAUTH_SECRET || "TEB_SYNERIS_GECİCİ_GİZLİ_ANAHTAR",
  debug: process.env.NODE_ENV === "development",
};

// export default NextAuth(authOptions); // Bu satırı kaldır - NextAuth'u route.ts içinde kullanıyoruz 