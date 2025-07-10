import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import WhatsAppButton from "../components/whatsapp-button"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Best Air Cargo"
              width={150}
              height={50}
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 mb-4">
              Your trusted partner for air cargo services between China and Tanzania.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/timetable" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Timetable
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Express Air Cargo
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Freight Forwarding
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Customs Clearance
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Door-to-Door Delivery
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Cargo Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <Link href="tel:+255123456789" className="text-gray-400 hover:text-orange-500 transition-colors">
                  +255 123 456 789
                </Link>
              </div>
              <div className="mt-3">
                <WhatsAppButton message="Hello! I'm interested in Best Air Cargo services." className="w-full" />
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <Link
                  href="mailto:info@bestcargo.com"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  info@bestcargo.com
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="text-gray-400">Dar es Salaam, Tanzania</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 Best Air Cargo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
