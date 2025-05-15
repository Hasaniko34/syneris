import { Metadata } from "next"
import { motion } from "framer-motion"

import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { MapLocation } from "@/components/contact/map-location"

export const metadata: Metadata = {
  title: "İletişim | Syneris",
  description: "Bize ulaşın ve sorularınızı sorun",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-100/60 to-primary/10 overflow-hidden">
      {/* Arka plan dekoratif elemanları */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-r from-primary/10 via-purple-200/30 to-white/0"></div>
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <div className="absolute inset-0 grid grid-cols-12 opacity-25">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-primary/30 h-full"></div>
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-12 opacity-25">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-b border-primary/30 w-full"></div>
            ))}
          </div>
        </div>
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-primary/30 to-purple-400/30 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-l from-primary/30 to-cyan-400/30 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-6 relative">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-6 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-600 to-primary font-heading drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            Bizimle İletişime Geçin
          </h1>
          <p className="text-lg text-foreground max-w-2xl">
            Sorularınız, geri bildirimleriniz veya iş birliği fırsatları için bizimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağız.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ContactForm />
          <ContactInfo />
        </motion.div>

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MapLocation />
        </motion.div>
      </div>
    </div>
  )
} 