"use client"

import { Suspense } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Home, Heart, MessageCircle, User, Search } from "lucide-react"
import { cn } from "@/lib/utils"

function MobileBottomNavigationContent() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Don't show on these pages
  const excludedPaths = ["/", "/blog", "/login", "/register"]
  const isExcluded = excludedPaths.includes(pathname)
  
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
      name: "Browse",
      href: "/browse",
      icon: Search,
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
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex flex-col items-center justify-center w-full py-2 px-1 rounded-lg transition-colors",
                item.active
                  ? "text-[#B22222] dark:text-red-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
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