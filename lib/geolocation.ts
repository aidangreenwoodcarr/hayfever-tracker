"use client";

import type { Location, PollenData } from "./pollen-api";

// Get address from coordinates using Geocoding API
async function getAddressFromCoordinates(location: Location): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("Google Maps API key is not configured");
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (data.status !== "OK" || !data.results?.[0]) {
    throw new Error(`Geocoding API error: ${data.status}`);
  }

  return data.results[0].formatted_address;
}

// Get the user's current location using the browser's Geolocation API
export async function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        try {
          // Get address from coordinates using Geocoding API
          const address = await getAddressFromCoordinates(location);
          resolve({ ...location, address });
        } catch (error) {
          console.error("Error getting address:", error);
          // Still resolve with coordinates even if geocoding fails
          resolve(location);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        reject(error);
      }
    );
  });
}

// Client-side function to determine pollen level based on value
function getPollenLevel(
  value: number
): "Low" | "Moderate" | "High" | "Very High" {
  if (value < 2) return "Low";
  if (value < 3.5) return "Moderate";
  if (value < 4.5) return "High";
  return "Very High";
}

// Client-side function to calculate overall pollen level
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
