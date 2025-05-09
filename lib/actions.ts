"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type { SymptomEntry } from "@/lib/types";
import { auth } from "@/lib/auth-utils";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { redirect } from "next/navigation";

interface EntryResponse {
  success: boolean;
  entry?: SymptomEntry;
  error?: string;
  count?: number;
}

interface LocationData {
  lat: number;
  lng: number;
}

// Validate the entry data
const entrySchema = z.object({
  date: z.string(),
  sneezing: z.number().min(0).max(10),
  itchyEyes: z.number().min(0).max(10),
  congestion: z.number().min(0).max(10),
  headache: z.number().min(0).max(10),
  medications: z.array(z.string()),
  medicationEffectiveness: z.enum(["not_effective", "somewhat_effective", "very_effective", "n/a"]),
  outdoorTime: z.number().min(0).nullable().optional(),
  activities: z.array(z.string()),
  notes: z.string().nullable().optional(),
  locationLat: z.number().nullable().optional(),
  locationLng: z.number().nullable().optional(),
  locationAddress: z.string().nullable().optional(),
  pollenTypes: z.array(z.string()).optional().default([]),
});

// Helper function to check authentication
async function checkAuth() {
  try {
    console.log("checkAuth: Getting session");
    const session = await auth();
    console.log("checkAuth: Session obtained:", session ? "Yes" : "No");
    
    if (!session) {
      console.log("checkAuth: No session found");
      throw new Error("Not authenticated");
    }
    
    if (!session.user) {
      console.log("checkAuth: Session has no user object");
      throw new Error("Not authenticated");
    }
    
    if (!session.user.id) {
      console.log("checkAuth: User has no ID");
      throw new Error("User ID not found");
    }
    
    console.log("checkAuth: Authentication successful, userId:", session.user.id);
    return session.user.id;
  } catch (error) {
    console.error("checkAuth: Authentication error:", error);
    throw new Error("Not authenticated");
  }
}

export async function addEntry(formData: FormData): Promise<EntryResponse> {
  try {
    // Log the start of the function
    console.log("addEntry: Starting entry submission");
    
    // Authenticate the user
    let userId;
    try {
      userId = await checkAuth();
      console.log("addEntry: User authenticated, userId:", userId);
    } catch (authError) {
      console.error("addEntry: Authentication error:", authError);
      throw authError;
    }
    
    // Parse form data
    console.log("addEntry: Parsing form data");
    const dateStr = formData.get("date") as string;
    const date = new Date(dateStr);
    console.log("addEntry: Date parsed as:", date);
    
    const sneezing = parseFloat(formData.get("sneezing") as string);
    const itchyEyes = parseFloat(formData.get("itchy_eyes") as string);
    const congestion = parseFloat(formData.get("congestion") as string);
    const headache = parseFloat(formData.get("headache") as string);

    // Log symptom values
    console.log("addEntry: Symptom values:", {
      sneezing,
      itchyEyes,
      congestion,
      headache
    });

    const medications = Array.from(formData.getAll("medication")) as string[];
    const medicationEffectiveness = formData.get("medication_effectiveness") as string;
    console.log("addEntry: Medications:", medications);
    console.log("addEntry: Medication effectiveness:", medicationEffectiveness);

    const activities = Array.from(formData.getAll("activities")) as string[];
    const outdoorTime = parseFloat(formData.get("outdoor_time") as string);
    const notes = formData.get("notes") as string;
    console.log("addEntry: Activities:", activities);
    console.log("addEntry: Outdoor time:", outdoorTime);

    const locationLat = formData.get("location_lat")
      ? parseFloat(formData.get("location_lat") as string)
      : null;
    const locationLng = formData.get("location_lng")
      ? parseFloat(formData.get("location_lng") as string)
      : null;
    const locationAddress = (formData.get("location_address") as string) || null;
    console.log("addEntry: Location:", { locationLat, locationLng, locationAddress });

    // Validate the data
    console.log("addEntry: Validating data");
    let validatedData;
    try {
      validatedData = entrySchema.parse({
        date: dateStr,
        sneezing,
        itchyEyes,
        congestion,
        headache,
        medications,
        medicationEffectiveness,
        outdoorTime: isNaN(outdoorTime) ? null : outdoorTime,
        activities,
        notes: notes || null,
        locationLat,
        locationLng,
        locationAddress,
        pollenTypes: [],
      });
      console.log("addEntry: Data validation successful");
    } catch (validationError) {
      console.error("addEntry: Validation error:", validationError);
      throw validationError;
    }

    // Create the entry
    console.log("addEntry: Creating database entry");
    
    const dbData = {
      date,
      userId,
      sneezing,
      itchyEyes,
      congestion,
      headache,
      medications: JSON.stringify(medications),
      medicationEffectiveness,
      outdoorTime: isNaN(outdoorTime) ? null : outdoorTime,
      activities: JSON.stringify(activities),
      notes: notes || null,
      locationLat,
      locationLng,
      locationAddress,
      pollenTypes: JSON.stringify(validatedData.pollenTypes),
    };
    console.log("addEntry: Database data:", dbData);
    
    let entry;
    try {
      entry = await prisma.hayfeverEntry.create({ data: dbData });
      console.log("addEntry: Database entry created successfully:", entry.id);
    } catch (dbError) {
      console.error("addEntry: Database error:", dbError);
      throw new Error(`Database error: ${dbError.message || "Unknown database error"}`);
    }

    // Revalidate the home page to show the new entry
    console.log("addEntry: Revalidating paths");
    revalidatePath("/");

    console.log("addEntry: Returning success response");
    return {
      success: true,
      entry: {
        id: entry.id,
        date: entry.date,
        sneezing: entry.sneezing,
        itchyEyes: entry.itchyEyes,
        congestion: entry.congestion,
        headache: entry.headache,
        medications: JSON.parse(entry.medications) as string[],
        medicationEffectiveness: entry.medicationEffectiveness as
          | "not_effective"
          | "somewhat_effective"
          | "very_effective",
        notes: entry.notes || undefined,
        activities: JSON.parse(entry.activities) as string[],
      },
    };
  } catch (error) {
    console.error("Error adding entry:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid data: " + error.message };
    }
    if (error instanceof Error && error.message === "Not authenticated") {
      redirect("/auth/signin");
    }
    return { 
      success: false, 
      error: error instanceof Error 
        ? `Failed to add entry: ${error.message}` 
        : "Failed to add entry" 
    };
  }
}

