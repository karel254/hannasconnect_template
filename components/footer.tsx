import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] text-gray-700 py-12 px-4 md:px-6 lg:px-8 border-t border-gray-200">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#B22222]">Hanna's Connect</h3>
            <p className="opacity-80">
              A dating platform that prioritizes privacy, intentionality, and meaningful connections.
            </p>
            <p className="mt-2 italic opacity-80">Clarity Before Chemistry</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#B22222]">Quick Links</h3>
            <ul className="space-y-2 opacity-80">
              <li>
                <Link href="/about" className="hover:text-[#B22222] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#B22222] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#B22222] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B22222] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#B22222]">Connect With Us</h3>
            <p className="opacity-80 mb-4">Have questions or feedback? We'd love to hear from you.</p>
            <Button
              variant="outline"
              className="border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white shadow-md font-medium"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-12 pt-6 text-center opacity-80">
          <p>&copy; 2019-2025 Huppy People. All Rights Reserved.</p>
          <p className="text-sm mt-1">Developed by Brandview Creatives.</p>
        </div>
      </div>
    </footer>
  )
}
