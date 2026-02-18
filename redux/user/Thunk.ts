import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./Slice";

// Types for API requests
interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// Helper function to handle errors
const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong. Please try again.";
};

// Login User Thunk
export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || data.error || "Login failed");
    }

    // Store token in localStorage or sessionStorage
    if (credentials.rememberMe) {
      localStorage.setItem("authToken", data.token);
    } else {
      sessionStorage.setItem("authToken", data.token);
    }

    return {
      user: data.user,
      token: data.token,
      message: data.message,
    };
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

// Signup User Thunk
export const signupUser = createAsyncThunk<
  { message: string },
  SignupData,
  { rejectValue: string }
>("auth/signup", async (signupData, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        confirmPassword: signupData.confirmPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || data.error || "Signup failed");
    }

    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

// Logout User Thunk
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Call logout API
      await fetch("/api/users/logout", {
        method: "POST",
      });

      // Clear tokens from storage
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

// Refresh Token Thunk
export const refreshToken = createAsyncThunk<
  { token: string },
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/users/refresh-token", {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(
        data.message || data.error || "Token refresh failed",
      );
    }

    // Update stored token
    const existingToken = localStorage.getItem("authToken");
    if (existingToken) {
      localStorage.setItem("authToken", data.token);
    } else {
      sessionStorage.setItem("authToken", data.token);
    }

    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

// Check Auth (verify existing token)
export const checkAuth = createAsyncThunk<
  AuthResponse | null,
  void,
  { rejectValue: string }
>("auth/checkAuth", async (_, { rejectWithValue, dispatch }) => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      return null;
    }

    // Try to refresh token to get user data
    try {
      await dispatch(refreshToken()).unwrap();

      // Decode token to get user info
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));

      // Check if token is expired
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        return null;
      }

      return {
        user: {
          id: payload.adminId?.toString() || payload.userId,
          name: "Admin User", // Backend doesn't return user on refresh
          email: payload.email || "",
          role: "admin",
        },
        token,
        message: "Token valid",
      };
    } catch (error) {
      // Refresh failed, clear tokens
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      return rejectWithValue(handleError(error));
    }
  } catch (error) {
    // Refresh failed, clear tokens
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    return rejectWithValue(handleError(error));
  }
});

// Verify Email Thunk
export const verifyEmail = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>("auth/verifyEmail", async (token, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/users/verify-email/${token}`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(
        data.message || data.error || "Email verification failed",
      );
    }

    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

// Request Password Reset Thunk
export const requestPasswordReset = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>("auth/requestPasswordReset", async (email, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/users/request-password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || data.error || "Request failed");
    }

    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

// Reset Password Thunk
export const resetPassword = createAsyncThunk<
  { message: string },
  { token: string; newPassword: string; confirmPassword?: string },
  { rejectValue: string }
>(
  "auth/resetPassword",
  async ({ token, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || data.error || "Password reset failed",
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);
