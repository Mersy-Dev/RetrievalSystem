import { API_URL } from "@/app/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Call backend API
    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: "Invalid credentials",
      }));
      return NextResponse.json(
        { message: errorData.message || "Login failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Create response
    const nextResponse = NextResponse.json(
      {
        message: data.message || "Login successful",
        token: data.accessToken, // Backend returns accessToken
        user: {
          id: data.user.id.toString(), // Convert to string for consistency
          name: data.user.name,
          email: data.user.email,
          role: "admin",
          isEmailVerified: data.user.isEmailVerified, // Include email verification status
          createdAt: data.user.createdAt,
        },
      },
      { status: 200 }
    );

    // Set httpOnly cookie for access token
    nextResponse.cookies.set({
      name: "auth-token",
      value: data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes (matches backend access token expiry)
      path: "/",
    });

    // Forward backend's refreshToken cookie
    const backendCookies = response.headers.get("set-cookie");
    if (backendCookies) {
      // Backend already sets the refreshToken cookie
      nextResponse.headers.append("set-cookie", backendCookies);
    }

    return nextResponse;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to login", details: errorMessage },
      { status: 500 }
    );
  }
}