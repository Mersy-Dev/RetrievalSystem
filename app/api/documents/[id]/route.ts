// app/api/documents/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { API_URL } from "@/app/config/config";

// ✅ GET single document
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await the params

    const res = await fetch(`${API_URL}/documents/${id}`, {
      method: "GET",
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
    console.log(data);
    
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}



// ✅ PUT update document
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

// ✅ DELETE document
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${API_URL}/documents/${params.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to delete document" }, { status: res.status });
    }

    const deleted = await res.json();
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE document error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
