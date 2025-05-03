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

// Get pollen data from Google Maps Platform or fallback
export async function getPollenData(
  location: Location | null
): Promise<PollenData[]> {
  // If no location is provided, use a default location (London)
  if (!location) {
    location = { lat: 51.5074, lng: -0.1278 };
  }

  try {
    // Check if we have a Google Maps API key
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.warn("Google Maps API key is not configured. Using mock data.");
      return getMockPollenData();
    }

    // Try to fetch data from Google Maps Pollen API
    const pollenData = await fetchGooglePollenData(location, apiKey);
    return pollenData;
  } catch (error) {
    console.error("Error fetching pollen data:", error);

    // Always fall back to mock data if there's an error
    return getMockPollenData();
  }
}

// Fetch from Google Maps Pollen API
async function fetchGooglePollenData(
  location: Location,
  apiKey: string
): Promise<PollenData[]> {
  try {
    // Use the correct Pollen API endpoint
    const url = `https://pollen.googleapis.com/v1/forecast:lookup?key=${apiKey}&location.latitude=${location.lat}&location.longitude=${location.lng}&days=1`;

    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn(
        `Pollen API error: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `Pollen API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Process the pollen data from Google's response
    if (data && data.dailyInfo && data.dailyInfo.length > 0) {
      const dailyInfo = data.dailyInfo[0];
      const pollenData: PollenData[] = [];

      if (Array.isArray(dailyInfo.pollenTypeInfo)) {
        for (const type of dailyInfo.pollenTypeInfo) {
          let indexObj = undefined;
          if (Array.isArray(type.indexInfo) && type.indexInfo.length > 0) {
            indexObj = type.indexInfo.find((info: any) => typeof info.value === "number");
          } else if (type.indexInfo && typeof type.indexInfo === "object" && typeof type.indexInfo.value === "number") {
            indexObj = type.indexInfo;
          }

          if (indexObj && typeof indexObj.value === "number") {
            pollenData.push({
              type: type.displayName || type.code,
              level: getPollenLevel(indexObj.value),
              value: Number.parseFloat(indexObj.value.toFixed(1)),
            });
          }
        }
      }

      return pollenData;
    }

    throw new Error("Invalid response format from Pollen API");
  } catch (error) {
    console.error("Pollen API failed:", error);
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
