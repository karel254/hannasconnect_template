import type { AppProps } from "next/app"
import { ThemeProvider } from "@/src/contexts/theme-context"
import { Toaster } from "@/src/components/ui/toaster"
import "@/src/styles/globals.css"
import { ToastProvider } from "@/hooks/use-toast"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Component {...pageProps} />
        <Toaster />
      </ToastProvider>
    </ThemeProvider>
  )
}
