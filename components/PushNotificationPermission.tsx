"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bell, X } from "lucide-react"
import { usePushNotifications } from "@/hooks/usePushNotifications"

interface PushNotificationPermissionProps {
  onPermissionChange?: (granted: boolean) => void
}

export function PushNotificationPermission({ onPermissionChange }: PushNotificationPermissionProps) {
  const [showDialog, setShowDialog] = useState(false)
  const { isSupported, permission, requestPermission, subscribe, isLoading } = usePushNotifications()

  useEffect(() => {
    // Show dialog if supported and permission not granted
    if (isSupported && permission === "default") {
      setShowDialog(true)
    }
  }, [isSupported, permission])

  const handleAccept = async () => {
    const granted = await requestPermission()
    if (granted) {
      const subscribed = await subscribe()
      if (subscribed) {
        setShowDialog(false)
        onPermissionChange?.(true)
      }
    }
  }

  const handleDeny = () => {
    setShowDialog(false)
    onPermissionChange?.(false)
  }

  if (!isSupported || permission !== "default") {
    return null
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#B22222]">
            <Bell className="h-5 w-5" />
            Enable Push Notifications
          </DialogTitle>
          <DialogDescription>
            Stay updated with new messages and matches! We'll send you notifications when someone messages you or when you get a new match.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>• Get notified when you receive new messages</p>
            <p>• Be the first to know about new matches</p>
            <p>• Never miss important updates</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleAccept} 
              disabled={isLoading}
              className="flex-1 bg-[#B22222] hover:bg-[#8B0000]"
            >
              {isLoading ? "Enabling..." : "Enable Notifications"}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDeny}
              disabled={isLoading}
            >
              Not Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 