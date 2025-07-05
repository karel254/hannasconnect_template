"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    localStorage.setItem("theme", theme)
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return <ThemeContext.Provider value={{ theme: "light", toggleTheme }}>{children}</ThemeContext.Provider>
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
