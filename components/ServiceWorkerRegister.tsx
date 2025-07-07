"use client"
import { useEffect } from "react"

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(reg => {
          if (reg.waiting) {
            window.location.reload();
          }
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (
                  installingWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  window.location.reload();
                }
              };
            }
          };
        }).catch((err) => {
          console.log("Service worker registration failed:", err)
        })
      })
    }
  }, [])
  return null
} 