import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth-utils";
import { HayfeverEntry } from "@prisma/client";

export async function GET(): Promise<NextResponse> {
  try {
    // Only allow in development
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "This endpoint is only available in development" },
        { status: 403 }
      );
    }

    // Get the authenticated user
    const session = await auth();
    const userId = session?.user?.id;

    // Return info about authentication status and counts
    const userCount = await prisma.user.count();
    const totalEntryCount = await prisma.hayfeverEntry.count();

    // Get user-specific entries if authenticated
    let userEntries: HayfeverEntry[] = [];
    let userEntryCount = 0;

    if (userId) {
      userEntryCount = await prisma.hayfeverEntry.count({
        where: { userId },
      });

      // Get the most recent entries for the user
      userEntries = await prisma.hayfeverEntry.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      });
    }

    // Get database statistics
    const tables = await prisma.$queryRaw<
      Array<{ table_name: string; row_count: bigint }>
    >`
      SELECT 
        table_name,
        (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = t.table_name) as row_count
      FROM information_schema.tables t 
      WHERE table_schema = 'public'
    `;

    return NextResponse.json({
      auth: {
        isAuthenticated: !!session,
        userId: userId || null,
        userEmail: session?.user?.email || null,
      },
      counts: {
        users: userCount,
        totalEntries: totalEntryCount,
        userEntries: userEntryCount,
      },
      userEntries,
      tables: tables.map((t) => ({
        name: t.table_name,
        rowCount: Number(t.row_count),
      })),
    });
  } catch (error) {
    console.error("DB debug error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to check database", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to check database", details: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
