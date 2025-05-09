"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getPollenData, type PollenData } from "@/lib/pollen-api";
import { getCurrentLocation, getOverallPollenLevel } from "@/lib/geolocation";

const mockPollenData: PollenData[] = [
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

export default function PollenForecast(): React.ReactElement {
  const [pollenData, setPollenData] = useState<PollenData[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch pollen data using current location
  useEffect(() => {
    let isMounted = true;

    async function fetchData(): Promise<void> {
      try {
        setError(null);
        setUsingMockData(false);
        setIsLoading(true);

        // Get current location and pollen data
        const currentLocation = await getCurrentLocation();
        const data = await getPollenData(currentLocation);
        
        if (!isMounted) return;
        
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid pollen data received");
        }
        
        setPollenData(data);
        setLastUpdated(new Date());

        // Check if we're using mock data (based on a simple heuristic)
        if (
          data.length === 4 &&
          data[0].value === 4.2 &&
          data[1].value === 3.1
        ) {
          setUsingMockData(true);
        }
      } catch (error) {
        if (!isMounted) return;
        
        console.error("Failed to fetch pollen data:", error);
        setError("Unable to fetch pollen data. Using sample data instead.");
        setUsingMockData(true);
        setPollenData(mockPollenData);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Get overall pollen level
  const overallLevel = getOverallPollenLevel(pollenData);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-2 bg-muted rounded"></div>
          {[1, 2, 3, 4].map((i): React.ReactNode => (
            <div key={i} className="space-y-2 p-3 rounded-lg border bg-muted/20">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-2 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {usingMockData && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Using Sample Data</AlertTitle>
          <AlertDescription>
            We&apos;re currently showing sample pollen data. Please allow
            location access to get real forecasts.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Overall Level</h3>
            <Badge
              variant={
                overallLevel.level === "Very High" ? "destructive" : "default"
              }
            >
              {overallLevel.level}
            </Badge>
          </div>
          <Progress
            value={(overallLevel.value / 5) * 100}
            variant="pollen"
            className="h-2"
          />
        </div>

        <div className="space-y-4">
          {pollenData.map((item) => (
            <div
              key={item.type}
              className="space-y-2 p-3 rounded-lg border bg-background/60"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {/* TODO: Add pollen type icon here */}
                  <h4 className="font-medium text-lg">{item.type}</h4>
                </div>
                <Badge
                  variant={
                    item.level === "Very High" ? "destructive" : "default"
                  }
                >
                  {item.level}
                </Badge>
              </div>
              <Progress
                value={(item.value / 5) * 100}
                variant="pollen"
                className="h-2"
              />
              {/* Example extra info for each pollen type */}
              <div className="text-xs text-muted-foreground mt-1">
                {item.type === "Tree" &&
                  "Tree pollen is high in spring. Common triggers: birch, oak, pine."}
                {item.type === "Grass" &&
                  "Grass pollen peaks in late spring and summer. Avoid mowing lawns."}
                {item.type === "Weed" &&
                  "Weed pollen is common in late summer/autumn. Ragweed is a major source."}
                {item.type === "Mold" &&
                  "Mold spores thrive in damp conditions. Watch for after rain."}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lastUpdated && (
        <div className="text-right">
          <span className="text-muted-foreground text-xs">
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      )}
    </div>
  );
}