export async function getUserEntries(): Promise<SymptomEntry[]> {
  try {
    // Get the authenticated user ID
    const userId = await checkAuth();

    // Get entries for the authenticated user
    const entries = await prisma.hayfeverEntry.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    return entries.map((entry) => {
      let medications: string[] = [];
      let activities: string[] = [];

      try {
        medications = JSON.parse(entry.medications) as string[];
      } catch (error) {
        console.error("Error parsing medications JSON:", error);
      }

      try {
        activities = JSON.parse(entry.activities) as string[];
      } catch (error) {
        console.error("Error parsing activities JSON:", error);
      }

      return {
        id: entry.id,
        date: new Date(entry.date),
        sneezing: entry.sneezing,
        itchyEyes: entry.itchyEyes,
        congestion: entry.congestion,
        headache: entry.headache,
        medications,
        medicationEffectiveness: entry.medicationEffectiveness as
          | "not_effective"
          | "somewhat_effective"
          | "very_effective",
        notes: entry.notes || undefined,
        pollenCount: entry.pollenCount || null,
        activities,
      };
    });
  } catch (error) {
    console.error("Error fetching entries:", error);
    if (error instanceof Error && error.message === "Not authenticated") {
      redirect("/auth/signin");
    }
    return [];
  }
}

export async function getRecentEntries(limit = 3): Promise<SymptomEntry[]> {
  try {
    // Get the authenticated user ID
    const userId = await checkAuth();

    // Get recent entries for the authenticated user
    const entries = await prisma.hayfeverEntry.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: limit,
    });

    return entries.map((entry) => {
      let medications: string[] = [];
      let activities: string[] = [];

      try {
        medications = JSON.parse(entry.medications) as string[];
      } catch (error) {
        console.error("Error parsing medications JSON:", error);
      }

      try {
        activities = JSON.parse(entry.activities) as string[];
      } catch (error) {
        console.error("Error parsing activities JSON:", error);
      }

      return {
        id: entry.id,
        date: new Date(entry.date),
        sneezing: entry.sneezing,
        itchyEyes: entry.itchyEyes,
        congestion: entry.congestion,
        headache: entry.headache,
        medications,
        medicationEffectiveness: entry.medicationEffectiveness as
          | "not_effective"
          | "somewhat_effective"
          | "very_effective",
        notes: entry.notes || undefined,
        activities,
        pollenCount: entry.pollenCount || null,
      };
    });
  } catch (error) {
    console.error("Error fetching recent entries:", error);
    if (error instanceof Error && error.message === "Not authenticated") {
      redirect("/auth/signin");
    }
    return [];
  }
}

export async function saveUserLocation(
  location: LocationData
): Promise<EntryResponse> {
  try {
    // This endpoint doesn't directly create an entry, so we'll just return success
    return { success: true };
  } catch (error) {
    console.error("Error saving location:", error);
    return { success: false, error: "Failed to save location" };
  }
}

// Admin function to clear all entries - development only
export async function clearAllEntries(): Promise<EntryResponse> {
  try {
    // Only allow this in development
    if (process.env.NODE_ENV !== "development") {
      return { 
        success: false, 
        error: "This operation is only allowed in development environment" 
      };
    }

    const deleted = await prisma.hayfeverEntry.deleteMany({});
    revalidatePath("/");
    return { success: true, count: deleted.count };
  } catch (error) {
    console.error("Error clearing entries:", error);
    return { success: false, error: "Failed to clear entries" };
  }
}

// For admin/debug use only
export async function getAllEntriesAdmin(): Promise<SymptomEntry[]> {
  try {
    // Only allow in development
    if (process.env.NODE_ENV !== "development") {
      return [];
    }
    
    const entries = await prisma.hayfeverEntry.findMany({
      orderBy: { date: "desc" },
    });

    return entries.map((entry) => {
      let medications: string[] = [];
      let activities: string[] = [];

      try {
        medications = JSON.parse(entry.medications) as string[];
      } catch (error) {
        console.error("Error parsing medications JSON:", error);
      }

      try {
        activities = JSON.parse(entry.activities) as string[];
      } catch (error) {
        console.error("Error parsing activities JSON:", error);
      }

      return {
        id: entry.id,
        date: new Date(entry.date),
        sneezing: entry.sneezing,
        itchyEyes: entry.itchyEyes,
        congestion: entry.congestion,
        headache: entry.headache,
        medications,
        medicationEffectiveness: entry.medicationEffectiveness as
          | "not_effective"
          | "somewhat_effective"
          | "very_effective",
        notes: entry.notes || undefined,
        pollenCount: entry.pollenCount || null,
        activities,
      };
    });
  } catch (error) {
    console.error("Error fetching all entries:", error);
    return [];
  }
}
