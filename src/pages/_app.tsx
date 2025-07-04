import type { AppProps } from "next/app"
import { ThemeProvider } from "@/src/contexts/theme-context"
import { Toaster } from "@/src/components/ui/toaster"
import "@/src/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  )
}
