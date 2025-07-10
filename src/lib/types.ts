// Database types
export interface Flight {
  id: string
  route: string
  departure_time: string
  arrival_time: string
  operating_days: string[]
  status: string
  duration: string
  created_at?: string
  updated_at?: string
}

export interface Booking {
  id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  flight_id: string
  cargo_type: string
  cargo_weight: number
  cargo_description?: string
  pickup_address?: string
  delivery_address?: string
  status: string
  booking_date: string
  estimated_delivery?: string
  tracking_number: string
  total_cost?: number
  created_at: string
  updated_at: string
  flights?: Flight
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  status: string
  created_at: string
}

export interface Quote {
  id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  origin: string
  destination: string
  cargo_type: string
  cargo_weight: number
  cargo_dimensions?: string
  service_type: string
  estimated_cost?: number
  status: string
  valid_until: string
  created_at: string
}

// Tracking types
export interface TrackingEvent {
  status: string
  location: string
  date: string
  time: string
  completed: boolean
}

export interface TrackingResult {
  trackingNumber: string
  status: string
  currentLocation: string
  estimatedDelivery: string
  timeline: TrackingEvent[]
}
