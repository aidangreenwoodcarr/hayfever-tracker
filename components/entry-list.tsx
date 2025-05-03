"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"

// Mock data - in a real app, this would come from your database
const mockEntries = [
  {
    id: "1",
    date: new Date(2023, 4, 7), // May 7, 2023
    symptoms: {
      sneezing: 4,
      itchyEyes: 3,
      congestion: 3,
      headache: 2,
    },
    medications: ["cetirizine", "nasal_spray"],
    pollenCount: 4.2,
    activities: ["walking", "gardening"],
    notes: "Spent 2 hours in the park. Symptoms were very bad in the afternoon.",
  },
  {
    id: "2",
    date: new Date(2023, 4, 6), // May 6, 2023
    symptoms: {
      sneezing: 3,
      itchyEyes: 2,
      congestion: 2,
      headache: 1,
    },
    medications: ["cetirizine"],
    pollenCount: 3.5,
    activities: ["walking"],
    notes: "Walked the dog for 30 minutes in the morning. Symptoms were manageable.",
  },
  {
    id: "3",
    date: new Date(2023, 4, 5), // May 5, 2023
    symptoms: {
      sneezing: 2,
      itchyEyes: 2,
      congestion: 1,
      headache: 0,
    },
    medications: ["cetirizine", "eye_drops"],
    pollenCount: 2.7,
    activities: ["exercise"],
    notes: "Indoor workout only. Felt much better today.",
  },
]

export default function EntryList() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)

  // Filter entries by selected date
  const filteredEntries = date
    ? mockEntries.filter(
        (entry) =>
          entry.date.getDate() === date.getDate() &&
          entry.date.getMonth() === date.getMonth() &&
          entry.date.getFullYear() === date.getFullYear(),
      )
    : mockEntries

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

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-6">
      <div>
        <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md" />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-lg">
          {date ? format(date, "MMMM d, yyyy") : "All Entries"}
          {filteredEntries.length > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              ({filteredEntries.length} {filteredEntries.length === 1 ? "entry" : "entries"})
            </span>
          )}
        </h3>

        {filteredEntries.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">No entries found for this date</Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card
              key={entry.id}
              className={`p-4 cursor-pointer transition-all ${selectedEntry === entry.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedEntry(entry.id === selectedEntry ? null : entry.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">{format(entry.date, "MMMM d, yyyy")}</h4>
                  <p className="text-sm text-muted-foreground">Pollen Count: {entry.pollenCount}/5</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Symptoms</h5>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Sneezing:</span>
                      <Badge className={getSeverityColor(entry.symptoms.sneezing)}>
                        {getSeverityLabel(entry.symptoms.sneezing)}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Itchy Eyes:</span>
                      <Badge className={getSeverityColor(entry.symptoms.itchyEyes)}>
                        {getSeverityLabel(entry.symptoms.itchyEyes)}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Congestion:</span>
                      <Badge className={getSeverityColor(entry.symptoms.congestion)}>
                        {getSeverityLabel(entry.symptoms.congestion)}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Headache:</span>
                      <Badge className={getSeverityColor(entry.symptoms.headache)}>
                        {getSeverityLabel(entry.symptoms.headache)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2">Medication & Activities</h5>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {entry.medications.map((med) => (
                      <Badge key={med} variant="secondary">
                        {formatMedication(med)}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {entry.activities.map((activity) => (
                      <Badge key={activity} variant="outline">
                        {activity.charAt(0).toUpperCase() + activity.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedEntry === entry.id && (
                <div className="mt-4 pt-4 border-t">
                  <h5 className="text-sm font-medium mb-2">Notes</h5>
                  <p className="text-sm">{entry.notes}</p>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
