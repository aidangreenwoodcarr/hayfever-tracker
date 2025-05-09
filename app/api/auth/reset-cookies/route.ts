import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This is a development-only utility to reset all auth-related cookies
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  const cookieStore = cookies();
  const authCookies = [
    // Standard names (development)
    "next-auth.session-token",
    "next-auth.csrf-token",
    "next-auth.callback-url",
    // Secure prefixes (production)
    "__Secure-next-auth.session-token",
    "__Host-next-auth.csrf-token",
    "__Secure-next-auth.callback-url",
    // Other possible cookies
    "next-auth.pkce.code_verifier",
    "__Secure-next-auth.pkce.code_verifier"
  ];

  // Delete all auth cookies
  const deleted = [];
  for (const name of authCookies) {
    try {
      cookieStore.delete(name);
      deleted.push(name);
    } catch (e) {
      console.error(`Error deleting cookie ${name}:`, e);
    }
  }

  return NextResponse.json({ 
    success: true, 
    message: "Auth cookies cleared",
    clearedCookies: deleted 
  });
} 
