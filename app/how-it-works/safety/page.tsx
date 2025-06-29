import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Eye, Lock, AlertTriangle, Phone, MessageCircle } from "lucide-react"

export default function SafetyPage() {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "Profile Verification",
      description: "Multi-step verification process to ensure authentic profiles",
      features: ["Photo verification", "Phone number verification", "Social media linking", "ID verification option"],
    },
    {
      icon: Eye,
      title: "24/7 Monitoring",
      description: "Round-the-clock monitoring to detect and prevent inappropriate behavior",
      features: [
        "AI-powered content scanning",
        "Human moderation team",
        "Real-time threat detection",
        "Proactive safety alerts",
      ],
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      description: "Advanced privacy controls to keep your information secure",
      features: [
        "End-to-end encryption",
        "Anonymous browsing options",
        "Data protection compliance",
        "Secure payment processing",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Reporting System",
      description: "Easy-to-use reporting tools for suspicious or inappropriate behavior",
      features: [
        "One-click reporting",
        "Anonymous reporting option",
        "Fast response times",
        "Detailed investigation process",
      ],
    },
  ]

  const safetyTips = [
    {
      category: "Profile Safety",
      tips: [
        "Use recent, authentic photos of yourself",
        "Avoid sharing personal information in your bio",
        "Don't include your full name or contact details",
        "Be cautious about revealing your workplace or address",
      ],
    },
    {
      category: "Messaging Safety",
      tips: [
        "Keep conversations on the platform initially",
        "Trust your instincts about suspicious messages",
        "Don't share financial information or send money",
        "Report users who ask for personal details too quickly",
      ],
    },
    {
      category: "Meeting Safety",
      tips: [
        "Always meet in public places for first dates",
        "Tell a friend about your date plans",
        "Arrange your own transportation",
        "Trust your gut feelings about the person",
      ],
    },
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

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Features</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your safety is our top priority. Learn about the comprehensive measures we take to protect our community.
            </p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Safety Measures</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {safetyFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 rounded-full p-3 mr-4">
                        <feature.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <Card className="p-8 bg-gradient-to-r from-green-500 to-blue-600 text-white">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold mb-6 text-center">Safety by the Numbers</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-2">99.8%</div>
                    <div className="text-sm opacity-90">Verified Profiles</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">&lt;2min</div>
                    <div className="text-sm opacity-90">Average Response Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-sm opacity-90">Safety Monitoring</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">0.1%</div>
                    <div className="text-sm opacity-90">Reported Incidents</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Safety Tips for Users</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {safetyTips.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg text-center">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start text-sm text-gray-700">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <Card className="p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Need Help or Want to Report Something?
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Report a User</h3>
                    <p className="text-gray-600 text-sm mb-4">Quickly report suspicious or inappropriate behavior</p>
                    <Button variant="outline" size="sm">
                      Report Now
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Live Chat Support</h3>
                    <p className="text-gray-600 text-sm mb-4">Get immediate help from our safety team</p>
                    <Button variant="outline" size="sm">
                      Start Chat
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Emergency Hotline</h3>
                    <p className="text-gray-600 text-sm mb-4">24/7 emergency support for urgent situations</p>
                    <Button variant="outline" size="sm">
                      Call Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="text-center">
            <Card className="p-8 bg-gradient-to-r from-pink-50 to-purple-50">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Safe Dating Starts Here</h2>
                <p className="text-gray-600 mb-6">
                  Join a community where safety comes first and meaningful connections flourish.
                </p>
                <Link href="/register">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3">
                    Join Safely Today
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
