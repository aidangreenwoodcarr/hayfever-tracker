import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SeverityLevel, EffectivenessRating } from "./types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getSeverityLabel(value: number): SeverityLevel {
  if (value <= 0) return "None";
  if (value <= 1) return "Mild";
  if (value <= 2) return "Moderate";
  if (value <= 3) return "Severe";
  return "Very Severe";
}

export function getSeverityColor(value: number): string {
  if (value <= 0) return "text-green-600";
  if (value <= 1) return "text-green-500";
  if (value <= 2) return "text-yellow-600";
  if (value <= 3) return "text-orange-600";
  return "text-red-600";
}

export function getEffectivenessColor(rating: EffectivenessRating): string {
  if (rating === "High") return "text-green-600";
  if (rating === "Medium") return "text-yellow-600";
  return "text-red-600";
}

export function formatMedicationName(name: string): string {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, "");
}
