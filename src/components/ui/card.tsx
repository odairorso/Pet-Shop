import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {variant?: 'default' | 'blue' | 'red' | 'green' | 'purple' | 'orange' | 'teal' | 'magenta'}>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: "bg-card border-border",
    blue: "bg-blue-vivid border-blue-vivid",
    red: "bg-red-vivid border-red-vivid", 
    green: "bg-green-vivid border-green-vivid",
    purple: "bg-purple-vivid border-purple-vivid",
    orange: "bg-orange-vivid border-orange-vivid",
    teal: "bg-teal-vivid border-teal-vivid",
    magenta: "bg-magenta-vivid border-magenta-vivid",
  };
  
  return (
    <div 
      ref={ref} 
      className={cn("rounded-lg border text-white shadow-card transition-all duration-300 hover:scale-105", variantClasses[variant], className)} 
      {...props} 
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
