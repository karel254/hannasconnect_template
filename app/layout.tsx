import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import ClientLayout from "./ClientLayout"
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister"
import OfflineWrapper from "@/components/OfflineWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hanna's Connect - Find Your Perfect Match",
  description: "Connect with like-minded people and find meaningful relationships",
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
        <ServiceWorkerRegister />
        <OfflineWrapper>
          <ClientLayout>{children}</ClientLayout>
        </OfflineWrapper>
        <Toaster />
      </body>
    </html>
  )
}
