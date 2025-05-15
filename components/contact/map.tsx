import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Map() {
  return (
    <Card className="shadow-lg border-primary/10 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-600 to-primary font-heading">
          Konum
        </CardTitle>
        <CardDescription>
          Ofisimizi harita üzerinde görebilirsiniz.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-primary/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6504900120997!2d29.0272!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOcKwMDEnMzcuOSJF!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </CardContent>
    </Card>
  )
} 