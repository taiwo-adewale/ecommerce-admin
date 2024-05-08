import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.625rem] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground",
        destructive:
          "border-transparent bg-red-200 text-red-600 dark:bg-destructive dark:text-red-200",
        success:
          "border-transparent bg-green-200 text-green-600 dark:bg-green-600 dark:text-green-200",
        warning:
          "border-transparent bg-yellow-200 text-yellow-600 dark:bg-yellow-600 dark:text-yellow-200",
        processing:
          "border-transparent bg-blue-200 text-blue-600 dark:bg-blue-600 dark:text-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type BadgeVariantProps = Exclude<
  VariantProps<typeof badgeVariants>["variant"],
  null | undefined
>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
