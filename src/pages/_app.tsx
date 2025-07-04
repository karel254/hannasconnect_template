import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "@/contexts/theme-context"
import { ToastProvider, ToastViewport } from "@/hooks/use-toast"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="antialiased">
          <div className="min-h-screen bg-background pb-20">
            <Component {...pageProps} />
          </div>
        </div>

        {/* Toasts render here */}
        <ToastViewport />
      </ToastProvider>
    </ThemeProvider>
  )
}
