"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system")
  const [resolvedTheme, setResolvedTheme] = useState("light")

  // Function to get system theme
  const getSystemTheme = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  }

  // Function to apply theme
  const applyTheme = (themeToApply) => {
    const root = document.documentElement
    if (themeToApply === "dark") {
      root.classList.add("dark")
      setResolvedTheme("dark")
    } else {
      root.classList.remove("dark")
      setResolvedTheme("light")
    }
  }

  useEffect(() => {
    // Get saved theme or default to system
    const savedTheme = localStorage.getItem("theme") || "system"
    setTheme(savedTheme)

    // Apply initial theme
    if (savedTheme === "system") {
      const systemTheme = getSystemTheme()
      applyTheme(systemTheme)
    } else {
      applyTheme(savedTheme)
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemThemeChange = (e) => {
      if (theme === "system") {
        applyTheme(e.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }
  }, [theme])

  const setThemeMode = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    if (newTheme === "system") {
      const systemTheme = getSystemTheme()
      applyTheme(systemTheme)
    } else {
      applyTheme(newTheme)
    }
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setThemeMode("dark")
    } else if (theme === "dark") {
      setThemeMode("system")
    } else {
      setThemeMode("light")
    }
  }

  const setLightTheme = () => setThemeMode("light")
  const setDarkTheme = () => setThemeMode("dark")
  const setSystemTheme = () => setThemeMode("system")

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        toggleTheme,
        setLightTheme,
        setDarkTheme,
        setSystemTheme,
        setTheme: setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
