import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Skip authentication for public endpoints
  if (request.nextUrl.pathname.startsWith("/api/geocode") || 
      request.nextUrl.pathname.startsWith("/api/pollen") ||
      request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  const token = await getToken({ 
    req: request, 
    secret: process.env.AUTH_SECRET 
  })

  // If the user isn't authenticated and accessing an API route
  if (request.nextUrl.pathname.startsWith("/api/") && !token) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication required" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    )
  }

  // Protect private pages (you can add more paths as needed)
  const privatePaths = ["/profile", "/dashboard", "/add-entry"]
  if (privatePaths.some(path => request.nextUrl.pathname.startsWith(path)) && !token) {
    const url = new URL("/auth/signin", request.url)
    url.searchParams.set("callbackUrl", request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/api/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/add-entry",
    "/add-entry/:path*",
  ],
}
