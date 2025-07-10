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
  const [theme, setTheme] = useState("system")
  const [mounted, setMounted] = useState(false)
  const [systemTheme, setSystemTheme] = useState("light")

  // Detect system theme and listen for changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light")
    }
    
    // Set initial system theme
    updateSystemTheme()
    
    // Listen for system theme changes
    mediaQuery.addEventListener("change", updateSystemTheme)
    
    return () => mediaQuery.removeEventListener("change", updateSystemTheme)
  }, [])

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Default to system theme
      setTheme("system")
    }
  }, [])

  // Get the effective theme (system theme when theme is "system")
  const effectiveTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    if (!mounted) return
    
    localStorage.setItem("theme", theme)
    
    // Apply the effective theme to the document
    if (effectiveTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [effectiveTheme, theme, mounted])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark"
      if (prevTheme === "dark") return "system"
      return "light"
    })
  }

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return <ThemeContext.Provider value={{ theme: "system", effectiveTheme: "light", toggleTheme }}>{children}</ThemeContext.Provider>
  }

  return <ThemeContext.Provider value={{ theme, effectiveTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}
