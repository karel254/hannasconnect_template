"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Don't show navbar on home page
  if (pathname === "/") {
    return null
  }

  const navItems = [
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-800">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="mr-4 p-2 text-white hover:bg-slate-800 hover:text-white"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-slate-900 border-slate-700 text-white overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <span className="font-bold text-white text-lg">Hanna&apos;s Connect™</span>
                </div>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-amber-400 py-3 border-b border-slate-700 block ${
                      pathname === item.href ? "text-amber-400" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <span className="font-bold text-white text-xl">Hanna&apos;s Connect™</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:ml-8 md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-amber-400 hover:bg-slate-800 px-3 py-2 rounded ${
                pathname === item.href ? "text-amber-400" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side spacer */}
        <div className="flex-1" />
      </div>
    </nav>
  )
}
