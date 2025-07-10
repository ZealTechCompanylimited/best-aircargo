"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import PageHeader from "@/components/page-header"
import type { Flight } from "@/lib/types"

interface BookingFormData {
  customer_name: string
  customer_email: string
  customer_phone: string
  flight_id: string
  cargo_type: string
  cargo_weight: string
  cargo_description: string
  pickup_address: string
  delivery_address: string
}

export default function BookingPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<BookingFormData>({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    flight_id: "",
    cargo_type: "",
    cargo_weight: "",
    cargo_description: "",
    pickup_address: "",
    delivery_address: "",
  })

  useEffect(() => {
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    try {
      const response = await fetch("/api/flights")
      if (response.ok) {
        const data: Flight[] = await response.json()
        setFlights(data)
      }
    } catch (error) {
      console.error("Error fetching flights:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cargo_weight: Number.parseFloat(formData.cargo_weight),
        }),
      })

      if (response.ok) {
        const booking = await response.json()
        alert(`Booking successful! Your tracking number is: ${booking.tracking_number}`)
        setFormData({
          customer_name: "",
          customer_email: "",
          customer_phone: "",
          flight_id: "",
          cargo_type: "",
          cargo_weight: "",
          cargo_description: "",
          pickup_address: "",
          delivery_address: "",
        })
      } else {
        alert("There was an error processing your booking. Please try again.")
      }
    } catch (error) {
      alert("There was an error processing your booking. Please try again.")
    }
  }

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking form...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="Book Your Shipment"
        description="Book your air cargo shipment from China to Tanzania with ease"
        backgroundImage="/images/tanzania-flag.png"
      />

      {/* Booking Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Package className="w-6 h-6 mr-2 text-orange-500" />
                  Cargo Booking Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="customer_name">Full Name *</Label>
                        <Input
                          id="customer_name"
                          value={formData.customer_name}
                          onChange={(e) => handleChange("customer_name", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customer_email">Email Address *</Label>
                        <Input
                          id="customer_email"
                          type="email"
                          value={formData.customer_email}
                          onChange={(e) => handleChange("customer_email", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customer_phone">Phone Number</Label>
                        <Input
                          id="customer_phone"
                          value={formData.customer_phone}
                          onChange={(e) => handleChange("customer_phone", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Flight Selection */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Flight Selection</h3>
                    <div>
                      <Label htmlFor="flight_id">Select Flight *</Label>
                      <Select onValueChange={(value) => handleChange("flight_id", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Choose a flight" />
                        </SelectTrigger>
                        <SelectContent>
                          {flights.map((flight) => (
                            <SelectItem key={flight.id} value={flight.id}>
                              {flight.id} - {flight.route} ({flight.departure_time})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Cargo Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Cargo Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cargo_type">Cargo Type *</Label>
                        <Select onValueChange={(value) => handleChange("cargo_type", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select cargo type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="textiles">Textiles</SelectItem>
                            <SelectItem value="machinery">Machinery</SelectItem>
                            <SelectItem value="automotive">Automotive Parts</SelectItem>
                            <SelectItem value="medical">Medical Equipment</SelectItem>
                            <SelectItem value="food">Food Products</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="cargo_weight">Weight (kg) *</Label>
                        <Input
                          id="cargo_weight"
                          type="number"
                          step="0.1"
                          value={formData.cargo_weight}
                          onChange={(e) => handleChange("cargo_weight", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="cargo_description">Cargo Description</Label>
                      <Textarea
                        id="cargo_description"
                        value={formData.cargo_description}
                        onChange={(e) => handleChange("cargo_description", e.target.value)}
                        rows={3}
                        className="mt-1"
                        placeholder="Provide detailed description of your cargo..."
                      />
                    </div>
                  </div>

                  {/* Addresses */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Pickup & Delivery</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickup_address">Pickup Address (China)</Label>
                        <Textarea
                          id="pickup_address"
                          value={formData.pickup_address}
                          onChange={(e) => handleChange("pickup_address", e.target.value)}
                          rows={3}
                          className="mt-1"
                          placeholder="Enter pickup address in China..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="delivery_address">Delivery Address (Tanzania)</Label>
                        <Textarea
                          id="delivery_address"
                          value={formData.delivery_address}
                          onChange={(e) => handleChange("delivery_address", e.target.value)}
                          rows={3}
                          className="mt-1"
                          placeholder="Enter delivery address in Tanzania..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                      Book Shipment
                    </Button>
                    <WhatsAppButton
                      message="Hi! I need help with booking a shipment. Can you assist me?"
                      className="bg-green-500 hover:bg-green-600"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
