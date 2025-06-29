"use client"

import type React from "react"

import { Toaster } from "@/components/ui/toaster"

export function ClientThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

export default ClientThemeWrapper
