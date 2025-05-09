import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Missing latitude or longitude" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Maps API key is not configured" },
      { status: 500 }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Geocoding API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    
    // Handle different response statuses
    switch (data.status) {
      case "OK":
        if (!data.results?.[0]?.formatted_address) {
          throw new Error("No address found in geocoding response");
        }
        return NextResponse.json({ address: data.results[0].formatted_address });
      
      case "ZERO_RESULTS":
        return NextResponse.json(
          { error: "No address found for these coordinates" },
          { status: 404 }
        );
      
      case "OVER_QUERY_LIMIT":
        return NextResponse.json(
          { error: "Geocoding API quota exceeded" },
          { status: 429 }
        );
      
      case "REQUEST_DENIED":
        return NextResponse.json(
          { error: "Geocoding API request denied" },
          { status: 403 }
        );
      
      case "INVALID_REQUEST":
        return NextResponse.json(
          { error: "Invalid geocoding request" },
          { status: 400 }
        );
      
      default:
        throw new Error(`Geocoding API error: ${data.status}`);
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to geocode location" },
      { status: 500 }
    );
  }
}
