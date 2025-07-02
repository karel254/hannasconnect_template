"use client"

import { usePathname } from "next/navigation"
import Footer from "@/components/footer"

/**
 * Renders <Footer /> on every page except the landing page ("/").
 * Useful when the landing page already has its own custom footer section.
 */
export default function ConditionalFooter() {
  const pathname = usePathname()
  if (pathname === "/") return null
  return <Footer />
}
