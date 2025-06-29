import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Heart, MessageCircle, Calendar, ArrowRight, CheckCircle } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Profile",
      description: "Build a comprehensive profile with photos, interests, and relationship goals.",
      details: ["Upload 3-6 high-quality photos", "Complete personality assessment", "Set your preferences"],
    },
    {
      icon: Heart,
      title: "Get Matched",
      description: "Our AI algorithm finds compatible matches based on deep compatibility factors.",
      details: ["Advanced compatibility scoring", "Quality over quantity approach", "Daily curated matches"],
    },
    {
      icon: MessageCircle,
      title: "Start Conversations",
      description: "Connect with your matches through meaningful conversations.",
      details: ["Icebreaker suggestions", "Safe messaging environment", "Video chat options"],
    },
    {
      icon: Calendar,
      title: "Meet in Person",
      description: "Take your connection offline with safe, public first dates.",
      details: ["Date planning assistance", "Safety tips and guidelines", "Success tracking"],
    },
  ]

  const features = [
    "Advanced AI matching algorithm",
    "Comprehensive personality assessment",
    "Photo verification system",
    "24/7 safety monitoring",
    "Expert dating advice",
    "Success rate tracking",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">How Hanna's Connect Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our proven 4-step process helps you find meaningful relationships through compatibility-based matching and
            authentic connections.
          </p>
        </section>

        {/* Steps Section */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow relative">
                  <CardContent className="p-6">
                    <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-pink-600" />
                    </div>
                    <div className="absolute -top-3 -right-3 bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h3>
                <p className="text-gray-600 mb-6">
                  Creating your profile is the foundation of finding great matches. Our guided setup process helps you
                  showcase your authentic self.
                </p>
                <Link href="/how-it-works/getting-started">
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Matching Process</h3>
                <p className="text-gray-600 mb-6">
                  Our advanced algorithm analyzes 50+ compatibility factors to find your most compatible matches based
                  on personality, values, and goals.
                </p>
                <Link href="/how-it-works/matching">
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Safety Features</h3>
                <p className="text-gray-600 mb-6">
                  Your safety is our priority. We use advanced verification, AI monitoring, and safety tools to create a
                  secure dating environment.
                </p>
                <Link href="/how-it-works/safety">
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Features</h3>
                <p className="text-gray-600 mb-6">
                  Unlock advanced features like unlimited likes, priority matching, and personal dating coaching to
                  maximize your success.
                </p>
                <Link href="/how-it-works/premium">
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of people who have found love through our proven matching process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                    Create Free Profile
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/success-stories">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-pink-600 bg-transparent"
                  >
                    Read Success Stories
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
