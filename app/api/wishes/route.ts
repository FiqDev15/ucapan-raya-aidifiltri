import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json({ wishes: data ?? [] });
  } catch (error) {
    console.error("Error fetching wishes:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, message } = body;

    if (!username || !message) {
      return NextResponse.json(
        { error: "Username and message are required" },
        { status: 400 }
      );
    }

    if (username.trim().length < 2) {
      return NextResponse.json(
        { error: "Username must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters" },
        { status: 400 }
      );
    }

    if (username.trim().length > 50) {
      return NextResponse.json(
        { error: "Username must be at most 50 characters" },
        { status: 400 }
      );
    }

    if (message.trim().length > 500) {
      return NextResponse.json(
        { error: "Message must be at most 500 characters" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("wishes")
      .insert([
        {
          username: username.trim(),
          message: message.trim(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ wish: data }, { status: 201 });
  } catch (error) {
    console.error("Error creating wish:", error);
    return NextResponse.json(
      { error: "Failed to save your wish" },
      { status: 500 }
    );
  }
}
