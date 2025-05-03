import { NextResponse } from 'next/server';
import type { PollenData } from '@/lib/pollen-api';

// Determine pollen level based on value
function getPollenLevel(
  value: number
): "Low" | "Moderate" | "High" | "Very High" {
  if (value < 2) return "Low";
  if (value < 3.5) return "Moderate";
  if (value < 4.5) return "High";
  return "Very High";
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing latitude or longitude' },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn("Google Maps API key is not configured. Using mock data.");
      return NextResponse.json({ data: getMockPollenData() });
    }

    // Use the correct Pollen API endpoint
    const url = `https://pollen.googleapis.com/v1/forecast:lookup?key=${apiKey}&location.latitude=${lat}&location.longitude=${lng}&days=1`;

    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn(`Pollen API error: ${response.status} ${response.statusText}`);
      return NextResponse.json({ data: getMockPollenData() });
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

      return NextResponse.json({ data: pollenData });
    }

    console.warn("Invalid response format from Pollen API. Using mock data.");
    return NextResponse.json({ data: getMockPollenData() });
  } catch (error) {
    console.error("Error fetching pollen data:", error);
    return NextResponse.json({ data: getMockPollenData() });
  }
} 
