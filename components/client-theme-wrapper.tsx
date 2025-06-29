"use client"

import type React from "react"
import { ThemeProvider } from "@/contexts/theme-context"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import ConditionalFooter from "@/components/conditional-footer"

export default function ClientThemeWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <ConditionalFooter />
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
