"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { testGoogleMapsAPIs } from "@/lib/api-test-actions";

export default function GoogleMapsTest(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<{
    hasApiKey: boolean;
    mapsJsWorks: boolean;
    geocodingWorks: boolean;
    pollenApiWorks: boolean;
    error?: string;
  }>({
    hasApiKey: false,
    mapsJsWorks: false,
    geocodingWorks: false,
    pollenApiWorks: false,
  });

  const runTests = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    const testResults = {
      hasApiKey: false,
      mapsJsWorks: false,
      geocodingWorks: false,
      pollenApiWorks: false,
      error: undefined as string | undefined,
    };

    // Check if API key exists
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    testResults.hasApiKey = !!apiKey;

    if (!apiKey) {
      testResults.error =
        "No Google Maps API key found. Please add your API key to the environment variables.";
      setResults(testResults);
      setIsLoading(false);
      return;
    }

    try {
      // Test Maps JS API by loading the script
      testResults.mapsJsWorks = await testMapsJsApi(apiKey);

      // Use server action to test other APIs
      const serverResults = await testGoogleMapsAPIs(apiKey);

      testResults.geocodingWorks = serverResults.geocodingWorks;
      testResults.pollenApiWorks = serverResults.pollenApiWorks;

      if (serverResults.error) {
        testResults.error = serverResults.error;
      }
    } catch (error) {
      console.error("API tests failed:", error);
      testResults.error = `Test failed: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }

    setResults(testResults);
    setIsLoading(false);
  }, []);

  // Test Maps JS API by dynamically loading the script
  async function testMapsJsApi(apiKey: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Create a timeout to handle script load failure
      const timeoutId = setTimeout(() => {
        console.error("Maps JS API test timed out");
        resolve(false);
      }, 5000);

      try {
        // Create a script element
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=googleMapsCallback`;
        script.async = true;
        script.defer = true;

        // Define the callback function
        window.googleMapsCallback = (): void => {
          clearTimeout(timeoutId);
          resolve(true);
          delete window.googleMapsCallback;
        };

        // Handle script load error
        script.onerror = (): void => {
          clearTimeout(timeoutId);
          console.error("Maps JS API script failed to load");
          resolve(false);
        };

        // Add the script to the document
        document.head.appendChild(script);

        // Clean up function
        setTimeout(() => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
        }, 6000);
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Error testing Maps JS API:", error);
        resolve(false);
      }
    });
  }

  useEffect(() => {
    // Add the googleMapsCallback to the window object
    window.googleMapsCallback = (): void => {
      console.log("Google Maps API loaded successfully");
    };

    void runTests();

    return (): void => {
      // Clean up
      delete window.googleMapsCallback;
    };
  }, [runTests]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Maps API Test</CardTitle>
        <CardDescription>
          Test your Google Maps API configuration
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>API Key Present</span>
                {results.hasApiKey ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>

              <div className="flex items-center justify-between">
                <span>Maps JavaScript API</span>
                {results.mapsJsWorks ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>

              <div className="flex items-center justify-between">
                <span>Geocoding API</span>
                {results.geocodingWorks ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>

              <div className="flex items-center justify-between">
                <span>Pollen API</span>
                {results.pollenApiWorks ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>

            {results.error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{results.error}</AlertDescription>
              </Alert>
            )}

            {!results.pollenApiWorks && (
              <Alert>
                <AlertTitle>Pollen API Not Working</AlertTitle>
                <AlertDescription>
                  The Pollen API may not be enabled for your project. Make sure
                  to enable the &quot;Pollen API&quot; in your Google Cloud
                  Console and ensure billing is set up. The app will fall back
                  to sample data for pollen information.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => void runTests()}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing...
            </>
          ) : (
            "Run Tests Again"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Add type definition for the window object
declare global {
  interface Window {
    googleMapsCallback?: () => void;
  }
}
