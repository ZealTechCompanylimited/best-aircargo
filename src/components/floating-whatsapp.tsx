"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  const quickMessages = [
    {
      title: "Get Quote",
      message: "Hi! I need a quote for shipping cargo from China to Tanzania. Please provide details.",
    },
    {
      title: "Track Shipment",
      message: "Hello! I would like to track my shipment. My tracking number is: ",
    },
    {
      title: "Flight Schedule",
      message: "Hi! Can you please share the current flight schedule from China to Tanzania?",
    },
    {
      title: "General Inquiry",
      message: "Hello! I have some questions about your air cargo services.",
    },
  ]

  const sendWhatsAppMessage = (message: string) => {
    const phoneNumber = "+255682636339"
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg animate-pulse"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}

        {/* WhatsApp Chat Widget */}
        {isOpen && (
          <Card className="w-80 shadow-xl">
            <CardHeader className="bg-green-500 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Best Air Cargo</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-green-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-green-100">How can we help you today?</p>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {quickMessages.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 bg-transparent"
                    onClick={() => sendWhatsAppMessage(item.message)}
                  >
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 truncate">{item.message}</p>
                    </div>
                  </Button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500 text-center">Click any option to start chatting on WhatsApp</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
