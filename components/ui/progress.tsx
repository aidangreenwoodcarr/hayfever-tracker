"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: "default" | "pollen";
    value?: number;
  }
>(({ className, value, variant = "default", ...props }, ref) => {
  // Get color based on pollen value (0-100 percentage scale)
  const getPollenColor = (percentage: number) => {
    if (percentage < 40) return "bg-green-500"; // Low (0-2)
    if (percentage < 70) return "bg-yellow-500"; // Moderate (2-3.5)
    if (percentage < 90) return "bg-orange-500"; // High (3.5-4.5)
    return "bg-red-500"; // Very High (4.5-5)
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          variant === "default" ? "bg-primary" : getPollenColor(value || 0)
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
