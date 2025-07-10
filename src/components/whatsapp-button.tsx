"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  message?: string
  phoneNumber?: string
  className?: string
}

export default function WhatsAppButton({
  message = "Hello! I'm interested in your air cargo services.",
  phoneNumber = "+255682636339",
  className = "",
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button onClick={handleWhatsAppClick} className={`bg-green-500 hover:bg-green-600 text-white ${className}`}>
      <MessageCircle className="w-4 h-4 mr-2" />
      WhatsApp
    </Button>
  )
}
