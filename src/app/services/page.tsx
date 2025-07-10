import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Plane, Shield, Clock, Truck, FileText } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="Our Services"
        description="Comprehensive air cargo solutions designed to meet all your shipping needs from China to Tanzania."
        backgroundImage="/images/loading.jpg"
      />

      {/* Main Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a complete range of air cargo services to ensure your goods reach their destination safely and on
              time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Plane className="w-12 h-12 text-orange-500 mb-4" />
                <CardTitle>Express Air Cargo</CardTitle>
                <CardDescription>
                  Fast and reliable air freight services with delivery within 3-5 business days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Priority handling</li>
                  <li>• Real-time tracking</li>
                  <li>• Secure packaging</li>
                  <li>• Insurance coverage</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="w-12 h-12 text-teal-500 mb-4" />
                <CardTitle>Freight Forwarding</CardTitle>
                <CardDescription>
                  Complete logistics solutions including customs clearance and documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Customs clearance</li>
                  <li>• Documentation handling</li>
                  <li>• Multi-modal transport</li>
                  <li>• Warehousing services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="w-12 h-12 text-orange-500 mb-4" />
                <CardTitle>Door-to-Door Delivery</CardTitle>
                <CardDescription>Complete pickup and delivery service from origin to final destination</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Pickup from supplier</li>
                  <li>• Last-mile delivery</li>
                  <li>• Signature confirmation</li>
                  <li>• Flexible scheduling</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-teal-500 mb-4" />
                <CardTitle>Cargo Insurance</CardTitle>
                <CardDescription>Comprehensive insurance coverage to protect your valuable shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Full value coverage</li>
                  <li>• Quick claim processing</li>
                  <li>• Competitive rates</li>
                  <li>• Peace of mind</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="w-12 h-12 text-orange-500 mb-4" />
                <CardTitle>Express Services</CardTitle>
                <CardDescription>Urgent shipment solutions for time-sensitive cargo requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Same-day pickup</li>
                  <li>• Priority processing</li>
                  <li>• Expedited customs</li>
                  <li>• 24/7 monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="w-12 h-12 text-teal-500 mb-4" />
                <CardTitle>Documentation Services</CardTitle>
                <CardDescription>Professional handling of all shipping documents and customs paperwork</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Import/export permits</li>
                  <li>• Commercial invoices</li>
                  <li>• Packing lists</li>
                  <li>• Certificate of origin</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures efficient handling of your cargo from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Book & Quote</h3>
              <p className="text-gray-600">Get instant quote and book your shipment online or by phone</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Pickup & Pack</h3>
              <p className="text-gray-600">We collect your goods and ensure proper packaging for safe transport</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Ship & Track</h3>
              <p className="text-gray-600">Your cargo is shipped via air freight with real-time tracking</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Deliver</h3>
              <p className="text-gray-600">Safe delivery to your specified destination in Tanzania</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ship Your Cargo?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Contact us today for a free quote and experience our professional service
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                Get Quote
              </Button>
            </Link>
            <Link href="/timetable">
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
