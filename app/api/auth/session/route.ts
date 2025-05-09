import { auth } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// For debugging auth issues - only works in development
export async function GET(): Promise<NextResponse> {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  const session = await auth();

  return NextResponse.json({
    authenticated: !!session,
    session: session
      ? {
          ...session,
          // Remove sensitive info
          user: session.user
            ? {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
              }
            : null,
        }
      : null,
  });
}
