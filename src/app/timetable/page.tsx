"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, MapPin } from "lucide-react"
import PageHeader from "@/components/page-header"
import type { Flight } from "@/lib/types"

export default function TimetablePage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading flight schedule...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="Flight Timetable"
        description="Check our regular flight schedules from major Chinese cities to Tanzania"
        backgroundImage="/images/air.jpg"
      />

      {/* Timetable */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Weekly Flight Schedule</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All times are local. Cargo cutoff is 2 hours before departure.
            </p>
          </div>

          <div className="grid gap-6">
            {flights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-orange-500 to-teal-500 text-white p-3 rounded-lg">
                        <Plane className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{flight.id}</CardTitle>
                        <p className="text-gray-600 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {flight.route}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={flight.status === "On Time" ? "default" : "destructive"}
                      className={flight.status === "On Time" ? "bg-green-500" : ""}
                    >
                      {flight.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="font-semibold">{flight.departure_time}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-teal-500" />
                      <div>
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="font-semibold">{flight.arrival_time}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold">{flight.duration}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Operating Days</p>
                      <div className="flex space-x-1 mt-1">
                        {flight.operating_days.map((day) => (
                          <Badge key={day} variant="outline" className="text-xs">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 text-orange-500 mr-2" />
                  Cargo Cutoff Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• General Cargo: 2 hours before departure</li>
                  <li>• Dangerous Goods: 4 hours before departure</li>
                  <li>• Live Animals: 6 hours before departure</li>
                  <li>• Perishables: 1 hour before departure</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 text-teal-500 mr-2" />
                  Transit Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Beijing - Dar es Salaam: 3-4 days</li>
                  <li>• Shanghai - Dar es Salaam: 3-5 days</li>
                  <li>• Guangzhou - Dar es Salaam: 3-4 days</li>
                  <li>• Shenzhen - Dar es Salaam: 4-5 days</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plane className="w-5 h-5 text-orange-500 mr-2" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• All times are subject to change</li>
                  <li>• Weather conditions may affect schedules</li>
                  <li>• Customs clearance may add 1-2 days</li>
                  <li>• Holiday schedules may vary</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
