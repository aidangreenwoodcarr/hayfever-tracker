import { NextRequest, NextResponse } from "next/server";
import type { PollenData } from "@/lib/pollen-api";

interface PollenIndexInfo {
  value: number;
  [key: string]: unknown;
}

interface PollenTypeInfo {
  displayName?: string;
  code: string;
  indexInfo: PollenIndexInfo | PollenIndexInfo[];
  [key: string]: unknown;
}

interface PollenDailyInfo {
  pollenTypeInfo: PollenTypeInfo[];
  [key: string]: unknown;
}

interface PollenAPIResponse {
  dailyInfo: PollenDailyInfo[];
  [key: string]: unknown;
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

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers });
  }

  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Missing latitude or longitude" },
      { status: 400, headers }
    );
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn("Google Maps API key is not configured. Using mock data.");
      return NextResponse.json({ data: getMockPollenData() }, { headers });
    }

    // Use the correct Pollen API endpoint
    const url = `https://pollen.googleapis.com/v1/forecast:lookup?key=${apiKey}&location.latitude=${lat}&location.longitude=${lng}&days=1`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn(
        `Pollen API error: ${response.status} ${response.statusText}`
      );
      return NextResponse.json({ data: getMockPollenData() }, { headers });
    }

    const data = (await response.json()) as PollenAPIResponse;

    // Process the pollen data from Google's response
    if (data && data.dailyInfo && data.dailyInfo.length > 0) {
      const dailyInfo = data.dailyInfo[0];
      const pollenData: PollenData[] = [];

      if (Array.isArray(dailyInfo.pollenTypeInfo)) {
        for (const type of dailyInfo.pollenTypeInfo) {
          let indexObj: PollenIndexInfo | undefined = undefined;
          if (Array.isArray(type.indexInfo) && type.indexInfo.length > 0) {
            indexObj = type.indexInfo.find(
              (info: PollenIndexInfo) => typeof info.value === "number"
            );
          } else if (
            typeof type.indexInfo === "object" &&
            typeof (type.indexInfo as PollenIndexInfo).value === "number"
          ) {
            indexObj = type.indexInfo as PollenIndexInfo;
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

      return NextResponse.json({ data: pollenData }, { headers });
    }

    console.warn("Invalid response format from Pollen API. Using mock data.");
    return NextResponse.json({ data: getMockPollenData() }, { headers });
  } catch (error) {
    console.error("Error fetching pollen data:", error);
    return NextResponse.json({ data: getMockPollenData() }, { headers });
  }
}
