"use client"

import { Suspense, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Home, Heart, MessageCircle, User, Search, Users } from "lucide-react"
import { cn } from "@/lib/utils"

function MobileBottomNavigationContent() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Add state for badge counts
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [pendingRequests, setPendingRequests] = useState(0)

  useEffect(() => {
    // Sample conversations data (should match messages/page.tsx)
    const conversations = [
      { id: "amara", name: "Amara", unread: 2, isConnected: true },
      { id: "kemi", name: "Kemi", unread: 0, isConnected: true },
      { id: "david", name: "David", unread: 1, isConnected: true },
      { id: "funmi", name: "Funmi", unread: 0, isConnected: false },
      { id: "tunde", name: "Tunde", unread: 0, isConnected: true },
    ]
    setUnreadMessages(conversations.reduce((sum, c) => c.isConnected ? sum + (c.unread || 0) : sum, 0))

    // Sample requests data (should match requests/page.tsx)
    const requests = [
      { status: "pending" },
      { status: "pending" },
      { status: "accepted" },
      { status: "rejected" },
    ]
    setPendingRequests(requests.filter(r => r.status === "pending").length)
  }, [])

  // Don't show on these pages
  const excludedPaths = ["/", "/blog", "/login", "/register", "/how-it-works"];
  // Normalize pathname to remove trailing slash for robust matching
  const normalizedPath = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const isExcluded = excludedPaths.includes(normalizedPath);
  
  // Don't show when in a chat (messages page with user parameter)
  const isInChat = pathname === "/messages" && searchParams.get("user")

  if (isExcluded || isInChat) {
    return null
  }

  const navigationItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      name: "Members",
      href: "/browse",
      icon: Users,
      active: pathname === "/browse",
    },
    {
      name: "Requests",
      href: "/requests",
      icon: Heart,
      active: pathname === "/requests",
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageCircle,
      active: pathname === "/messages",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      active: pathname === "/profile",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 bottom-nav-shadow safe-area-pb">
      <div className="flex items-center justify-around px-1 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          // Add badge logic
          let badge = null
          if (item.name === "Requests" && pendingRequests > 0) {
            badge = (
              <span className="absolute -top-1 -right-1 bg-[#B22222] text-white text-xs min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 border border-white dark:border-gray-900 text-[10px]">
                {pendingRequests > 99 ? '99+' : pendingRequests}
              </span>
            )
          }
          if (item.name === "Messages" && unreadMessages > 0) {
            badge = (
              <span className="absolute -top-1 -right-1 bg-[#B22222] text-white text-xs min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 border border-white dark:border-gray-900 text-[10px]">
                {unreadMessages > 99 ? '99+' : unreadMessages}
              </span>
            )
          }
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex flex-col items-center justify-center w-full py-1 px-1 rounded-lg transition-colors relative min-h-[60px]",
                item.active
                  ? "text-[#B22222] dark:text-red-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <span className="relative">
                <Icon className="h-5 w-5 mb-1" />
                {badge}
              </span>
              <span className="text-[10px] font-medium truncate max-w-full">{item.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function MobileBottomNavigation() {
  return (
    <Suspense fallback={null}>
      <MobileBottomNavigationContent />
    </Suspense>
  )
} 