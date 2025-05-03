import { NextResponse } from 'next/server';

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

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Maps API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (data.status !== "OK" || !data.results?.[0]) {
      throw new Error(`Geocoding API error: ${data.status}`);
    }

    return NextResponse.json({ address: data.results[0].formatted_address });
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: 'Failed to geocode location' },
      { status: 500 }
    );
  }
} 
