import { API_URL } from "@/app/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get refresh token from cookie
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // Call backend logout endpoint
    if (refreshToken) {
      try {
        const response = await fetch(`${API_URL}/admin/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `refreshToken=${refreshToken}`,
          },
          cache: "no-store",
        });

        // Don't fail if backend logout fails
        if (!response.ok) {
          console.error("Backend logout failed");
        }
      } catch (error) {
        console.error("Error calling backend logout:", error);
      }
    }

    // Create response
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Clear both auth-token and refreshToken cookies
    response.cookies.set({
      name: "auth-token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    response.cookies.set({
      name: "refreshToken",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to logout", details: errorMessage },
      { status: 500 }
    );
  }
}