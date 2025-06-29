import Link from "next/link"
import { Heart, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-red-500 fill-red-500" />
              <span className="text-2xl font-bold">Hanna&apos;s Connect</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Where meaningful connections begin. Privacy-first dating for intentional singles.
            </p>
            <p className="text-yellow-400 italic text-lg">&quot;Clarity Before Chemistry&quot;</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-gray-300 hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </Link>
          </div>
          <p className="text-gray-400 text-sm">© 2024 Hanna&apos;s Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
