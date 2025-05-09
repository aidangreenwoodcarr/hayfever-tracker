"use client";

import type React from "react";

import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { addEntry } from "@/lib/actions";
import { getUserLocation } from "@/lib/pollen-api";
import { AuthCheck } from "@/components/auth-check";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AddEntryPage(): ReactElement {
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [symptoms, setSymptoms] = useState({
    sneezing: 0,
    itchyEyes: 0,
    congestion: 0,
    headache: 0,
  });
  
  // Ensure the user is authenticated
  return (
    <AuthCheck>
      <AddEntryForm 
        date={date}
        setDate={setDate}
        symptoms={symptoms}
        setSymptoms={setSymptoms}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />
    </AuthCheck>
  );
}

// Separate the form to its own component
function AddEntryForm({
  date,
  setDate,
  symptoms,
  setSymptoms,
  isSubmitting,
  setIsSubmitting
}: {
  date: Date;
  setDate: (date: Date) => void;
  symptoms: {
    sneezing: number;
    itchyEyes: number;
    congestion: number;
    headache: number;
  };
  setSymptoms: React.Dispatch<React.SetStateAction<{
    sneezing: number;
    itchyEyes: number;
    congestion: number;
    headache: number;
  }>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement {
  const router = useRouter();
  const { data: session } = useSession();
  const [result, setResult] = useState<{ success?: boolean; error?: string; message?: string } | null>(null);

  // Helper function to format the value
  const formatValue = (value: number): string => {
    if (value === 0) return "None";
    if (value <= 1) return "Very Mild";
    if (value <= 2) return "Mild";
    if (value <= 3) return "Moderate";
    if (value <= 4) return "Severe";
    return "Very Severe";
  };

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);

    // Log form data for debugging
    console.log("Form Data Entries:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Ensure the date is properly formatted for the server action
    formData.set("date", date.toISOString());
    console.log("Date set as:", date.toISOString());

    // Get the user's location to associate with this entry
    try {
      const userLocation = await getUserLocation();
      console.log("User location:", userLocation);
      if (userLocation) {
        formData.append("location_lat", userLocation.lat.toString());
        formData.append("location_lng", userLocation.lng.toString());
        if (userLocation.address) {
          formData.append("location_address", userLocation.address);
        }
      }
    } catch (locationError) {
      console.error("Location error:", locationError);
      // Continue without location if it fails
    }

    try {
      console.log("Submitting to addEntry...");
      const response = await addEntry(formData);
      console.log("Response from addEntry:", response);
      
      if (response.success) {
        setResult({ success: true, message: "Entry added successfully!" });
        
        // Wait for 2 seconds to show success message before redirecting
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 2000);
      } else {
        setResult({ success: false, error: response.error || "Failed to add entry" });
      }
    } catch (error) {
      console.error("Error in addEntry:", error);
      setResult({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <Button
        variant="ghost"
        className="mb-4 gap-1"
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      {result && (
        <Alert className={`mb-4 ${result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <AlertTitle>{result.success ? "Success!" : "Error"}</AlertTitle>
          <AlertDescription>
            {result.success ? result.message : result.error}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Add New Entry</CardTitle>
          <CardDescription>
            Record your symptoms, medication, and activities for the day
          </CardDescription>
          {session?.user?.name && (
            <p className="text-sm text-muted-foreground mt-1">
              Logged in as {session.user.name}
            </p>
          )}
        </CardHeader>
        <form onSubmit={(e) => void handleSubmit(e)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Symptoms</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="sneezing">Sneezing</Label>
                    <span className="text-sm text-muted-foreground">
                      {formatValue(symptoms.sneezing)}
                    </span>
                  </div>
                  <div className="relative pt-6">
                    <div className="absolute w-full flex justify-between text-xs text-muted-foreground -top-2">
                      <span>None</span>
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>Severe</span>
                      <span>Very Severe</span>
                    </div>
                    <Slider
                      id="sneezing"
                      name="sneezing"
                      value={[symptoms.sneezing]}
                      onValueChange={([value]) =>
                        setSymptoms((prev) => ({ ...prev, sneezing: value }))
                      }
                      max={4}
                      step={0.1}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="itchy-eyes">Itchy Eyes</Label>
                    <span className="text-sm text-muted-foreground">
                      {formatValue(symptoms.itchyEyes)}
                    </span>
                  </div>
                  <div className="relative pt-6">
                    <div className="absolute w-full flex justify-between text-xs text-muted-foreground -top-2">
                      <span>None</span>
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>Severe</span>
                      <span>Very Severe</span>
                    </div>
                    <Slider
                      id="itchy-eyes"
                      name="itchy_eyes"
                      value={[symptoms.itchyEyes]}
                      onValueChange={([value]) =>
                        setSymptoms((prev) => ({ ...prev, itchyEyes: value }))
                      }
                      max={4}
                      step={0.1}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="congestion">Nasal Congestion</Label>
                    <span className="text-sm text-muted-foreground">
                      {formatValue(symptoms.congestion)}
                    </span>
                  </div>
                  <div className="relative pt-6">
                    <div className="absolute w-full flex justify-between text-xs text-muted-foreground -top-2">
                      <span>None</span>
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>Severe</span>
                      <span>Very Severe</span>
                    </div>
                    <Slider
                      id="congestion"
                      name="congestion"
                      value={[symptoms.congestion]}
                      onValueChange={([value]) =>
                        setSymptoms((prev) => ({ ...prev, congestion: value }))
                      }
                      max={4}
                      step={0.1}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="headache">Headache</Label>
                    <span className="text-sm text-muted-foreground">
                      {formatValue(symptoms.headache)}
                    </span>
                  </div>
                  <div className="relative pt-6">
                    <div className="absolute w-full flex justify-between text-xs text-muted-foreground -top-2">
                      <span>None</span>
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>Severe</span>
                      <span>Very Severe</span>
                    </div>
                    <Slider
                      id="headache"
                      name="headache"
                      value={[symptoms.headache]}
                      onValueChange={([value]) =>
                        setSymptoms((prev) => ({ ...prev, headache: value }))
                      }
                      max={4}
                      step={0.1}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Medication</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>What medication did you take today?</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fexofenadine"
                        name="medication"
                        value="fexofenadine"
                      />
                      <Label htmlFor="fexofenadine" className="font-normal">
                        Fexofenadine
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cetirizine"
                        name="medication"
                        value="cetirizine"
                      />
                      <Label htmlFor="cetirizine" className="font-normal">
                        Cetirizine
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="loratadine"
                        name="medication"
                        value="loratadine"
                      />
                      <Label htmlFor="loratadine" className="font-normal">
                        Loratadine
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nasal-spray"
                        name="medication"
                        value="nasal_spray"
                      />
                      <Label htmlFor="nasal-spray" className="font-normal">
                        Nasal Spray
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="eye-drops"
                        name="medication"
                        value="eye_drops"
                      />
                      <Label htmlFor="eye-drops" className="font-normal">
                        Eye Drops
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="none" name="medication" value="none" />
                      <Label htmlFor="none" className="font-normal">
                        None
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medication-effectiveness">
                    How effective was your medication today?
                  </Label>
                  <RadioGroup
                    id="medication-effectiveness"
                    name="medication_effectiveness"
                    defaultValue="n/a"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="not_effective"
                        id="not-effective"
                      />
                      <Label htmlFor="not-effective" className="font-normal">
                        Not Effective
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="somewhat_effective"
                        id="somewhat-effective"
                      />
                      <Label
                        htmlFor="somewhat-effective"
                        className="font-normal"
                      >
                        Somewhat Effective
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="very_effective"
                        id="very-effective"
                      />
                      <Label htmlFor="very-effective" className="font-normal">
                        Very Effective
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="n/a" id="n/a" />
                      <Label htmlFor="n/a" className="font-normal">
                        N/A
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Activities</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="outdoor-time">
                    Time spent outdoors (hours)
                  </Label>
                  <Input
                    id="outdoor-time"
                    name="outdoor_time"
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Activities</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="walking"
                        name="activities"
                        value="walking"
                      />
                      <Label htmlFor="walking" className="font-normal">
                        Walking
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="gardening"
                        name="activities"
                        value="gardening"
                      />
                      <Label htmlFor="gardening" className="font-normal">
                        Gardening
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="exercise"
                        name="activities"
                        value="exercise"
                      />
                      <Label htmlFor="exercise" className="font-normal">
                        Exercise
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hiking" name="activities" value="hiking" />
                      <Label htmlFor="hiking" className="font-normal">
                        Hiking
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any other details about your day..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Entry"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
