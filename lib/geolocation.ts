"use client";

import type { Location } from "./types";

interface GeocodeResponse {
  address: string;
  error?: string;
}

interface PollenLevel {
  level: "Low" | "Moderate" | "High" | "Very High";
  value: number;
}

interface PollenData {
  value: number;
}

// Get address from coordinates using our secure API endpoint
async function getAddressFromCoordinates(location: Location): Promise<string> {
  const response = await fetch(
    `/api/geocode?lat=${location.lat}&lng=${location.lng}`
  );

  const data = (await response.json()) as GeocodeResponse;
  
  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to get address from coordinates");
  }

  return data.address;
}

// Get the user's current location using the browser's Geolocation API
export async function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition): void => {
        const location: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Get address from coordinates using Geocoding API
        void (async (): Promise<void> => {
          try {
            const address = await getAddressFromCoordinates(location);
            resolve({ ...location, address });
          } catch (error) {
            console.error("Error getting address:", error);
            // Still resolve with coordinates even if geocoding fails
            resolve({ ...location, address: "Unknown location" });
          }
        })();
      },
      (error: GeolocationPositionError) => {
        console.error("Error getting location:", error);
        let errorMessage = "Failed to get location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
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
export function getOverallPollenLevel(pollenData: PollenData[]): PollenLevel {
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
