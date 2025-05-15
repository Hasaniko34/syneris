import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MapLocation() {
  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle>Konum</CardTitle>
        <CardDescription>
          Ofisimize nasıl ulaşacağınızı gösteren harita
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 aspect-video">
        <div className="bg-muted h-full w-full flex items-center justify-center">
          <p className="text-center p-4">
            {/* Burada gerçek bir harita entegrasyonu yapılabilir */}
            Harita görüntüsü burada yer alacak. (Google Maps veya başka bir harita servisi entegrasyonu)
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 