"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Plane, Truck, CheckCircle } from "lucide-react"
import PageHeader from "@/components/page-header"
import type { TrackingResult } from "@/lib/types"

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (trackingNumber) {
        setTrackingResult({
          trackingNumber: trackingNumber,
          status: "In Transit",
          currentLocation: "Beijing, China",
          estimatedDelivery: "2024-01-15",
          timeline: [
            {
              status: "Picked Up",
              location: "Shanghai, China",
              date: "2024-01-10",
              time: "14:30",
              completed: true,
            },
            {
              status: "Departed Origin",
              location: "Shanghai Airport",
              date: "2024-01-11",
              time: "08:00",
              completed: true,
            },
            {
              status: "In Transit",
              location: "Beijing Hub",
              date: "2024-01-12",
              time: "16:45",
              completed: true,
            },
            {
              status: "Customs Clearance",
              location: "Dar es Salaam",
              date: "2024-01-14",
              time: "10:00",
              completed: false,
            },
            {
              status: "Out for Delivery",
              location: "Dar es Salaam",
              date: "2024-01-15",
              time: "09:00",
              completed: false,
            },
          ],
        })
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Track Your Shipment"
        description="Enter your tracking number to get real-time updates on your cargo shipment"
        backgroundImage="/images/storage.jpg"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tracking Form */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Search className="w-6 h-6 mr-2 text-orange-500" />
                  Track Your Shipment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrack} className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="tracking-number">Tracking Number</Label>
                    <Input
                      id="tracking-number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter your tracking number (e.g., BAC12345678)"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600">
                      {loading ? "Tracking..." : "Track"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Tracking Results */}
            {trackingResult && (
              <div className="space-y-6">
                {/* Status Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipment Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Tracking Number</p>
                        <p className="font-semibold">{trackingResult.trackingNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Current Status</p>
                        <Badge className="bg-blue-500">{trackingResult.status}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estimated Delivery</p>
                        <p className="font-semibold">{trackingResult.estimatedDelivery}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipment Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {trackingResult.timeline.map((event, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {event.completed ? (
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                {event.status === "Picked Up" && <Package className="w-4 h-4 text-gray-600" />}
                                {event.status === "Departed Origin" && <Plane className="w-4 h-4 text-gray-600" />}
                                {event.status === "In Transit" && <Plane className="w-4 h-4 text-gray-600" />}
                                {event.status === "Customs Clearance" && <Package className="w-4 h-4 text-gray-600" />}
                                {event.status === "Out for Delivery" && <Truck className="w-4 h-4 text-gray-600" />}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className={`font-semibold ${event.completed ? "text-green-600" : "text-gray-600"}`}>
                                  {event.status}
                                </h3>
                                <p className="text-sm text-gray-500">{event.location}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">{event.date}</p>
                                <p className="text-sm text-gray-500">{event.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Help Section */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Can&apos;t find your tracking number?</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Your tracking number was provided in your booking confirmation email. It usually starts with &quot;BAC&quot;
                      followed by 8 digits.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Contact Support</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      If you need assistance with tracking your shipment, our support team is here to help.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Call Support
                      </Button>
                      <Button variant="outline" size="sm">
                        Email Us
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}