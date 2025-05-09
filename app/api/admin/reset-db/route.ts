import { NextResponse } from "next/server";
import { resetDatabase } from "@/lib/db";

// This route is for development purposes only
export async function POST() {
  try {
    // Only allow this in development environment
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "This endpoint is only available in development mode" },
        { status: 403 }
      );
    }

    await resetDatabase();
    
    return NextResponse.json({ success: true, message: "Database reset successful" });
  } catch (error) {
    console.error("Error resetting database:", error);
    return NextResponse.json(
      { error: "Failed to reset database" },
      { status: 500 }
    );
  }
} 
