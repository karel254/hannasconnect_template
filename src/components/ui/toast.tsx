"use client"

import React from "react"

import * as ToastPrimitive from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* ---------- Styles -------------------------------------------------------- */
const toastRootVariants = cva(
  "pointer-events-auto flex w-[360px] items-center justify-between rounded-md border p-4 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border",
        destructive: "bg-red-600/90 text-white border-red-600",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

export interface ToastRootProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastRootVariants> {}

const ToastRoot = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastRootProps>(
  ({ className, variant, ...props }, ref) => (
    <ToastPrimitive.Root ref={ref} className={cn(toastRootVariants({ variant }), className)} {...props} />
  ),
)
ToastRoot.displayName = ToastPrimitive.Root.displayName

/* ---------- Slots --------------------------------------------------------- */
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn("text-sm font-medium", className)} {...props} />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

const ToastClose = ToastPrimitive.Close
const ToastViewport = ToastPrimitive.Viewport
const ToastProvider = ToastPrimitive.Provider

export { ToastRoot as Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport, ToastProvider }
