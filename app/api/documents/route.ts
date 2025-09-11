import { API_URL } from "@/app/config/config";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(`${API_URL}/documents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // ensure fresh data
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch documents." },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        message: "Document fetching successfully.",
        documents: data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch document.", details: errorMessage },
      { status: 500 }
    );
  }
}
