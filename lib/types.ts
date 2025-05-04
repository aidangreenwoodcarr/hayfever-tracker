export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface SymptomEntry {
  id: string;
  date: Date;
  sneezing: number;
  itchyEyes: number;
  congestion: number;
  headache: number;
  medications: string[];
  medicationEffectiveness:
    | "not_effective"
    | "somewhat_effective"
    | "very_effective";
  notes?: string;
  pollenCount?: number | null;
  locationAddress?: string | null;
  outdoorTime?: number | null;
  activities: string[];
}

export interface RecentStats {
  sneezing: number;
  itchyEyes: number;
  congestion: number;
  headache: number;
  medicationEffectiveness: Record<
    string,
    { count: number; effectiveness: string }
  >;
  hasData: boolean;
}

export interface PollenData {
  grass: number;
  tree: number;
  weed: number;
  mold: number;
  date: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export type SeverityLevel =
  | "None"
  | "Mild"
  | "Moderate"
  | "Severe"
  | "Very Severe";
export type EffectivenessRating = "High" | "Medium" | "Low";
