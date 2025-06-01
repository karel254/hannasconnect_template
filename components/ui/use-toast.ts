"use client"

// Adapted from: https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/ui/use-toast.ts
import { useState, useEffect, useCallback, type ReactNode } from "react"

export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: ReactNode
  variant?: "default" | "destructive"
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps & {
  open: boolean
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type Toast = Omit<ToasterToast, "id">

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([])

  const dismiss = useCallback((toastId: string) => {
    setToasts((toasts) =>
      toasts.map((toast) =>
        toast.id === toastId
          ? {
              ...toast,
              open: false,
            }
          : toast,
      ),
    )
  }, [])

  const dismissAll = useCallback(() => {
    setToasts((toasts) =>
      toasts.map((toast) => ({
        ...toast,
        open: false,
      })),
    )
  }, [])

  const toast = useCallback(({ ...props }: Toast) => {
    const id = genId()

    setToasts((toasts) => [
      {
        ...props,
        id,
        open: true,
      },
      ...toasts.slice(0, TOAST_LIMIT - 1),
    ])

    return id
  }, [])

  const update = useCallback((toastId: string, { ...props }: Toast) => {
    setToasts((toasts) =>
      toasts.map((toast) =>
        toast.id === toastId
          ? {
              ...toast,
              ...props,
              open: true,
            }
          : toast,
      ),
    )
  }, [])

  useEffect(() => {
    const timeouts = new Map<string, ReturnType<typeof setTimeout>>()

    toasts
      .filter((toast) => !toast.open)
      .forEach((toast) => {
        if (timeouts.has(toast.id)) {
          return
        }

        const timeout = setTimeout(() => {
          setToasts((toasts) => toasts.filter((t) => t.id !== toast.id))
          timeouts.delete(toast.id)
        }, TOAST_REMOVE_DELAY)

        timeouts.set(toast.id, timeout)
      })

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [toasts])

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
    update,
  }
}
