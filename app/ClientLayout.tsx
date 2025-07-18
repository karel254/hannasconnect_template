"use client"

import type React from "react"
import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "../contexts/theme-context.js"
import { Toaster } from "../components/ui/toaster"
import { MobileBottomNavigation } from "../components/mobile-bottom-navigation"
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister"
import OfflineWrapper from "@/components/OfflineWrapper"
import PersistentLogin from "@/components/PersistentLogin"
import { PushNotificationPermission } from "@/components/PushNotificationPermission"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className={`${inter.className} bg-background text-foreground transition-colors duration-300`}>
        <PersistentLogin />
        <ServiceWorkerRegister />
        <OfflineWrapper>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1 pb-20">{children}</main>
          </div>
          <MobileBottomNavigation />
          <PushNotificationPermission />
        </OfflineWrapper>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}
