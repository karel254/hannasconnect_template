import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

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
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/heart-key-bg.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/images/heart-key-bg.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/images/heart-key-bg.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/images/heart-key-bg.png" sizes="180x180" />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
