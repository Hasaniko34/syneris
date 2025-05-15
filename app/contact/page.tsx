"use client"

import { Metadata } from "next"
// import { motion } from "@/components/motion-wrapper" - kaldırıldı

import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { MapLocation } from "@/components/contact/map-location"

// Metadata artık client component'te çalışmaz, ayrı bir dosyaya taşıyalım
// export const metadata: Metadata = {
//   title: "İletişim | Syneris",
//   description: "Bize ulaşın ve sorularınızı sorun",
// }

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">İletişim</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bize Ulaşın</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                  Adınız
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Adınızı giriniz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                  Soyadınız
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Soyadınızı giriniz"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border rounded"
                placeholder="E-posta adresinizi giriniz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="subject">
                Konu
              </label>
              <input
                id="subject"
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Konu giriniz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Mesajınız
              </label>
              <textarea
                id="message"
                className="w-full p-2 border rounded h-32"
                placeholder="Mesajınızı giriniz"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Gönder
            </button>
          </form>
        </div>
        
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Adres</h3>
              <p className="text-gray-600">
                Maslak Mahallesi, Büyükdere Caddesi No:255<br />
                Nurol Plaza, 34450 Sarıyer/İstanbul
              </p>
            </div>
            <div>
              <h3 className="font-medium">Telefon</h3>
              <p className="text-gray-600">+90 (212) 345 67 89</p>
            </div>
            <div>
              <h3 className="font-medium">E-posta</h3>
              <p className="text-gray-600">info@syneris.com</p>
            </div>
            <div>
              <h3 className="font-medium">Çalışma Saatleri</h3>
              <p className="text-gray-600">
                Pazartesi - Cuma: 09:00 - 18:00<br />
                Cumartesi - Pazar: Kapalı
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Konum</h2>
        <div className="bg-gray-200 h-64 flex items-center justify-center rounded">
          <p className="text-gray-600">Harita görüntüsü burada yer alacak</p>
        </div>
      </div>
    </div>
  )
} 