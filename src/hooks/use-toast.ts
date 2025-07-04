"use client"

/**
 * Lightweight toast helper used across the app.
 * You can swap this out for a full-featured toast library later;
 * for now it just stores toasts in React state so components can render them.
 */
import * as React from "react"

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export type ToastVariant = "default" | "success" | "destructive"

export interface ToastData {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

/* ------------------------------------------------------------------ */
/* Internal store (React context)                                     */
/* ------------------------------------------------------------------ */
interface ToastContextValue {
  toasts: ToastData[]
  push: (toast: Omit<ToastData, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([])

  const push = React.useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { id, ...toast }])
    },
    [setToasts],
  )

  const dismiss = React.useCallback((id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)), [setToasts])

  const value = React.useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

/* ------------------------------------------------------------------ */
/* Public hook + imperative helper                                    */
/* ------------------------------------------------------------------ */
/**
 * useToast() returns an object with a `toast` function that components
 * can call to trigger a toast.
 *
 *   const { toast } = useToast()
 *   toast({ title: "Saved!", variant: "success" })
 */
export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>")
  }
  return {
    toast: (data: Omit<ToastData, "id">) => ctx.push(data),
    dismiss: ctx.dismiss,
    toasts: ctx.toasts,
  }
}

/**
 * Imperative helper for places where hooks can’t be used (e.g. outside React).
 * Falls back to a console message if <ToastProvider> isn’t mounted.
 */
let toastFunction: (data: Omit<ToastData, "id">) => void = (data) => {
  // eslint-disable-next-line no-console
  console.warn("ToastProvider not mounted yet. Toast data:", data)
}

ToastContext.Consumer = ({ children }) => {
  const ctx = React.useContext(ToastContext)
  if (ctx) {
    toastFunction = ctx.push
  }
  return children(ctx)
}

export function toast(data: Omit<ToastData, "id">) {
  toastFunction(data)
}

/* ------------------------------------------------------------------ */
/* Helper component to render the queue                               */
/* ------------------------------------------------------------------ */
export function ToastViewport() {
  const { toasts, dismiss } = useToast()
  return (
    <div className="fixed top-4 right-4 space-y-3 z-[100]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`border rounded-md bg-white dark:bg-gray-800 shadow-lg p-4 max-w-xs ${
            t.variant === "destructive"
              ? "border-red-600"
              : t.variant === "success"
                ? "border-emerald-600"
                : "border-gray-200 dark:border-gray-700"
          }`}
        >
          <div className="font-medium">{t.title}</div>
          {t.description && <p className="text-sm text-muted-foreground">{t.description}</p>}
          <button onClick={() => dismiss(t.id)} className="absolute top-1 right-1 text-xs opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Export provider for app layout                                     */
/* ------------------------------------------------------------------ */
export { ToastProvider }
