import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET() {
  try {
    const { data: bookings, error } = await supabaseServer
      .from("bookings")
      .select(`
        *,
        flights (
          id,
          route,
          departure_time,
          arrival_time
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(bookings)
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      customer_name,
      customer_email,
      customer_phone,
      flight_id,
      cargo_type,
      cargo_weight,
      cargo_description,
      pickup_address,
      delivery_address,
    } = body

    // Generate tracking number
    const tracking_number = `BAC${Date.now().toString().slice(-8)}`

    const { data: booking, error } = await supabaseServer
      .from("bookings")
      .insert([
        {
          customer_name,
          customer_email,
          customer_phone,
          flight_id,
          cargo_type,
          cargo_weight,
          cargo_description,
          pickup_address,
          delivery_address,
          tracking_number,
          status: "Pending",
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(booking, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}