import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[18px] font-semibold tracking-[0.02em] tabular-nums transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold) focus-visible:ring-2 focus-visible:ring-(--gold) focus-visible:ring-offset-2 focus-visible:ring-offset-(--paper) disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-(--gold) text-(--ink) hover:bg-(--gold-light) active:translate-y-px",
        primary: "bg-(--gold) text-(--ink) hover:bg-(--gold-light) active:translate-y-px",
        gold: "bg-(--gold) text-(--ink) hover:bg-(--gold-light) active:translate-y-px",
        outline:
          "border border-(--rule-accent) bg-transparent text-(--slate) hover:border-(--gold-border) hover:bg-(--ink-3) hover:text-(--ink)",
        ghost: "text-(--slate) hover:bg-(--ink-3) hover:text-(--ink)",
        secondary:
          "border border-(--rule-accent) bg-(--ink-2) text-(--ink) hover:bg-(--ink-3) hover:border-(--gold-border)",
        emerald: "bg-(--emerald) text-(--ink) hover:opacity-90 active:translate-y-px",
        destructive: "bg-(--rose) text-(--ink) hover:opacity-90 active:translate-y-px",
        link: "text-[18px] font-semibold text-(--gold) underline-offset-4 hover:text-(--gold-light) hover:underline normal-case tracking-normal min-h-11",
      },
      size: {
        default: "min-h-11 px-5 py-3 text-[18px]",
        sm: "min-h-11 px-4 text-[16px]",
        lg: "min-h-11 px-6 text-[18px]",
        xl: "min-h-14 px-8 text-[18px]",
        icon: "min-h-11 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
