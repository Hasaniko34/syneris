"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type FormData = {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Bir şeyler yanlış gitti")
      }

      toast.success("Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.")
      reset() // Formu sıfırla
    } catch (error) {
      console.error("Form gönderme hatası:", error)
      toast.error(error instanceof Error ? error.message : "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-lg border-primary/10 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-600 to-primary font-heading">
          İletişim Formu
        </CardTitle>
        <CardDescription>
          Aşağıdaki formu doldurarak bize mesaj gönderebilirsiniz.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Adınız</Label>
              <Input 
                id="firstName" 
                placeholder="Adınızı giriniz" 
                {...register("firstName", { required: "Adınız gerekli" })}
                aria-invalid={errors.firstName ? "true" : "false"}
                className="border-primary/20 focus:border-primary/50 focus:ring-primary/20"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Soyadınız</Label>
              <Input 
                id="lastName" 
                placeholder="Soyadınızı giriniz" 
                {...register("lastName", { required: "Soyadınız gerekli" })}
                aria-invalid={errors.lastName ? "true" : "false"}
                className="border-primary/20 focus:border-primary/50 focus:ring-primary/20"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-posta Adresiniz</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="E-posta adresinizi giriniz" 
              {...register("email", { 
                required: "E-posta adresi gerekli", 
                pattern: { 
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                  message: "Geçerli bir e-posta adresi giriniz" 
                } 
              })}
              aria-invalid={errors.email ? "true" : "false"}
              className="border-primary/20 focus:border-primary/50 focus:ring-primary/20"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Konu</Label>
            <Input 
              id="subject" 
              placeholder="Mesajınızın konusu" 
              {...register("subject", { required: "Konu gerekli" })}
              aria-invalid={errors.subject ? "true" : "false"}
              className="border-primary/20 focus:border-primary/50 focus:ring-primary/20"
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Mesajınız</Label>
            <Textarea
              id="message"
              placeholder="Mesajınızı buraya yazınız"
              className="min-h-32 border-primary/20 focus:border-primary/50 focus:ring-primary/20"
              {...register("message", { required: "Mesaj gerekli" })}
              aria-invalid={errors.message ? "true" : "false"}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white" 
            size="lg" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 