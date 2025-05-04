import { useState, useEffect } from "react";
import { getRecentEntries } from "@/lib/actions";
import type { RecentStats, SymptomEntry } from "@/lib/types";

export function useSymptomStats(days: number = 7) {
  const [stats, setStats] = useState<RecentStats>({
    sneezing: 0,
    itchyEyes: 0,
    congestion: 0,
    headache: 0,
    medicationEffectiveness: {},
    hasData: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const entries = await getRecentEntries(days);

        if (entries.length === 0) {
          setLoading(false);
          return;
        }

        const stats = calculateStats(entries);
        setStats(stats);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch statistics")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [days]);

  return { stats, loading, error };
}

function calculateStats(entries: SymptomEntry[]): RecentStats {
  const totals = {
    sneezing: 0,
    itchyEyes: 0,
    congestion: 0,
    headache: 0,
  };

  const medications: Record<string, { count: number; effective: number }> = {};

  for (const entry of entries) {
    totals.sneezing += entry.sneezing;
    totals.itchyEyes += entry.itchyEyes;
    totals.congestion += entry.congestion;
    totals.headache += entry.headache;

    for (const med of entry.medications) {
      if (!medications[med]) {
        medications[med] = { count: 0, effective: 0 };
      }
      medications[med].count += 1;

      if (
        entry.medicationEffectiveness === "somewhat_effective" ||
        entry.medicationEffectiveness === "very_effective"
      ) {
        medications[med].effective += 1;
      }
    }
  }

  const averages = {
    sneezing: Math.round(totals.sneezing / entries.length),
    itchyEyes: Math.round(totals.itchyEyes / entries.length),
    congestion: Math.round(totals.congestion / entries.length),
    headache: Math.round(totals.headache / entries.length),
  };

  const medEffectiveness: Record<
    string,
    { count: number; effectiveness: string }
  > = {};
  for (const [med, data] of Object.entries(medications)) {
    const effectivenessRate = data.effective / data.count;
    const rating =
      effectivenessRate >= 0.8
        ? "High"
        : effectivenessRate >= 0.5
        ? "Medium"
        : "Low";

    medEffectiveness[med] = {
      count: data.count,
      effectiveness: rating,
    };
  }

  return {
    ...averages,
    medicationEffectiveness: medEffectiveness,
    hasData: true,
  };
}
