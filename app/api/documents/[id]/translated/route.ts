// import { NextRequest } from "next/server";

// import { API_URL } from "@/app/config/config";

// // ✅ GET translated document
// export async function GET(
//   req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params; // ✅ await params

//     const res = await fetch(`${API_URL}/translations/document/${id}?lang=yo&download=true`, {
//       method: "GET",
//     });

//     const data = await res.json();

//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : "Unknown error";
//     return new Response(JSON.stringify({ error: message }), { status: 500 });
//   }
// }

import { NextRequest } from "next/server";
import { API_URL } from "@/app/config/config";

// ✅ GET translated document (PDF)
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const backendRes = await fetch(
      `${API_URL}/translations/document/${id}?lang=yo&download=true`,
      { method: "GET" }
    );

    // If backend returns PDF, we just stream it
    const contentType =
      backendRes.headers.get("content-type") || "application/pdf";
    const buffer = await backendRes.arrayBuffer(); // 👈 Get binary data

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "attachment; filename=translated_document.pdf",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
