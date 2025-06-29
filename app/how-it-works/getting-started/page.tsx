import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserPlus, Camera, Heart, MessageCircle, CheckCircle } from "lucide-react"

export default function GettingStartedPage() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up with your email and create a secure password.",
      details: ["Verify your email address", "Choose your preferences", "Set up basic profile information"],
    },
    {
      icon: Camera,
      title: "Build Your Profile",
      description: "Add photos and tell your story to attract the right matches.",
      details: ["Upload 3-6 high-quality photos", "Write an engaging bio", "Answer compatibility questions"],
    },
    {
      icon: Heart,
      title: "Find Your Matches",
      description: "Browse through curated matches based on your preferences.",
      details: ["Review daily match suggestions", "Use advanced filters", "Like profiles that interest you"],
    },
    {
      icon: MessageCircle,
      title: "Start Conversations",
      description: "Connect with your matches and begin meaningful conversations.",
      details: ["Send thoughtful first messages", "Ask engaging questions", "Plan your first date"],
    },
  ]

  const tips = [
    "Use recent, clear photos that show your face",
    "Be honest about your interests and intentions",
    "Take time to read profiles thoroughly",
    "Ask open-ended questions in conversations",
    "Meet in public places for first dates",
    "Trust your instincts about potential matches",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link href="/how-it-works" className="inline-flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to How It Works
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Getting Started</h1>
            <p className="text-xl text-gray-600">
              Your step-by-step guide to creating an amazing profile and finding meaningful connections.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-pink-100 rounded-full p-4 flex-shrink-0">
                      <step.icon className="h-8 w-8 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <span className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                          {index + 1}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4 text-lg">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-6 w-6 text-pink-500 mr-2" />
                  Pro Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-pink-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Our support team is here to help you every step of the way.</p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Live Chat Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Heart className="h-4 w-4 mr-2" />
                    Profile Review Service
                  </Button>
                  <Link href="/faq">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card className="p-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold mb-4">Ready to Begin Your Journey?</h2>
                <p className="text-lg mb-6 opacity-90">
                  Join thousands of singles who have found meaningful connections through Hanna's Connect.
                </p>
                <Link href="/register">
                  <Button className="bg-white text-pink-600 hover:bg-gray-100 font-semibold px-8 py-3">
                    Create Your Profile Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
