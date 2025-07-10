import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET() {
  try {
    const { data: flights, error } = await supabaseServer.from("flights").select("*").order("departure_time")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(flights)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, route, departure_time, arrival_time, operating_days, status, duration } = body

    const { data: flight, error } = await supabaseServer
      .from("flights")
      .insert([
        {
          id,
          route,
          departure_time,
          arrival_time,
          operating_days,
          status: status || "On Time",
          duration,
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(flight, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
