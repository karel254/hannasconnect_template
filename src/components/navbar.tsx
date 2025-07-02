"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-lg font-semibold">
          Hanna&apos;s&nbsp;Connect
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/browse" className="hover:text-primary transition-colors">
            Browse
          </Link>
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile drawer */}
      <nav
        className={cn(
          "md:hidden transition-transform duration-300 origin-top bg-background border-b",
          open ? "scale-y-100" : "scale-y-0",
        )}
      >
        <div className="flex flex-col gap-4 p-4 text-sm font-medium">
          <Link href="/browse" onClick={() => setOpen(false)}>
            Browse
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}
