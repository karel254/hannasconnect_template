import { useState, useCallback } from "react"

// VAPID public key for push notifications (replace with your own in production)
const VAPID_PUBLIC_KEY = "BEl62iUYgUivxIkv69yViEuiBIa1HmFJxFuipUrC8odJ8Fei8f9zPeirifF4jXhVE6HT3VTvRy4mcTqS6XpAaa7o";

// Utility to convert a base64 VAPID key to a Uint8Array for PushManager
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// Custom React hook for push notification registration and subscription
export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check if push notifications are supported in the browser
  const checkSupport = useCallback(() => {
    const supported = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window
    setIsSupported(supported)
    return supported
  }, [])

  // Request notification permission from the user
  const requestPermission = useCallback(async () => {
    if (!checkSupport()) return false
    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === "granted"
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      return false
    }
  }, [checkSupport])

  // Subscribe the user to push notifications and send the subscription to the backend
  const subscribe = useCallback(async () => {
    if (!checkSupport() || permission !== "granted") return false
    setIsLoading(true)
    try {
      // Register the service worker (must be at the root for PWA)
      const registration = await navigator.serviceWorker.register("/service-worker.js")
      await navigator.serviceWorker.ready

      // Subscribe to push notifications using the VAPID public key
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      })

      // Send the subscription object to the backend API endpoint
      // The backend should store this subscription and use it to send push messages
      const response = await fetch("/api/push-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pushSubscription)
      })

      if (response.ok) {
        setSubscription(pushSubscription)
        return true
      } else {
        throw new Error("Failed to save subscription")
      }
    } catch (error) {
      console.error("Error subscribing to push notifications:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [checkSupport, permission])

  // Unsubscribe the user from push notifications
  const unsubscribe = useCallback(async () => {
    if (!subscription) return false
    try {
      await subscription.unsubscribe()
      setSubscription(null)
      return true
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error)
      return false
    }
  }, [subscription])

  return {
    isSupported, // Whether push notifications are supported
    permission,  // Notification permission state
    subscription, // Current push subscription object
    isLoading,   // Loading state for async actions
    checkSupport, // Function to check support
    requestPermission, // Function to request permission
    subscribe,   // Function to subscribe
    unsubscribe  // Function to unsubscribe
  }
} 