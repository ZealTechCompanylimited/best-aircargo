import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Award, Globe } from "lucide-react"
import PageHeader from "@/components/page-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="About Best Air Cargo"
        description="Leading the way in air cargo services between China and Tanzania with reliability, speed, and professional excellence."
        backgroundImage="/images/about.jpg"
      />

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Best Air Cargo was founded with a simple mission: to provide reliable, fast, and cost-effective air
                cargo services between China and Tanzania. We understand the importance of your shipments and treat each
                package with the utmost care and attention.
              </p>
              <p className="text-gray-600 mb-4">
                Over the years, we have built strong partnerships with airlines and logistics providers to ensure
                seamless transportation of your goods. Our team of experienced professionals works around the clock to
                guarantee your cargo reaches its destination safely and on time.
              </p>
              <p className="text-gray-600">
                Today, we are proud to be one of the most trusted names in air cargo services, serving hundreds of
                satisfied customers across Tanzania.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-500 mb-2">500+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">1000+</div>
                  <div className="text-gray-600">Shipments Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-500 mb-2">24/7</div>
                  <div className="text-gray-600">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We deliver on our promises and ensure your cargo arrives safely and on time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                <CardTitle>Customer Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We go above and beyond to meet your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We strive for excellence in every aspect of our service delivery.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                <CardTitle>Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Connecting China and Tanzania with efficient and professional services.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who make Best Air Cargo a trusted name in logistics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <CardTitle>Operations Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Experienced logistics professionals ensuring smooth operations and timely deliveries.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <CardTitle>Customer Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dedicated support team available 24/7 to assist with your shipping needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <CardTitle>Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Strategic leadership focused on innovation and continuous improvement.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
