"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "FAQ", href: "/faq" },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <span className="text-xl font-bold text-[#B22222]">Hanna's Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-[#B22222]" : "text-gray-600 hover:text-[#B22222]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white shadow-sm font-medium"
              asChild
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button className="bg-[#B22222] hover:bg-[#8B0000] text-white shadow-sm font-medium" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors py-2 px-3 rounded-md ${
                  pathname === link.href
                    ? "text-[#B22222] bg-[#B22222]/10"
                    : "text-gray-600 hover:text-[#B22222] hover:bg-gray-50"
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                className="border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white w-full shadow-sm font-medium"
                asChild
              >
                <Link href="/login" onClick={closeMenu}>
                  Log In
                </Link>
              </Button>
              <Button className="bg-[#B22222] hover:bg-[#8B0000] text-white w-full shadow-sm font-medium" asChild>
                <Link href="/register" onClick={closeMenu}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
