"use server"

// Server action to test Google Maps APIs
export async function testGoogleMapsAPIs(apiKey: string) {
  const results = {
    mapsJsWorks: false,
    geocodingWorks: false,
    pollenApiWorks: false,
    error: null as string | null,
  }

  // Test Geocoding API
  try {
    const geocodingResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=London&key=${apiKey}`,
    )
    const geocodingData = await geocodingResponse.json()
    results.geocodingWorks = geocodingResponse.status === 200 && geocodingData.status === "OK"

    if (!results.geocodingWorks && geocodingData.error_message) {
      console.error("Geocoding API error:", geocodingData.error_message)
    }
  } catch (error) {
    console.error("Geocoding API test failed:", error)
  }

  // Test Pollen API
  try {
    const pollenResponse = await fetch(
      `https://pollen.googleapis.com/v1/forecast:lookup?key=${apiKey}&location.latitude=51.5074&location.longitude=-0.1278&days=1`,
    )

    // Check if the API responded successfully
    results.pollenApiWorks = pollenResponse.status === 200

    if (pollenResponse.status === 403) {
      results.error = "Pollen API returned 403 Forbidden. The API may not be enabled for your project."
    } else if (pollenResponse.status === 404) {
      results.error = "Pollen API returned 404 Not Found. The API endpoint might have changed or is not available."
    }

    // Log the response for debugging
    if (!results.pollenApiWorks) {
      try {
        const responseText = await pollenResponse.text()
      } catch (e) {
        console.error("Could not read Pollen API response body")
      }
    }
  } catch (error) {
    console.error("Pollen API test failed:", error)
  }

  // For Maps JS API, we'll just check if the API key is valid format
  // The actual test will be done client-side by loading the script
  results.mapsJsWorks = apiKey.length > 10

  return results
}
