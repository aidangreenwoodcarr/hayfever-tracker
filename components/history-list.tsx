"use client";

import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { SymptomEntry } from "@/lib/types";

interface HistoryListProps {
  initialEntries: SymptomEntry[];
}

export function HistoryList({
  initialEntries,
}: HistoryListProps): React.ReactElement {
  function getSeverityLabel(value: number): string {
    if (value <= 0) return "None";
    if (value <= 1) return "Mild";
    if (value <= 2) return "Moderate";
    if (value <= 3) return "Severe";
    return "Very Severe";
  }

  function getSeverityColor(value: number): string {
    if (value <= 0) return "bg-green-500";
    if (value <= 1) return "bg-green-400";
    if (value <= 2) return "bg-yellow-500";
    if (value <= 3) return "bg-orange-500";
    return "bg-red-500";
  }

  function formatMedication(med: string): string {
    return med
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  if (initialEntries.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No entries found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {initialEntries.map((entry) => (
        <div key={entry.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div>
              <h3 className="text-lg font-medium">
                {format(new Date(entry.date), "MMMM dd, yyyy")}
              </h3>
              {entry.locationAddress && (
                <p className="text-sm text-muted-foreground">
                  {entry.locationAddress}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {entry.pollenCount && (
                <Badge variant="outline" className="flex gap-1 items-center">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      entry.pollenCount > 4
                        ? "bg-red-500"
                        : entry.pollenCount > 3
                        ? "bg-orange-500"
                        : entry.pollenCount > 2
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                  Pollen: {entry.pollenCount}/5
                </Badge>
              )}
              {entry.outdoorTime && (
                <Badge variant="outline">
                  {entry.outdoorTime} hours outdoors
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Symptoms</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Sneezing</span>
                    <Badge className={getSeverityColor(entry.sneezing)}>
                      {getSeverityLabel(entry.sneezing)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Itchy Eyes</span>
                    <Badge className={getSeverityColor(entry.itchyEyes)}>
                      {getSeverityLabel(entry.itchyEyes)}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Congestion</span>
                    <Badge className={getSeverityColor(entry.congestion)}>
                      {getSeverityLabel(entry.congestion)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Headache</span>
                    <Badge className={getSeverityColor(entry.headache)}>
                      {getSeverityLabel(entry.headache)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Medication & Activities</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Medications:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {entry.medications.length > 0 ? (
                      entry.medications.map((med) => (
                        <Badge key={med} variant="secondary">
                          {formatMedication(med)}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        None taken
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Activities:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {entry.activities.length > 0 ? (
                      entry.activities.map((activity) => (
                        <Badge key={activity} variant="outline">
                          {activity.charAt(0).toUpperCase() + activity.slice(1)}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        None recorded
                      </span>
                    )}
                  </div>
                </div>

                {entry.medicationEffectiveness && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Medication Effectiveness:
                    </p>
                    <Badge
                      className={
                        entry.medicationEffectiveness === "very_effective"
                          ? "bg-green-500"
                          : entry.medicationEffectiveness ===
                            "somewhat_effective"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }
                    >
                      {entry.medicationEffectiveness
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>

          {entry.notes && (
            <div>
              <h4 className="font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground">{entry.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
