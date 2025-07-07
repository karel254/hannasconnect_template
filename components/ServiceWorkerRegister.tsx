"use client"
import { useEffect } from "react"

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").catch((err) => {
          console.log("Service worker registration failed:", err)
        })
      })
    }
  }, [])
  return null
} 