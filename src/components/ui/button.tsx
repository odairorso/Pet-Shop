import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-primary text-white hover:scale-105 shadow-glow transition-transform",
        "guest": "bg-muted text-muted-foreground hover:bg-muted/80 border border-border",
        "pet-blue": "bg-blue-vivid text-blue-vivid-foreground hover:bg-blue-vivid/90",
        "pet-red": "bg-red-vivid text-red-vivid-foreground hover:bg-red-vivid/90",
        "pet-green": "bg-green-vivid text-green-vivid-foreground hover:bg-green-vivid/90",
        "pet-purple": "bg-purple-vivid text-purple-vivid-foreground hover:bg-purple-vivid/90",
        "pet-orange": "bg-orange-vivid text-orange-vivid-foreground hover:bg-orange-vivid/90",
        "pet-teal": "bg-teal-vivid text-teal-vivid-foreground hover:bg-teal-vivid/90",
        "pet-magenta": "bg-magenta-vivid text-magenta-vivid-foreground hover:bg-magenta-vivid/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
