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
  try {
    const locationCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user-location='));
    
    if (!locationCookie) {
      return null;
    }

    const locationValue = locationCookie.split('=')[1];
    return JSON.parse(decodeURIComponent(locationValue)) as Location;
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
    // Use relative URL to avoid CORS issues
    const response = await fetch(
      `/api/pollen?lat=${location.lat}&lng=${location.lng}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch pollen data: ${response.statusText} - ${errorText}`);
    }

    const { data } = await response.json();
    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid pollen data received');
    }
    return data;
  } catch (error) {
    console.error("Error fetching pollen data:", error);
    throw error;
  }
}

// Get overall pollen level
export function getOverallPollenLevel(pollenData: PollenData[]): {
  level: "Low" | "Moderate" | "High" | "Very High";
  value: number;
} {
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
