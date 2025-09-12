// app/api/documents/[id]/route.ts
import { NextResponse } from "next/server";
import { API_URL } from "@/app/config/config";

// GET single document
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${API_URL}/documents/${params.id}`, {
      method: "GET",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch document" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET document error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT update document
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const res = await fetch(`${API_URL}/documents/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to update document" }, { status: res.status });
    }

    const updated = await res.json();
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT document error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
