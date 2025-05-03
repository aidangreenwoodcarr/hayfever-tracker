"use server";

import { cookies } from "next/headers";

// Types for pollen data
export interface PollenData {
  type: string;
  level: "Low" | "Moderate" | "High" | "Very High";
  value: number;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

// Get the user's saved location from cookies
export async function getUserLocation(): Promise<Location | null> {
  const cookieStore = cookies();
  const locationCookie = (await cookieStore).get("user-location");

  if (!locationCookie?.value) {
    return null;
  }

  try {
    return JSON.parse(locationCookie.value) as Location;
  } catch (error) {
    console.error("Error parsing location cookie:", error);
    return null;
  }
}

// Determine pollen level based on value
function getPollenLevel(
  value: number
): "Low" | "Moderate" | "High" | "Very High" {
  if (value < 2) return "Low";
  if (value < 3.5) return "Moderate";
  if (value < 4.5) return "High";
  return "Very High";
}

// Get pollen data from our secure API endpoint
export async function getPollenData(
  location: Location | null
): Promise<PollenData[]> {
  // If no location is provided, use a default location (London)
  if (!location) {
    location = { lat: 51.5074, lng: -0.1278 };
  }

  try {
    const response = await fetch(
      `/api/pollen?lat=${location.lat}&lng=${location.lng}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pollen data: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching pollen data:", error);
    throw error;
  }
}

// Get overall pollen level
export async function getOverallPollenLevel(pollenData: PollenData[]): Promise<{
  level: "Low" | "Moderate" | "High" | "Very High";
  value: number;
}> {
  if (!pollenData.length) {
    return { level: "Low", value: 0 };
  }

  // Calculate average pollen value
  const sum = pollenData.reduce((acc, item) => acc + item.value, 0);
  const average = Number.parseFloat((sum / pollenData.length).toFixed(1));

  return {
    level: getPollenLevel(average),
    value: average,
  };
}

// Mock data for fallback or development
function getMockPollenData(): PollenData[] {
  return [
    {
      type: "Tree",
      level: "High",
      value: 4.2,
    },
    {
      type: "Grass",
      level: "Moderate",
      value: 3.1,
    },
    {
      type: "Weed",
      level: "Low",
      value: 1.5,
    },
    {
      type: "Mold",
      level: "Low",
      value: 1.2,
    },
  ];
}
