'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, PlusCircle } from "lucide-react"
import SymptomTrendsChart from "@/components/symptom-trends-chart"
import RecentEntries from "@/components/recent-entries"
import PollenForecast from "@/components/pollen-forecast"
import { useState, useEffect } from "react"
import { getCurrentLocation } from "@/lib/geolocation"
import { getRecentEntries } from "@/lib/actions"
import { Badge } from "@/components/ui/badge"
import StatsCard from "@/components/stats-card"
import {
  Wind,
  Eye,
  ThermometerSun,
  Droplets,
  CloudFog,
  Pill
} from "lucide-react"

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null)
  const [recentStats, setRecentStats] = useState<{
    sneezing: number;
    itchyEyes: number;
    congestion: number;
    headache: number;
    medicationEffectiveness: Record<string, { count: number; effectiveness: string }>;
    hasData: boolean;
  }>({
    sneezing: 0,
    itchyEyes: 0,
    congestion: 0,
    headache: 0,
    medicationEffectiveness: {},
    hasData: false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLocation() {
      const loc = await getCurrentLocation()
      setLocation(loc)
    }
    fetchLocation()
  }, [])

  useEffect(() => {
    async function fetchRecentStats() {
      try {
        // Get entries from the last 7 days
        const entries = await getRecentEntries(7)
        
        if (entries.length === 0) {
          setLoading(false)
          return
        }

        // Calculate average symptom severity
        const totals = {
          sneezing: 0,
          itchyEyes: 0,
          congestion: 0,
          headache: 0
        }
        
        // Track medication effectiveness
        const medications: Record<string, { count: number; effective: number }> = {}
        
        for (const entry of entries) {
          // Sum up symptoms
          totals.sneezing += entry.sneezing
          totals.itchyEyes += entry.itchyEyes
          totals.congestion += entry.congestion
          totals.headache += entry.headache
          
          // Track medications and their effectiveness
          for (const med of entry.medications) {
            if (!medications[med]) {
              medications[med] = { count: 0, effective: 0 }
            }
            medications[med].count += 1
            
            // Count as effective if somewhat or very effective
            if (entry.medicationEffectiveness === 'somewhat_effective' || 
                entry.medicationEffectiveness === 'very_effective') {
              medications[med].effective += 1
            }
          }
        }
        
        // Calculate averages
        const averages = {
          sneezing: Math.round(totals.sneezing / entries.length),
          itchyEyes: Math.round(totals.itchyEyes / entries.length),
          congestion: Math.round(totals.congestion / entries.length),
          headache: Math.round(totals.headache / entries.length)
        }
        
        // Calculate medication effectiveness as percentage
        const medEffectiveness: Record<string, { count: number; effectiveness: string }> = {}
        for (const [med, data] of Object.entries(medications)) {
          const effectivenessRate = data.effective / data.count
          
          let rating
          if (effectivenessRate >= 0.8) rating = "High"
          else if (effectivenessRate >= 0.5) rating = "Medium"
          else rating = "Low"
          
          medEffectiveness[med] = { 
            count: data.count,
            effectiveness: rating
          }
        }
        
        setRecentStats({
          ...averages,
          medicationEffectiveness: medEffectiveness,
          hasData: true
        })
      } catch (error) {
        console.error("Failed to fetch recent statistics:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchRecentStats()
  }, [])

  function getSeverityLabel(value: number) {
    if (value <= 0) return "None"
    if (value <= 1) return "Mild"
    if (value <= 2) return "Moderate"
    if (value <= 3) return "Severe"
    return "Very Severe"
  }

  function getSeverityColor(value: number) {
    if (value <= 0) return "text-green-600"
    if (value <= 1) return "text-green-500"
    if (value <= 2) return "text-yellow-600"
    if (value <= 3) return "text-orange-600"
    return "text-red-600"
  }

  function getEffectivenessColor(rating: string) {
    if (rating === "High") return "text-green-600"
    if (rating === "Medium") return "text-yellow-600"
    return "text-red-600"
  }

  function formatMedicationName(name: string) {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center gap-4 flex-wrap mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            Hayfever Tracker
            {location?.address && (
              <span className="flex items-center gap-1 text-sm font-normal text-muted-foreground border border-border/50 rounded-full px-3 py-1 ml-2 bg-muted/30">
                <svg className="h-3.5 w-3.5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {location.address}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground/80 text-sm mt-1">Track your symptoms and find patterns over time</p>
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
              Today's Pollen Count
            </CardTitle>
            <CardDescription className="text-muted-foreground/80">Based on your current location</CardDescription>
          </CardHeader>
          <CardContent>
            <PollenForecast />
          </CardContent>
        </Card>

        <StatsCard
          title="Symptom Summary"
          description="Last 7 days"
          isLoading={loading}
          isEmpty={!recentStats.hasData}
          emptyMessage="No entries in the last 7 days"
          items={[
            {
              label: "Sneezing",
              value: getSeverityLabel(recentStats.sneezing),
              color: getSeverityColor(recentStats.sneezing),
              icon: <Wind className="h-4 w-4" />
            },
            {
              label: "Itchy Eyes",
              value: getSeverityLabel(recentStats.itchyEyes),
              color: getSeverityColor(recentStats.itchyEyes),
              icon: <Eye className="h-4 w-4" />
            },
            {
              label: "Congestion",
              value: getSeverityLabel(recentStats.congestion),
              color: getSeverityColor(recentStats.congestion),
              icon: <CloudFog className="h-4 w-4" />
            },
            {
              label: "Headache",
              value: getSeverityLabel(recentStats.headache),
              color: getSeverityColor(recentStats.headache),
              icon: <ThermometerSun className="h-4 w-4" />
            }
          ]}
        />

        <StatsCard
          title="Medication Effectiveness"
          description="Based on your entries"
          isLoading={loading}
          isEmpty={!recentStats.hasData || Object.keys(recentStats.medicationEffectiveness).length === 0}
          emptyMessage="No medication data available"
          items={Object.entries(recentStats.medicationEffectiveness).map(([med, data]) => ({
            label: formatMedicationName(med),
            value: data.effectiveness,
            color: getEffectivenessColor(data.effectiveness),
            icon: <Pill className="h-4 w-4" />
          }))}
        />
      </div>

      <Card className="overflow-hidden border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            <Wind className="h-5 w-5 text-yellow-500" />
            Symptom Trends vs. Pollen Count
          </CardTitle>
          <CardDescription className="text-muted-foreground/80">Correlation between your symptoms and local pollen levels</CardDescription>
        </CardHeader>
        <CardContent className="p-1 sm:p-4">
          <SymptomTrendsChart />
        </CardContent>
      </Card>

      <Card className="border-border/40">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-xl font-medium">Recent Entries</CardTitle>
            <CardDescription className="text-muted-foreground/80">Your latest symptom records</CardDescription>
          </div>
          <Link href="/history">
            <Button variant="outline" size="sm" className="gap-1 transition-colors">
              <CalendarIcon className="h-4 w-4" />
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="pt-0">
          <RecentEntries />
        </CardContent>
      </Card>
    </div>
  )
}
