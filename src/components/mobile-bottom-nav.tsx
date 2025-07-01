"use client"

import { useRouter } from "next/router"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Home, Search, MessageCircle, User } from "lucide-react"

export function MobileBottomNav() {
  const router = useRouter()
  const currentPath = router.pathname

  const hideNavPaths = ["/", "/login", "/register"]

  if (hideNavPaths.includes(currentPath)) {
    return null
  }

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/dashboard",
      badge: null,
    },
    {
      icon: Search,
      label: "Browse",
      path: "/browse",
      badge: null,
    },
    {
      icon: MessageCircle,
      label: "Messages",
      path: "/messages",
      badge: 3,
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
      badge: null,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.path

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 min-w-[60px] relative transition-colors",
                isActive ? "text-[#B22222]" : "text-gray-500 hover:text-gray-700",
              )}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 bg-[#B22222] text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full p-0">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MobileBottomNav
