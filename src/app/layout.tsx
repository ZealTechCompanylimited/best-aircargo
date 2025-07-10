import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Best Air Cargo - Express Air Cargo Services",
  description: "Reliable air cargo services from China to Tanzania. Fast, secure, and professional shipping solutions.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </AuthProvider>
      </body>
    </html>
  )
}
