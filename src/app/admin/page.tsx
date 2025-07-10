"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plane, Plus, Edit, Trash2, Package, Clock, LogOut, User } from "lucide-react"
import PageHeader from "@/components/page-header"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import type { Flight } from "@/lib/types"

interface NewFlight {
  id: string
  route: string
  departure: string
  arrival: string
  days: string[]
  status: string
  duration: string
}

function AdminContent() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()

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

  const [newFlight, setNewFlight] = useState<NewFlight>({
    id: "",
    route: "",
    departure: "",
    arrival: "",
    days: [],
    status: "On Time",
    duration: "",
  })

  const handleAddFlight = async () => {
    if (newFlight.id && newFlight.route && newFlight.departure && newFlight.arrival) {
      try {
        const response = await fetch("/api/flights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
          body: JSON.stringify({
            id: newFlight.id,
            route: newFlight.route,
            departure_time: newFlight.departure,
            arrival_time: newFlight.arrival,
            operating_days: newFlight.days || [],
            duration: newFlight.duration,
            status: newFlight.status,
          }),
        })

        if (response.ok) {
          fetchFlights()
          setNewFlight({
            id: "",
            route: "",
            departure: "",
            arrival: "",
            days: [],
            status: "On Time",
            duration: "",
          })
        }
      } catch (error) {
        console.error("Error adding flight:", error)
      }
    }
  }

  const handleDeleteFlight = async (id: string) => {
    if (confirm("Are you sure you want to delete this flight?")) {
      try {
        const response = await fetch(`/api/flights/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        })

        if (response.ok) {
          fetchFlights()
        }
      } catch (error) {
        console.error("Error deleting flight:", error)
      }
    }
  }

  const handleUpdateFlightStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/flights/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchFlights()
      }
    } catch (error) {
      console.error("Error updating flight status:", error)
    }
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header with Logout */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <Badge className="bg-green-500">Authenticated</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">{user?.name}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <PageHeader
        title="Admin Dashboard"
        description="Manage your air cargo operations, flights, bookings, and system settings"
        backgroundImage="/images/admin-header.jpg"
      />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Flights</CardTitle>
                  <Plane className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{flights.length}</div>
                  <p className="text-xs text-muted-foreground">Active routes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">On Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {flights.filter((f) => f.status === "On Time").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Flights on schedule</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Delayed</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {flights.filter((f) => f.status === "Delayed").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Flights delayed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Flights</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Flight BA001 departed on time</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New booking received for SH002</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Flight GZ003 arrived safely</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timetable Management */}
          <TabsContent value="timetable" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Add New Flight */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Flight
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="flight-id">Flight ID</Label>
                      <Input
                        id="flight-id"
                        value={newFlight.id}
                        onChange={(e) => setNewFlight({ ...newFlight, id: e.target.value })}
                        placeholder="e.g., BA001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="route">Route</Label>
                      <Input
                        id="route"
                        value={newFlight.route}
                        onChange={(e) => setNewFlight({ ...newFlight, route: e.target.value })}
                        placeholder="e.g., Beijing → Dar es Salaam"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="departure">Departure Time</Label>
                      <Input
                        id="departure"
                        value={newFlight.departure}
                        onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })}
                        placeholder="e.g., 08:00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="arrival">Arrival Time</Label>
                      <Input
                        id="arrival"
                        value={newFlight.arrival}
                        onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })}
                        placeholder="e.g., 18:30"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={newFlight.duration}
                      onChange={(e) => setNewFlight({ ...newFlight, duration: e.target.value })}
                      placeholder="e.g., 10h 30m"
                    />
                  </div>

                  <Button onClick={handleAddFlight} className="w-full bg-orange-500 hover:bg-orange-600">
                    Add Flight
                  </Button>
                </CardContent>
              </Card>

              {/* Flight Status Updates */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Status Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {flights.map((flight) => (
                      <div key={flight.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">{flight.id}</p>
                          <p className="text-sm text-gray-600">{flight.route}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={flight.status === "On Time" ? "default" : "destructive"}
                            className={flight.status === "On Time" ? "bg-green-500" : ""}
                          >
                            {flight.status}
                          </Badge>
                          <Select onValueChange={(value) => handleUpdateFlightStatus(flight.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Update" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="On Time">On Time</SelectItem>
                              <SelectItem value="Delayed">Delayed</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Flight List */}
            <Card>
              <CardHeader>
                <CardTitle>Current Flight Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Flight ID</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Departure</TableHead>
                      <TableHead>Arrival</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flights.map((flight) => (
                      <TableRow key={flight.id}>
                        <TableCell className="font-medium">{flight.id}</TableCell>
                        <TableCell>{flight.route}</TableCell>
                        <TableCell>{flight.departure_time}</TableCell>
                        <TableCell>{flight.arrival_time}</TableCell>
                        <TableCell>{flight.duration}</TableCell>
                        <TableCell>
                          <Badge
                            variant={flight.status === "On Time" ? "default" : "destructive"}
                            className={flight.status === "On Time" ? "bg-green-500" : ""}
                          >
                            {flight.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteFlight(flight.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Flight</TableHead>
                      <TableHead>Cargo Type</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">BK001</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>BA001</TableCell>
                      <TableCell>Electronics</TableCell>
                      <TableCell>50kg</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500">Confirmed</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">BK002</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>SH002</TableCell>
                      <TableCell>Textiles</TableCell>
                      <TableCell>75kg</TableCell>
                      <TableCell>
                        <Badge className="bg-orange-500">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">BK003</TableCell>
                      <TableCell>Mike Johnson</TableCell>
                      <TableCell>GZ003</TableCell>
                      <TableCell>Machinery</TableCell>
                      <TableCell>120kg</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Delivered</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Best Air Cargo" />
                  </div>
                  <div>
                    <Label htmlFor="company-email">Email</Label>
                    <Input id="company-email" defaultValue="info@bestcargo.com" />
                  </div>
                  <div>
                    <Label htmlFor="company-phone">Phone</Label>
                    <Input id="company-phone" defaultValue="+255 123 456 789" />
                  </div>
                  <div>
                    <Label htmlFor="company-address">Address</Label>
                    <Textarea id="company-address" defaultValue="123 Cargo Street, Dar es Salaam, Tanzania" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                        <SelectItem value="cst">China Standard Time (CST)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tzs">Tanzanian Shilling (TZS)</SelectItem>
                        <SelectItem value="usd">US Dollar (USD)</SelectItem>
                        <SelectItem value="cny">Chinese Yuan (CNY)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notifications">Email Notifications</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All notifications</SelectItem>
                        <SelectItem value="important">Important only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-teal-500 hover:bg-teal-600">Update Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminContent />
    </ProtectedRoute>
  )
}
