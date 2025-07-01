import "@/styles/globals.css"

import type { AppProps } from "next/app"

import { ThemeProvider } from "@/contexts/theme-context"
import { Toaster } from "@/components/ui/toaster"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      {/* Global toast notifications */}
      <Toaster />
      {/* Bottom navigation (hidden automatically on /, /login, /register) */}
      <MobileBottomNav />
    </ThemeProvider>
  )
}
