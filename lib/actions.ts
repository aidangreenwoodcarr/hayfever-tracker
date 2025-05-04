"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type { SymptomEntry } from "@/lib/types";

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

export async function addEntry(formData: FormData): Promise<EntryResponse> {
  try {
    // Parse the date correctly - this was causing the 1/1/1970 issue
    const dateStr = formData.get("date") as string;
    const date = new Date(dateStr);

    // Get symptom values and parse as floats
    const sneezing = parseFloat(formData.get("sneezing") as string);
    const itchyEyes = parseFloat(formData.get("itchy_eyes") as string);
    const congestion = parseFloat(formData.get("congestion") as string);
    const headache = parseFloat(formData.get("headache") as string);

    // Get medications
    const medications = Array.from(formData.getAll("medication")) as string[];
    const medicationEffectiveness = formData.get(
      "medication_effectiveness"
    ) as string;

    // Get activities
    const activities = Array.from(formData.getAll("activities")) as string[];
    const outdoorTime = parseFloat(formData.get("outdoor_time") as string);
    const notes = formData.get("notes") as string;

    // Get location data
    const locationLat = formData.get("location_lat")
      ? parseFloat(formData.get("location_lat") as string)
      : null;
    const locationLng = formData.get("location_lng")
      ? parseFloat(formData.get("location_lng") as string)
      : null;
    const locationAddress =
      (formData.get("location_address") as string) || null;

    const entry = await prisma.hayfeverEntry.create({
      data: {
        date,
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
      },
    });

    // Revalidate the home page to show the new entry
    revalidatePath("/");

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
        activities: [],
      },
    };
  } catch (error) {
    console.error("Error adding entry:", error);
    return { success: false, error: "Failed to add entry" };
  }
}

export async function getAllEntries(): Promise<SymptomEntry[]> {
  const entries = await prisma.hayfeverEntry.findMany({
    orderBy: {
      date: "desc",
    },
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
}

export async function getRecentEntries(limit = 3): Promise<SymptomEntry[]> {
  const entries = await prisma.hayfeverEntry.findMany({
    orderBy: {
      date: "desc",
    },
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
    };
  });
}

export async function saveUserLocation(
  location: LocationData
): Promise<EntryResponse> {
  try {
    const cookiesInstance = await cookies();
    cookiesInstance.set({
      name: "user-location",
      value: JSON.stringify(location),
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error saving location:", error);
    return { success: false, error: "Failed to save location" };
  }
}

export async function clearAllEntries(): Promise<EntryResponse> {
  try {
    const { count } = await prisma.hayfeverEntry.deleteMany({});

    revalidatePath("/");
    revalidatePath("/history");

    console.log(`Successfully deleted ${count} entries`);
    return { success: true, count };
  } catch (error) {
    console.error("Error clearing database:", error);
    return { success: false, error: "Failed to clear database" };
  }
}
