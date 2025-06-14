"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Heart,
  User,
  MessageCircle,
  Settings,
  LogOut,
  Home,
  Info,
  HelpCircle,
  Trophy,
  FileText,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in by checking localStorage or session
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username")
      if (storedUsername) {
        setIsLoggedIn(true)
        setUsername(storedUsername)
      }
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("username")
      localStorage.removeItem("name")
      localStorage.removeItem("occupation")
    }
    setIsLoggedIn(false)
    setUsername("")
    closeMenu()
    router.push("/")
  }

  // Don't show navbar on home page for clean look
  if (pathname === "/") {
    return null
  }

  const publicNavLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "How It Works", href: "/how-it-works", icon: HelpCircle },
    { name: "Success Stories", href: "/success-stories", icon: Trophy },
    { name: "FAQ", href: "/faq", icon: FileText },
  ]

  const memberNavLinks = [
    { name: "Dashboard", href: "/dashboard", icon: User },
    { name: "Messages", href: "/messages", icon: MessageCircle },
    { name: "Profile", href: "/profile", icon: Settings },
  ]

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2" onClick={closeMenu}>
            <Heart className="w-6 h-6 text-[#B22222] dark:text-red-400 fill-current" />
            <span className="text-xl font-bold text-[#B22222] dark:text-red-400">Hanna's Connect</span>
          </Link>

          {/* User info and Menu Button - Show for all users on all devices */}
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span>Welcome, {username}</span>
              </div>
            )}
            <button className="text-gray-600 dark:text-gray-300 focus:outline-none" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Open Menu - For all users */}
      {isMenuOpen && (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {isLoggedIn ? (
              <>
                {/* Logged in user menu */}
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Welcome, {username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Member Dashboard</p>
                </div>

                {memberNavLinks.map((link) => {
                  const IconComponent = link.icon
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 text-sm font-medium transition-colors py-3 px-3 rounded-md ${
                        pathname === link.href
                          ? "text-[#B22222] dark:text-red-400 bg-[#B22222]/10 dark:bg-red-400/10"
                          : "text-gray-600 dark:text-gray-300 hover:text-[#B22222] dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      onClick={closeMenu}
                    >
                      <IconComponent className="w-5 h-5" />
                      {link.name}
                    </Link>
                  )
                })}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 px-3 rounded-md transition-colors mt-4 border-t border-gray-200 dark:border-gray-700 pt-6"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </>
            ) : (
              <>
                {/* Public navigation for non-logged in users */}
                {publicNavLinks.map((link) => {
                  const IconComponent = link.icon
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 text-sm font-medium transition-colors py-3 px-3 rounded-md ${
                        pathname === link.href
                          ? "text-[#B22222] dark:text-red-400 bg-[#B22222]/10 dark:bg-red-400/10"
                          : "text-gray-600 dark:text-gray-300 hover:text-[#B22222] dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      onClick={closeMenu}
                    >
                      <IconComponent className="w-5 h-5" />
                      {link.name}
                    </Link>
                  )
                })}

                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    className="border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-white w-full shadow-sm font-medium"
                    asChild
                  >
                    <Link href="/login" onClick={closeMenu}>
                      Log In
                    </Link>
                  </Button>
                  <Button
                    className="bg-[#B22222] hover:bg-[#8B0000] dark:bg-red-600 dark:hover:bg-red-700 text-white w-full shadow-sm font-medium"
                    asChild
                  >
                    <Link href="/register" onClick={closeMenu}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
