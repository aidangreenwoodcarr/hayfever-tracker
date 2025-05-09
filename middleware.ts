import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Public endpoints that don't need authentication
  const publicPaths = [
    "/api/auth",
    "/api/geocode",
    "/api/pollen",
    "/auth/signin",
    "/auth/error",
    "/api/auth/reset-cookies",
    "/api/auth/session",
  ];

  // Check if the current path matches any public paths
  if (
    publicPaths.some(
      (path) =>
        request.nextUrl.pathname === path ||
        request.nextUrl.pathname.startsWith(path + "/")
    )
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // If the user isn't authenticated and accessing an API route
  if (request.nextUrl.pathname.startsWith("/api/") && !token) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication required", status: 401 }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Protect private pages
  const privatePaths = ["/profile", "/dashboard", "/add-entry", "/history"];
  if (
    privatePaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
    !token
  ) {
    // Let the client-side handle authentication redirects
    // This allows the auth-check component to show a nicer UI before redirecting
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/add-entry",
    "/add-entry/:path*",
    "/auth/:path*",
    "/history/:path*",
  ],
};
