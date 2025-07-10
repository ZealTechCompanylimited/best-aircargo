import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

// GET all flights
export async function GET() {
  try {
    const { data: flights, error } = await supabaseServer
      .from("flights")
      .select("*")
      .order("departure_time");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(flights);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST a new flight
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      route,
      departure_time,
      arrival_time,
      operating_days,
      status,
      duration,
    } = body;

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
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(flight, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT - Update flight by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      status,
      route,
      departure_time,
      arrival_time,
      operating_days,
      duration,
    } = body;

    const { data: flight, error } = await supabaseServer
      .from("flights")
      .update({
        status,
        route,
        departure_time,
        arrival_time,
        operating_days,
        duration,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(flight);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Delete flight by ID
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabaseServer.from("flights").delete().eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Flight deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
