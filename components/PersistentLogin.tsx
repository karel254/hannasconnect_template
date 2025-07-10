"use client"
import { useEffect } from "react"
import Cookies from "js-cookie"

// --- Persistent login: restore from cookie if needed ---
// Backend devs: This ensures the user stays logged in across sessions.
export default function PersistentLogin() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieUser = Cookies.get("demoUser")
      const localUser = localStorage.getItem("demoUser")
      if (cookieUser && !localUser) {
        localStorage.setItem("demoUser", cookieUser)
        try {
          const parsed = JSON.parse(cookieUser)
          if (parsed.username) {
            localStorage.setItem("userUsername", parsed.username)
          }
        } catch {}
      }
    }
  }, [])
  return null // This component does not render anything
} 