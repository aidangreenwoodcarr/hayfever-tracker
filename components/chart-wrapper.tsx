"use client";

import React, { useState, useEffect } from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
  height?: number;
  failMessage?: string;
}

/**
 * A wrapper component for charts that handles common loading, error,
 * and visibility issues with chart libraries in React
 */
export default function ChartWrapper({
  children,
  height = 300,
  failMessage = "Failed to load chart. Please try again later.",
}: ChartWrapperProps): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Error boundary functionality
  useEffect(() => {
    const handleError = (event: ErrorEvent): void => {
      console.error("[ChartWrapper] Caught error:", event.error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    setMounted(true);

    return (): void => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div
        className="flex flex-col items-center justify-center text-red-500 border border-red-200 rounded-md bg-red-50"
        style={{ height: `${height}px` }}
      >
        <p>{failMessage}</p>
        <button
          className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            setHasError(false);
            window.location.reload();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div
        className="flex items-center justify-center text-muted-foreground animate-pulse"
        style={{ height: `${height}px` }}
      >
        Loading chart...
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      {children}
    </div>
  );
}
