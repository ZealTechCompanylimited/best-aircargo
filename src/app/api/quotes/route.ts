import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      customer_name,
      customer_email,
      customer_phone,
      origin,
      destination,
      cargo_type,
      cargo_weight,
      cargo_dimensions,
      service_type,
    } = body

    // Calculate estimated cost (simplified calculation)
    const baseRate = 5 // $5 per kg
    const estimated_cost = cargo_weight * baseRate

    // Set quote validity (30 days from now)
    const valid_until = new Date()
    valid_until.setDate(valid_until.getDate() + 30)

    const { data: quote, error } = await supabaseServer
      .from("quotes")
      .insert([
        {
          customer_name,
          customer_email,
          customer_phone,
          origin,
          destination,
          cargo_type,
          cargo_weight,
          cargo_dimensions,
          service_type,
          estimated_cost,
          valid_until: valid_until.toISOString().split("T")[0],
          status: "Pending",
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data: quotes, error } = await supabaseServer
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(quotes)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}