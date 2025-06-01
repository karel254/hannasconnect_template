import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hanna's Connect | Meaningful Connections",
  description: "A dating platform that prioritizes privacy, intentionality, and meaningful connections.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
          <footer className="bg-[#f5f5f5] text-gray-700 py-8 px-4 md:px-6 border-t border-gray-200">
            <div className="container mx-auto max-w-7xl">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-3 text-[#B22222]">Hanna's Connect</h3>
                  <p className="opacity-80">
                    A dating platform that prioritizes privacy, intentionality, and meaningful connections.
                  </p>
                  <p className="mt-2 italic opacity-80">Clarity Before Chemistry</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3 text-[#B22222]">Quick Links</h3>
                  <ul className="space-y-1 opacity-80">
                    <li>
                      <a href="/about" className="hover:text-[#B22222] transition-colors">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="/privacy" className="hover:text-[#B22222] transition-colors">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="/terms" className="hover:text-[#B22222] transition-colors">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="hover:text-[#B22222] transition-colors">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3 text-[#B22222]">Connect With Us</h3>
                  <p className="opacity-80 mb-3">Have questions or feedback? We'd love to hear from you.</p>
                  <a
                    href="/contact"
                    className="inline-block px-4 py-2 border border-[#B22222] text-[#B22222] rounded-md hover:bg-[#B22222] hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
              <div className="border-t border-gray-300 mt-8 pt-4 text-center opacity-80">
                <p>&copy; 2019-2025 Huppy People. All Rights Reserved.</p>
                <p className="text-sm mt-1">Developed by Karel254.</p>
              </div>
            </div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
