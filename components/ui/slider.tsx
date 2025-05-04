"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, max = 4, ...props }, ref) => {
  // Calculate the gradient based on the current value
  const getProgressiveGradient = (value: number[] | undefined): React.CSSProperties => {
    if (!value || value.length === 0) return { width: "0%" };

    const currentValue = value[0];
    const percentage = (currentValue / max) * 100;

    // Define color stops based on the current value
    let gradient = "rgb(34 197 94)"; // Start with green

    if (currentValue > 1.5) {
      // Add yellow transition when we're past 1.5
      gradient = `linear-gradient(to right, 
        rgb(34 197 94) 0%,
        rgb(234 179 8) 100%)`;
    }

    if (currentValue > 2.5) {
      // Add orange transition when we're past 2.5
      gradient = `linear-gradient(to right, 
        rgb(34 197 94) 0%,
        rgb(234 179 8) 50%,
        rgb(249 115 22) 100%)`;
    }

    if (currentValue > 3.5) {
      // Add red transition when we're past 3.5
      gradient = `linear-gradient(to right, 
        rgb(34 197 94) 0%,
        rgb(234 179 8) 33%,
        rgb(249 115 22) 66%,
        rgb(239 68 68) 100%)`;
    }

    return {
      width: `${percentage}%`,
      background: gradient,
    };
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      value={value}
      max={max}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range
          className="absolute h-full overflow-hidden transition-all"
          style={getProgressiveGradient(value)}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
