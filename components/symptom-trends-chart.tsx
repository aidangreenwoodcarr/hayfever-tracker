"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Chart, registerables } from "chart.js";
import { getPollenData } from "@/lib/pollen-api";
import { getCurrentLocation } from "@/lib/geolocation";
import { getAllEntries } from "@/lib/actions";
import { format, subDays, parseISO } from "date-fns";

// Ensure Chart.js is properly registered
try {
  Chart.register(...registerables);
} catch (error) {
  console.error("[Chart] Error registering Chart.js:", error);
}

export default function SymptomTrendsChart(): React.ReactElement {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createPlaceholderChart = useCallback((): void => {
    // Create a chart with placeholder data if no real data is available
    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) =>
      format(subDays(today, 6 - i), "MMM d")
    );

    const sneezingData = [2, 3, 4, 3, 2, 3, 4];
    const itchyEyesData = [1, 2, 4, 3, 2, 2, 3];
    const congestionData = [1, 2, 3, 2, 1, 2, 3];
    const headacheData = [0, 1, 2, 1, 0, 1, 2];
    const pollenData = [3.2, 4.1, 4.8, 3.9, 2.7, 3.5, 4.2];

    createChart(
      dates,
      sneezingData,
      itchyEyesData,
      congestionData,
      headacheData,
      pollenData
    );
  }, []);

  const fetchDataAndCreateChart = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Get entries from database
      const entries = await getAllEntries();

      // Ensure dates are properly parsed - fix for 1/1/1970 issue
      const entriesWithFixedDates = entries.map((entry) => ({
        ...entry,
        date:
          typeof entry.date === "string"
            ? parseISO(entry.date)
            : new Date(entry.date),
      }));

      // Sort entries by date (ascending)
      const sortedEntries = [...entriesWithFixedDates].sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );

      // Get last 7 days or fewer if not enough entries
      const lastEntries = sortedEntries.slice(-7);

      // If no entries, use placeholder data
      if (lastEntries.length === 0) {
        createPlaceholderChart();
        return;
      }

      // Format dates for display
      const dates = lastEntries.map((entry) => format(entry.date, "MMM d"));

      // Extract symptom data
      const sneezingData = lastEntries.map((entry) => entry.sneezing);
      const itchyEyesData = lastEntries.map((entry) => entry.itchyEyes);
      const congestionData = lastEntries.map((entry) => entry.congestion);
      const headacheData = lastEntries.map((entry) => entry.headache);

      // Get pollen data if available, or use placeholder
      let pollenData = lastEntries.map((entry) => entry.pollenCount || null);

      // If we don't have pollen data for some entries, try to fetch it
      if (pollenData.some((val) => val === null)) {
        try {
          // Get current pollen data
          const currentLocation = await getCurrentLocation();
          const currentPollenData = await getPollenData(currentLocation);

          // Calculate average pollen level from all types
          if (currentPollenData.length > 0) {
            const currentAverage =
              currentPollenData.reduce((sum, item) => sum + item.value, 0) /
              currentPollenData.length;

            // Update null values with estimated pollen levels
            pollenData = pollenData.map((val) => {
              if (val !== null) return val;
              const variation = Math.random() * 1.5 - 0.75;
              return Math.max(0, Math.min(5, currentAverage + variation));
            });
          }
        } catch (error) {
          console.error("[Chart] Error fetching pollen data:", error);
          // Fill with placeholder data if error
          pollenData = pollenData.map((val) => val ?? Math.random() * 5);
        }
      }

      createChart(
        dates,
        sneezingData,
        itchyEyesData,
        congestionData,
        headacheData,
        pollenData
      );
    } catch (error) {
      console.error("[Chart] Error in fetchDataAndCreateChart:", error);
      setError("Failed to fetch data. Please try again later.");
      createPlaceholderChart();
    }
  }, [createPlaceholderChart]);

  useEffect(() => {
    // We need a slight delay to ensure the canvas is properly mounted in the DOM
    const timer = setTimeout(() => {
      if (!chartRef.current) {
        console.error("[Chart] Chart canvas reference is not available");
        setError("Chart canvas reference is not available");
        setIsLoading(false);
        return;
      }

      void fetchDataAndCreateChart();
    }, 500); // Increased delay to ensure DOM is fully ready

    return (): void => {
      clearTimeout(timer);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [fetchDataAndCreateChart]);

  function createChart(
    dates: string[],
    sneezingData: number[],
    itchyEyesData: number[],
    congestionData: number[],
    headacheData: number[],
    pollenData: (number | null)[]
  ): void {
    // Double check canvas exists and is accessible
    if (!chartRef.current) {
      console.error(
        "[Chart] Canvas element is not available for chart creation"
      );
      setError("Canvas element is not available");
      setIsLoading(false);
      return;
    }

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) {
      console.error("[Chart] Could not get 2D context from canvas");
      setError("Could not get 2D context from canvas");
      setIsLoading(false);
      return;
    }

    try {
      // Improved color palette with better visibility and contrast
      const colors = {
        pollen: {
          border: "rgb(255, 196, 0)",
          background: "rgba(255, 196, 0, 0.2)",
        },
        sneezing: {
          border: "rgb(52, 152, 219)",
          background: "rgba(52, 152, 219, 0.2)",
        },
        itchyEyes: {
          border: "rgb(46, 204, 113)",
          background: "rgba(46, 204, 113, 0.2)",
        },
        congestion: {
          border: "rgb(231, 76, 60)",
          background: "rgba(231, 76, 60, 0.2)",
        },
        headache: {
          border: "rgb(155, 89, 182)",
          background: "rgba(155, 89, 182, 0.2)",
        },
      };

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Pollen Count",
              data: pollenData,
              borderColor: colors.pollen.border,
              backgroundColor: colors.pollen.background,
              borderWidth: 3,
              tension: 0.3,
              yAxisID: "y1",
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: colors.pollen.border,
            },
            {
              label: "Sneezing",
              data: sneezingData,
              borderColor: colors.sneezing.border,
              backgroundColor: colors.sneezing.background,
              borderWidth: 2,
              tension: 0.3,
              yAxisID: "y",
              pointRadius: 4,
              pointHoverRadius: 6,
            },
            {
              label: "Itchy Eyes",
              data: itchyEyesData,
              borderColor: colors.itchyEyes.border,
              backgroundColor: colors.itchyEyes.background,
              borderWidth: 2,
              tension: 0.3,
              yAxisID: "y",
              pointRadius: 4,
              pointHoverRadius: 6,
            },
            {
              label: "Congestion",
              data: congestionData,
              borderColor: colors.congestion.border,
              backgroundColor: colors.congestion.background,
              borderWidth: 2,
              tension: 0.3,
              yAxisID: "y",
              pointRadius: 4,
              pointHoverRadius: 6,
            },
            {
              label: "Headache",
              data: headacheData,
              borderColor: colors.headache.border,
              backgroundColor: colors.headache.background,
              borderWidth: 2,
              tension: 0.3,
              yAxisID: "y",
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
                padding: 15,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: 10,
              cornerRadius: 6,
              titleFont: {
                size: 14,
                weight: "bold",
              },
              bodyFont: {
                size: 13,
              },
              boxPadding: 5,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                padding: 8,
                font: {
                  size: 11,
                },
              },
            },
            y: {
              type: "linear",
              display: true,
              position: "left",
              title: {
                display: true,
                text: "Symptom Severity (0-4)",
                font: {
                  size: 12,
                  weight: 500,
                },
                padding: { top: 0, bottom: 10 },
              },
              min: 0,
              max: 4,
              ticks: {
                stepSize: 1,
                padding: 8,
                font: {
                  size: 11,
                },
              },
              grid: {
                color: "rgba(150, 150, 150, 0.1)",
              },
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",
              title: {
                display: true,
                text: "Pollen Count",
                font: {
                  size: 12,
                  weight: 500,
                },
                padding: { top: 0, bottom: 10 },
              },
              min: 0,
              max: 5,
              grid: {
                drawOnChartArea: false,
                color: "rgba(150, 150, 150, 0.1)",
              },
              ticks: {
                padding: 8,
                font: {
                  size: 11,
                },
              },
            },
          },
        },
      });

      // Important: Use a small delay to ensure the chart has been properly initialized
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    } catch (error) {
      console.error("[Chart] Error creating chart:", error);
      setError(
        `Error creating chart: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-[350px] relative rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10 backdrop-blur-sm">
          <div className="text-muted-foreground flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-t-blue-500 rounded-full animate-spin mb-2"></div>
            <span>Loading chart data...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 p-4">
          <p className="text-red-500 mb-2 text-center">{error}</p>
          <button
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={(): void => {
              void fetchDataAndCreateChart();
            }}
          >
            Retry
          </button>
        </div>
      )}
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
}
