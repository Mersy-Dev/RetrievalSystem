// app/api/documents/upload/route.ts
import { NextResponse } from "next/server";
import { API_URL } from "@/app/config/config";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Read the formData from request
    const formData = await req.formData();

    // Forward the request to your backend API
    const response = await fetch(`${API_URL}/documents/upload`, {
      method: "POST",
      body: formData, // pass along the formData directly
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData?.error || "Failed to upload document" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        message: "Document uploaded successfully.",
        document: data.document,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to upload document.", details: errorMessage },
      { status: 500 }
    );
  }
}
