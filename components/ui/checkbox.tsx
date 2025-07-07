"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer border-2 border-gray-300 bg-white ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B22222] focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[#B22222] data-[state=checked]:text-white data-[state=checked]:border-[#B22222]",
      "hover:border-[#B22222] transition-colors duration-200 flex items-center justify-center",
      className,
    )}
    style={{ borderRadius: 0, width: '1rem', height: '1rem', minWidth: '1rem', minHeight: '1rem' }}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3 w-3 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
