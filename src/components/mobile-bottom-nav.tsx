"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Users, MessageCircle, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function MobileBottomNav() {
  const pathname = usePathname()
  const [isSignedIn, setIsSignedIn] = useState(false)

  // Check if user is signed in by looking at localStorage or current path
  useEffect(() => {
    // Check if user has visited authenticated pages (simple auth simulation)
    const hasVisitedAuthPages = localStorage.getItem("hasVisitedAuthPages") === "true"
    const isOnAuthPage = ["/dashboard", "/messages", "/browse", "/profile", "/members", "/notifications"].includes(
      pathname,
    )

    if (isOnAuthPage) {
      localStorage.setItem("hasVisitedAuthPages", "true")
      setIsSignedIn(true)
    } else if (hasVisitedAuthPages) {
      setIsSignedIn(true)
    }
  }, [pathname])

  // Hide navigation on authentication pages and landing page
  const hiddenPages = ["/", "/login", "/register", "/forgot-password"]

  // For blog pages, only show navigation if user is signed in
  const isBlogPage = pathname.startsWith("/blog")

  if (hiddenPages.includes(pathname)) {
    return null
  }

  // Hide blog navigation for non-signed in users
  if (isBlogPage && !isSignedIn) {
    return null
  }

  // Sample unread messages count - in a real app, this would come from your state management
  const unreadMessagesCount = 3

  const navItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Home",
      active: pathname === "/dashboard",
    },
    {
      href: "/browse",
      icon: Users,
      label: "Browse",
      active: pathname === "/browse",
    },
    {
      href: "/messages",
      icon: MessageCircle,
      label: "Messages",
      active: pathname === "/messages",
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
    },
    {
      href: "/profile",
      icon: User,
      label: "Profile",
      active: pathname === "/profile",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors relative ${
                item.active
                  ? "text-[#B22222] dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                  : "text-gray-600 dark:text-gray-400 hover:text-[#B22222] dark:hover:text-red-400"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5 mb-1" />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 bg-[#B22222] text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 border-2 border-white dark:border-gray-800">
                    {item.badge > 99 ? "99+" : item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default MobileBottomNav
