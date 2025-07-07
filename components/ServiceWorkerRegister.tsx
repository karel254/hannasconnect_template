"use client"
import { useEffect } from "react"

export default function ServiceWorkerRegister() {
  useEffect(() => {
    // If on offline.html and online, immediately redirect
    if (typeof window !== "undefined") {
      if (window.location.pathname === '/offline.html' && navigator.onLine) {
        const lastPath = localStorage.getItem('lastOnlinePath') || '/';
        window.location.href = lastPath;
      }
      // Listen for coming back online on any page
      window.addEventListener('online', () => {
        if (window.location.pathname === '/offline.html') {
          const lastPath = localStorage.getItem('lastOnlinePath') || '/';
          window.location.href = lastPath;
        }
      });
    }

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