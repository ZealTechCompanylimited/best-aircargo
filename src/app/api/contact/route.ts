import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    const { data: contact, error } = await supabaseServer
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          phone,
          service,
          message,
          status: "New",
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error("Contact POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data: messages, error } = await supabaseServer
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Contact GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}