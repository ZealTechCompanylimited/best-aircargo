import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Shield, Package } from "lucide-react"
import ImageCarousel from "@/components/image-carousel"

export default function HomePage() {
  const carouselImages = [
    {
      src: "/images/air.jpg",
      alt: "Cargo plane loading",
      title: "Fast & Reliable Air Cargo",
      description: "Your trusted partner for shipping goods from China to Tanzania",
    },
    {
      src: "/images/china.jpg",
      alt: "Air cargo services",
      title: "Express Delivery Services",
      description: "Safe, fast, and cost-effective delivery of your cargo",
    },
    {
      src: "/images/loading.jpg",
      alt: "Cargo loading process",
      title: "Professional Handling",
      description: "Expert cargo handling with state-of-the-art equipment",
    },
    {
      src: "/images/storage.jpg",
      alt: "Modern warehouse",
      title: "Secure Storage",
      description: "Modern warehouse facilities for safe cargo storage",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative">
        <ImageCarousel images={carouselImages} />

        {/* Call to Action Overlay */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
          <Link href="/booking">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
              Get Quote
            </Button>
          </Link>
          <Link href="/tracking">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-white/20 backdrop-blur-sm shadow-lg"
            >
              Track Shipment
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive air cargo solutions tailored to your shipping needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="w-12 h-12 text-orange-500 mb-4" />
                <CardTitle>Express Shipping</CardTitle>
                <CardDescription>
                  Fast delivery of your goods from China to Tanzania within 3-5 business days
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-teal-500 mb-4" />
                <CardTitle>Secure Handling</CardTitle>
                <CardDescription>
                  Professional packaging and secure handling to ensure your cargo arrives safely
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="w-12 h-12 text-orange-500 mb-4" />
                <CardTitle>Real-time Tracking</CardTitle>
                <CardDescription>Track your shipment in real-time from pickup to delivery</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-gray-600">Successful Deliveries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-500 mb-2">3-5</div>
              <div className="text-gray-600">Days Delivery Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-500 mb-2">100%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ship Your Cargo?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Get started with Best Air Cargo today and experience reliable shipping services
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                Book Now
              </Button>
            </Link>
            <Link href="/tracking">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-600 bg-transparent"
              >
                View Schedule
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
