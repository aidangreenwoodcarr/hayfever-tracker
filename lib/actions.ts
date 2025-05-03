"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"

export async function addEntry(formData: FormData) {
  // Parse the date correctly - this was causing the 1/1/1970 issue
  const dateStr = formData.get("date") as string
  const date = new Date(dateStr)

  // Get symptom values and parse as floats
  const sneezing = parseFloat(formData.get("sneezing") as string)
  const itchyEyes = parseFloat(formData.get("itchy_eyes") as string)
  const congestion = parseFloat(formData.get("congestion") as string)
  const headache = parseFloat(formData.get("headache") as string)

  // Get medications
  const medications = Array.from(formData.getAll("medication"))
  const medicationEffectiveness = formData.get("medication_effectiveness") as string

  // Get activities
  const activities = Array.from(formData.getAll("activities"))
  const outdoorTime = parseFloat(formData.get("outdoor_time") as string)
  const notes = formData.get("notes") as string

  // Get location data
  const locationLat = formData.get("location_lat") ? parseFloat(formData.get("location_lat") as string) : null
  const locationLng = formData.get("location_lng") ? parseFloat(formData.get("location_lng") as string) : null
  const locationAddress = formData.get("location_address") as string || null

  // In a real app, we would also fetch pollen data from an API based on location
  // But for now, we'll just save the entry without pollen data

  const entry = await prisma.hayfeverEntry.create({
    data: {
      date,
      sneezing,
      itchyEyes,
      congestion,
      headache,
      medications: JSON.stringify(medications),
      medicationEffectiveness,
      outdoorTime: isNaN(outdoorTime) ? null : outdoorTime,
      activities: JSON.stringify(activities),
      notes: notes || null,
      locationLat,
      locationLng,
      locationAddress,
    },
  })

  // Revalidate the home page to show the new entry
  revalidatePath("/")

  return { success: true, entry }
}

export async function getAllEntries() {
  const entries = await prisma.hayfeverEntry.findMany({
    orderBy: {
      date: 'desc',
    },
  })

  return entries.map(entry => ({
    ...entry,
    date: new Date(entry.date),
    medications: JSON.parse(entry.medications),
    activities: JSON.parse(entry.activities),
    pollenTypes: entry.pollenTypes ? JSON.parse(entry.pollenTypes) : null,
  }))
}

export async function getRecentEntries(limit = 3) {
  // Default limit is 3, but allow larger values for dashboard components
  const entries = await prisma.hayfeverEntry.findMany({
    orderBy: {
      date: 'desc',
    },
    take: limit,
  })

  return entries.map(entry => ({
    ...entry,
    date: new Date(entry.date),
    medications: JSON.parse(entry.medications),
    activities: JSON.parse(entry.activities),
    pollenTypes: entry.pollenTypes ? JSON.parse(entry.pollenTypes) : null,
  }))
}

// Save user location to cookies
export async function saveUserLocation(location: { lat: number; lng: number }) {
  // Store location in a cookie
  (await
    // Store location in a cookie
    cookies()).set({
    name: "user-location",
    value: JSON.stringify(location),
    // Cookie will expire in 30 days
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  })

  // Revalidate paths that might use this location data
  revalidatePath("/")

  return { success: true }
}

export async function clearAllEntries() {
  
  try {
    // Delete all hayfever entries
    const { count } = await prisma.hayfeverEntry.deleteMany({})
    
    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/history")
    
    console.log(`Successfully deleted ${count} entries`)
    return { success: true, count }
  } catch (error) {
    console.error('Error clearing database:', error)
    return { success: false, error: 'Failed to clear database' }
  }
}
