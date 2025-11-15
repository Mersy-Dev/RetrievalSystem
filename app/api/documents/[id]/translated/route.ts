import { NextRequest } from "next/server";

import { API_URL } from "@/app/config/config";

// ✅ GET translated document
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params

    const res = await fetch(`${API_URL}/translations/document/${id}?lang=yo`, {
      method: "GET",
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}

