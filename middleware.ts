import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export function middleware(request: NextRequest): NextResponse {
  // Only apply to API routes
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const ip = request.nextUrl.searchParams.get("ip") ?? "anonymous";
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  // Clean up old entries
  for (const [key, value] of rateLimit.entries()) {
    if (value.resetTime < windowStart) {
      rateLimit.delete(key);
    }
  }

  // Get or create rate limit entry
  const rateLimitInfo = rateLimit.get(ip) ?? { count: 0, resetTime: now };

  // Check if rate limit exceeded
  if (rateLimitInfo.count >= MAX_REQUESTS) {
    return new NextResponse(
      JSON.stringify({
        error: "Too many requests",
        message: "Please try again later",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      }
    );
  }

  // Update rate limit
  rateLimit.set(ip, {
    count: rateLimitInfo.count + 1,
    resetTime: now,
  });

  // Add security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
