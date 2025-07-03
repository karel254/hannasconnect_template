"use client"

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface ToastData {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */
interface ToastContextShape {
  toasts: ToastData[]
  push: (toast: Omit<ToastData, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextShape | null>(null)

/* -------------------------------------------------------------------------- */
/*                                  Provider                                  */
/* -------------------------------------------------------------------------- */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const push = useCallback((toast: Omit<ToastData, "id">) => {
    setToasts((prev) => [...prev, { ...toast, id: crypto.randomUUID() }])
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const value = React.useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

/* -------------------------------------------------------------------------- */
/*                                    Hook                                    */
/* -------------------------------------------------------------------------- */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>")
  }
  return ctx
}
