"use client"

import type React from "react"
import { Inter } from "next/font/google"

import "./globals.css"
import Navbar from "@/components/navbar"
import ConditionalFooter from "@/components/conditional-footer"
import { ThemeProvider } from "@/contexts/theme-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground transition-colors duration-300`}>
        {/* ThemeProvider supplies the context required by useTheme() */}
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <ConditionalFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
