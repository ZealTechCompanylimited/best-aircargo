import { NextResponse, NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { status, route, departure_time, arrival_time, operating_days, duration } = body;

    const id = request.nextUrl.pathname.split("/").pop(); // Extract [id] from URL

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
      .eq("id", id)
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

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/").pop(); // Extract [id] from URL

    const { error } = await supabaseServer.from("flights").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Flight deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
