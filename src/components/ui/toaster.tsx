"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

/**
 * Renders all active toasts. Must be placed inside <ToastProvider>.
 */
export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, title, description, action, variant }) => (
        <Toast key={id} variant={variant} duration={4000} onOpenChange={(open) => !open && dismiss(id)}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose aria-label="Close">
            <X className="h-4 w-4" />
          </ToastClose>
        </Toast>
      ))}
      <ToastViewport className="fixed bottom-0 right-0 z-[100] m-4 flex flex-col gap-2" />
    </ToastProvider>
  )
}
