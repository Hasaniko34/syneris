import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function ContactInfo() {
  return (
    <Card className="shadow-lg border-primary/10 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-600 to-primary font-heading">
          İletişim Bilgileri
        </CardTitle>
        <CardDescription>
          Bize aşağıdaki kanallardan ulaşabilirsiniz.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <Icons.mapPin className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Adres</h3>
            <p className="text-muted-foreground">
              Maslak Mahallesi, Büyükdere Caddesi No:255<br />
              Nurol Plaza, 34450 Sarıyer/İstanbul
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <Icons.phone className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Telefon</h3>
            <p className="text-muted-foreground">
              <Link href="tel:+902123456789" className="hover:underline">
                +90 (212) 345 67 89
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <Icons.mail className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">E-posta</h3>
            <p className="text-muted-foreground">
              <Link href="mailto:info@syneris.com" className="hover:underline">
                info@syneris.com
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <Icons.clock className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Çalışma Saatleri</h3>
            <p className="text-muted-foreground">
              Pazartesi - Cuma: 09:00 - 18:00<br />
              Cumartesi - Pazar: Kapalı
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Sosyal Medya</h3>
          <div className="flex space-x-4">
            <Link href="https://twitter.com/syneris" className="hover:text-primary">
              Twitter
            </Link>
            <Link href="https://linkedin.com/company/syneris" className="hover:text-primary">
              LinkedIn
            </Link>
            <Link href="https://instagram.com/syneris" className="hover:text-primary">
              Instagram
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 