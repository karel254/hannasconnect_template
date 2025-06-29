import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientThemeWrapper from "@/components/client-theme-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hanna's Connect - Clarity Before Chemistry",
  description: "Where meaningful connections begin. Privacy-first dating for intentional singles.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientThemeWrapper>{children}</ClientThemeWrapper>
      </body>
    </html>
  )
}
