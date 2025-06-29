"use client"

import { usePathname } from "next/navigation"
import Footer from "@/components/footer"

export function ConditionalFooter() {
  const pathname = usePathname()

  // Don't show footer on home page
  if (pathname === "/") {
    return null
  }

  return <Footer />
}
