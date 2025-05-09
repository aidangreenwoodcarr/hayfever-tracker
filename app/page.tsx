"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Droplets } from "lucide-react";
import SymptomTrendsChart from "@/components/symptom-trends-chart";
import RecentEntries from "@/components/recent-entries";
import PollenForecast from "@/components/pollen-forecast";
import { useState, useEffect } from "react";
import { getCurrentLocation } from "@/lib/geolocation";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/stats-card";
import { useSymptomStats } from "@/hooks/useSymptomStats";
import {
  getSeverityLabel,
  getSeverityColor,
  getEffectivenessColor,
  formatMedicationName,
} from "@/lib/utils";
import type { Location, EffectivenessRating } from "@/lib/types";
import type { ReactElement } from "react";

interface MedicationEffectiveness {
  effectiveness: EffectivenessRating;
}

export default function Home(): ReactElement {
  const [location, setLocation] = useState<Location | null>(null);
  const { stats, loading, error } = useSymptomStats(7);

  useEffect(() => {
    async function fetchLocation(): Promise<void> {
      try {
        const loc = await getCurrentLocation();
        setLocation(loc);
      } catch (err) {
        console.error("Failed to fetch location:", err);
      }
    }
    void fetchLocation();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-medium">Error</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center gap-4 flex-wrap mb-2 ml-4 md:ml-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            Hayfever Tracker
            {location?.address && (
              <span className="flex items-center gap-1 text-sm font-normal text-muted-foreground border border-border/50 rounded-full px-3 py-1 ml-2 bg-muted/30">
                <svg
                  className="h-3.5 w-3.5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {location.address}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground/80 text-sm mt-1">
            Track your symptoms and find patterns over time
          </p>
        </div>
        <Link href="/add-entry">
          <Button className="gap-2 rounded-full shadow-sm hover:shadow-md transition-all">
            <PlusCircle className="h-4 w-4" />
            Add Entry
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="h-full overflow-hidden border-border/40">
          <CardHeader className="pb-2 space-y-1">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              Today&apos;s Pollen Count
            </CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Based on your current location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PollenForecast />
          </CardContent>
        </Card>

        <StatsCard
          title="Symptom Summary"
          description="Last 7 days"
          isLoading={loading}
          isEmpty={!stats.hasData}
          emptyMessage="No entries in the last 7 days"
          items={[
            {
              label: "Sneezing",
              value: getSeverityLabel(stats.sneezing),
              color: getSeverityColor(stats.sneezing),
            },
            {
              label: "Itchy Eyes",
              value: getSeverityLabel(stats.itchyEyes),
              color: getSeverityColor(stats.itchyEyes),
            },
            {
              label: "Congestion",
              value: getSeverityLabel(stats.congestion),
              color: getSeverityColor(stats.congestion),
            },
            {
              label: "Headache",
              value: getSeverityLabel(stats.headache),
              color: getSeverityColor(stats.headache),
            },
          ]}
        />

        <Card className="h-full overflow-hidden border-border/40">
          <CardHeader className="pb-2 space-y-1">
            <CardTitle className="text-lg font-medium">
              Medication Effectiveness
            </CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Based on your recent entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.hasData ? (
              <div className="space-y-4">
                {Object.entries(stats.medicationEffectiveness).map(
                  ([med, data]) => (
                    <div
                      key={med}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">
                        {formatMedicationName(med)}
                      </span>
                      <Badge
                        variant="secondary"
                        className={getEffectivenessColor(
                          (data as MedicationEffectiveness).effectiveness
                        )}
                      >
                        {(data as MedicationEffectiveness).effectiveness}
                      </Badge>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No medication data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="h-full overflow-hidden border-border/40">
          <CardHeader className="pb-2 space-y-1">
            <CardTitle className="text-lg font-medium">
              Symptom Trends
            </CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Your symptoms over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SymptomTrendsChart />
          </CardContent>
        </Card>

        <Card className="h-full overflow-hidden border-border/40">
          <CardHeader className="pb-2 space-y-1">
            <CardTitle className="text-lg font-medium">
              Recent Entries
            </CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Your latest symptom entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentEntries />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
