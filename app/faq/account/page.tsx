import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Settings, Shield } from "lucide-react"

export default function AccountFAQPage() {
  const accountFAQs = [
    {
      question: "How do I create an account?",
      answer:
        "Creating an account is simple! Click 'Sign Up' on our homepage, enter your email and create a password. You'll need to verify your email address, then you can start building your profile by adding photos and answering our compatibility questions.",
    },
    {
      question: "What information do I need to provide?",
      answer:
        "We require basic information like your age, location, and relationship preferences. You'll also answer questions about your values, interests, and what you're looking for in a partner. The more complete your profile, the better your matches will be.",
    },
    {
      question: "How do I upload photos?",
      answer:
        "You can upload up to 6 photos from your device or social media accounts. We recommend using recent, clear photos that show your face and personality. All photos are reviewed for quality and authenticity before being approved.",
    },
    {
      question: "Can I edit my profile after creating it?",
      answer:
        "Yes! You can edit your profile anytime by going to Settings > Edit Profile. You can update your photos, bio, preferences, and answers to compatibility questions. We recommend keeping your profile fresh and up-to-date.",
    },
    {
      question: "How do I verify my profile?",
      answer:
        "Profile verification is optional but recommended. You can verify through photo verification (take a selfie matching a pose), phone number verification, or by linking social media accounts. Verified profiles get more visibility and trust.",
    },
    {
      question: "What are privacy settings?",
      answer:
        "Privacy settings let you control who can see your profile and contact you. You can set your profile to be visible to everyone, only to people who match your criteria, or use incognito mode to browse privately (premium feature).",
    },
    {
      question: "How do I change my location?",
      answer:
        "You can update your location in Settings > Location. This will affect your match suggestions and who can find you. If you're traveling, you can temporarily change your location to meet people in other cities.",
    },
    {
      question: "Can I pause my account?",
      answer:
        "Yes! You can pause your account anytime in Settings > Account Status. This hides your profile from others while keeping all your data safe. You can reactivate whenever you're ready to start dating again.",
    },
    {
      question: "How do I delete my account permanently?",
      answer:
        "To permanently delete your account, go to Settings > Account > Delete Account. This will remove all your data, photos, and matches permanently. This action cannot be undone, so make sure you're certain before proceeding.",
    },
    {
      question: "What if I forgot my password?",
      answer:
        "Click 'Forgot Password' on the login page and enter your email address. We'll send you a secure link to reset your password. If you don't receive the email, check your spam folder or contact our support team.",
    },
  ]

  const quickTips = [
    "Use recent, high-quality photos",
    "Complete all profile sections for better matches",
    "Be honest about your intentions and preferences",
    "Verify your profile to increase trust",
    "Update your profile regularly to stay active",
    "Use privacy settings to control your visibility",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link href="/faq" className="inline-flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to FAQ
          </Link>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-pink-500 mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">Account & Profile</h1>
            </div>
            <p className="text-xl text-gray-600">
              Learn how to create, manage, and optimize your Hanna's Connect profile.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {accountFAQs.map((faq, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Settings className="h-6 w-6 text-pink-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Profile Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {quickTips.map((tip, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <span className="text-pink-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety First</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Learn about our safety features and how to protect yourself while dating online.
                  </p>
                  <Link href="/how-it-works/safety">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Safety Guide
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Personal Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Our support team can help you optimize your profile for better matches.
                  </p>
                  <Link href="/contact">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full">Contact Support</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
