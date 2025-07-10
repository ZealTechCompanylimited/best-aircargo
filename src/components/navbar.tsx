"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/timetable", label: "Timetable" },
    { href: "/booking", label: "Book Now" },
    { href: "/tracking", label: "Track" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Flags */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {/* Flag Circle Container */}
              <div className="relative flex items-center">
                {/* China Flag Circle */}
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm relative z-10">
                  <Image
                    src="/images/china-flag.webp"
                    alt="China Flag"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Tanzania Flag Circle - Overlapping */}
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm -ml-2 relative z-0">
                  <Image
                    src="/images/tanzania-flag.png"
                    alt="Tanzania Flag"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Logo */}
              <Image src="/images/logo.jpg" alt="Best Air Cargo" width={120} height={40} className="h-10 w-auto" />
            </div>

            {/* Route Indicator */}
            <div className="hidden sm:flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              <span className="text-red-600 font-medium">CHINA</span>
              <div className="mx-2 text-orange-500">✈</div>
              <span className="text-green-600 font-medium">TANZANIA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <Link href="/admin">
              <Button className="bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 text-white shadow-md">
                Admin Panel
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile Flag Display */}
                <div className="flex items-center justify-center space-x-3 pb-4 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                      <Image
                        src="/images/china-flag.png"
                        alt="China Flag"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">China</span>
                  </div>
                  <div className="text-orange-500 text-lg">✈</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                      <Image
                        src="/images/tanzania-flag.png"
                        alt="Tanzania Flag"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Tanzania</span>
                  </div>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-orange-500 font-medium py-2 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/admin" onClick={() => setIsOpen(false)}>
                  <Button className="bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 text-white w-full shadow-md">
                    Admin Panel
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
