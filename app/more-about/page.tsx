import Link from "next/link"
import { Users, HelpCircle, Mail, FileText, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MoreAboutPage() {
  const items = [
    {
      label: "About Us",
      icon: Users,
      href: "/about",
      description: "Learn about our mission, story, and team."
    },
    {
      label: "FAQ",
      icon: HelpCircle,
      href: "/faq",
      description: "Frequently asked questions."
    },
    {
      label: "Contact",
      icon: Mail,
      href: "/contact",
      description: "Get in touch with us."
    },
    {
      label: "Terms and Conditions",
      icon: FileText,
      href: "/terms",
      description: "Read our terms and conditions."
    },
    {
      label: "Privacy Policy",
      icon: Shield,
      href: "/privacy",
      description: "How we protect your data."
    },
    {
      label: "Disclaimer",
      icon: AlertTriangle,
      href: "/disclaimer",
      description: "Important legal information."
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-xl mx-auto px-4 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">More about this App</h1>
        <div className="space-y-4">
          {items.map((item) => (
            <Link href={item.href} key={item.label}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="flex items-center gap-4 p-5">
                  <item.icon className="h-8 w-8 text-[#B22222] dark:text-red-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{item.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{item.description}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 