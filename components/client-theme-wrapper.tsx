"use client"

import type React from "react"

import { ThemeProvider } from "@/contexts/theme-context"

export function ClientThemeWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

export default ClientThemeWrapper
