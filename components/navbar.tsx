"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null)
  const pathname = usePathname()

  // Don't show navbar on home page
  if (pathname === "/") {
    return null
  }

  const navItems = [
    {
      label: "Blog",
      href: "/blog",
      submenu: [
        { href: "/blog/dating-tips", label: "Dating Tips" },
        { href: "/blog/relationship-advice", label: "Relationship Advice" },
        { href: "/blog/success-stories", label: "Success Stories" },
        { href: "/blog/community", label: "Community" },
      ],
    },
    {
      label: "About Us",
      href: "/about",
      submenu: [
        { href: "/about/our-story", label: "Our Story" },
        { href: "/about/team", label: "Our Team" },
        { href: "/about/mission", label: "Our Mission" },
        { href: "/about/values", label: "Our Values" },
      ],
    },
    {
      label: "How It Works",
      href: "/how-it-works",
      submenu: [
        { href: "/how-it-works/getting-started", label: "Getting Started" },
        { href: "/how-it-works/matching", label: "Matching Process" },
        { href: "/how-it-works/safety", label: "Safety Features" },
        { href: "/how-it-works/premium", label: "Premium Features" },
      ],
    },
    {
      label: "FAQ",
      href: "/faq",
      submenu: [
        { href: "/faq/general", label: "General Questions" },
        { href: "/faq/account", label: "Account & Profile" },
        { href: "/faq/matching", label: "Matching & Dating" },
        { href: "/faq/billing", label: "Billing & Subscription" },
      ],
    },
    {
      label: "Contact Us",
      href: "/contact",
      submenu: [
        { href: "/contact/support", label: "Customer Support" },
        { href: "/contact/feedback", label: "Feedback" },
        { href: "/contact/partnerships", label: "Partnerships" },
        { href: "/contact/media", label: "Media Inquiries" },
      ],
    },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
    setMobileSubmenuOpen(null)
  }

  const toggleMobileSubmenu = (label: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === label ? null : label)
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-800">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="mr-4 p-2 text-white hover:bg-slate-800 hover:text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-slate-900 border-slate-700 text-white overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Heart className="mr-2 h-6 w-6 text-red-500" />
                  <span className="font-bold text-white text-lg">Hanna's Connect</span>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-slate-700 pb-4">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`text-lg font-medium transition-colors hover:text-green-400 ${
                          pathname === item.href ? "text-green-400" : "text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="p-1 text-white hover:bg-slate-800 hover:text-white"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileSubmenuOpen === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </div>
                    {mobileSubmenuOpen === item.label && (
                      <div className="ml-4 mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={handleLinkClick}
                            className={`block text-sm py-1 transition-colors hover:text-green-400 ${
                              pathname === subItem.href ? "text-green-400" : "text-gray-300"
                            }`}
                          >
                            • {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Heart className="h-8 w-8 text-red-500" />
          <span className="font-bold text-white text-xl">Hanna's Connect</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:ml-8 md:space-x-8">
          {navItems.map((item) => (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium transition-colors hover:text-green-400 hover:bg-slate-800 flex items-center space-x-1 ${
                    pathname.startsWith(item.href) ? "text-green-400" : "text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white min-w-[200px]">
                <DropdownMenuItem asChild>
                  <Link
                    href={item.href}
                    className={`w-full px-3 py-2 text-sm transition-colors hover:text-green-400 hover:bg-slate-700 ${
                      pathname === item.href ? "text-green-400" : "text-white"
                    }`}
                  >
                    {item.label} Overview
                  </Link>
                </DropdownMenuItem>
                {item.submenu.map((subItem) => (
                  <DropdownMenuItem key={subItem.href} asChild>
                    <Link
                      href={subItem.href}
                      className={`w-full px-3 py-2 text-sm transition-colors hover:text-green-400 hover:bg-slate-700 ${
                        pathname === subItem.href ? "text-green-400" : "text-white"
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        {/* Right side spacer */}
        <div className="flex-1" />
      </div>
    </nav>
  )
}
