import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Skeleton – a simple loading placeholder.
 *
 * Props:
 * • className – utility classes for width/height/radius etc.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("animate-pulse rounded-md bg-gray-300/50 dark:bg-gray-700/50", className)}
      {...props}
    />
  ),
)
Skeleton.displayName = "Skeleton"
