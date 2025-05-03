"use client"

import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getRecentEntries } from "@/lib/actions"

// Type for the entries
type Entry = {
  id: string
  date: Date
  sneezing: number
  itchyEyes: number
  congestion: number
  headache: number
  medications: string[]
  medicationEffectiveness: string
  activities: string[]
  pollenCount?: number | null
  outdoorTime?: number | null
  notes?: string | null
  locationAddress?: string | null
}

export default function RecentEntries() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await getRecentEntries(3)
        setEntries(data)
      } catch (error) {
        console.error("Failed to load entries:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadEntries()
  }, [])

  function getSeverityLabel(value: number) {
    if (value <= 0) return "None"
    if (value <= 1) return "Mild"
    if (value <= 2) return "Moderate"
    if (value <= 3) return "Severe"
    return "Very Severe"
  }

  function getSeverityColor(value: number) {
    if (value <= 0) return "bg-green-500"
    if (value <= 1) return "bg-green-400"
    if (value <= 2) return "bg-yellow-500"
    if (value <= 3) return "bg-orange-500"
    return "bg-red-500"
  }

  function formatMedication(med: string) {
    return med
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (loading) {
    return <div className="py-4 text-center text-muted-foreground">Loading recent entries...</div>
  }

  if (entries.length === 0) {
    return <div className="py-4 text-center text-muted-foreground">No entries yet. Add your first entry!</div>
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{new Date(entry.date).toLocaleDateString()}</h4>
              <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(entry.date), { addSuffix: true })}</p>
            </div>
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
            {entry.locationAddress && (
              <Badge variant="outline" className="text-xs">
                {entry.locationAddress}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Symptoms</p>
              <ul className="space-y-1">
                <li className="flex justify-between">
                  <span>Sneezing:</span>
                  <Badge className={getSeverityColor(entry.sneezing)}>
                    {getSeverityLabel(entry.sneezing)}
                  </Badge>
                </li>
                <li className="flex justify-between">
                  <span>Itchy Eyes:</span>
                  <Badge className={getSeverityColor(entry.itchyEyes)}>
                    {getSeverityLabel(entry.itchyEyes)}
                  </Badge>
                </li>
                <li className="flex justify-between">
                  <span>Congestion:</span>
                  <Badge className={getSeverityColor(entry.congestion)}>
                    {getSeverityLabel(entry.congestion)}
                  </Badge>
                </li>
                <li className="flex justify-between">
                  <span>Headache:</span>
                  <Badge className={getSeverityColor(entry.headache)}>
                    {getSeverityLabel(entry.headache)}
                  </Badge>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-muted-foreground mb-1">Medication & Activities</p>
              <div className="flex flex-wrap gap-1">
                {entry.medications.map((med) => (
                  <Badge key={med} variant="secondary">
                    {formatMedication(med)}
                  </Badge>
                ))}
                {entry.activities.map((activity) => (
                  <Badge key={activity} variant="outline">
                    {activity.charAt(0).toUpperCase() + activity.slice(1)}
                  </Badge>
                ))}
              </div>
              {entry.notes && (
                <p className="mt-2 text-xs text-muted-foreground">{entry.notes}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
