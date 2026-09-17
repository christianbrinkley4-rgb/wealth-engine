"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none items-center select-none", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[8px] w-full grow overflow-hidden rounded-full bg-(--rule)">
      <SliderPrimitive.Range className="absolute h-full bg-(--cyan)" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      aria-label="Slider thumb"
      className="block h-6 w-6 rounded-full border-2 border-white bg-(--cyan) shadow-[0_8px_16px_rgba(16,35,63,0.2)] transition-shadow hover:shadow-[0_10px_18px_rgba(16,35,63,0.3)] focus-visible:ring-2 focus-visible:ring-(--gold) focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
