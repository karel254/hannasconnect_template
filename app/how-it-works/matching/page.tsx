import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Brain, Heart, Users, Zap, Target, Shield } from "lucide-react"

export default function MatchingPage() {
  const matchingFactors = [
    {
      icon: Heart,
      title: "Shared Values",
      description: "Core beliefs and life principles that matter most to you",
      weight: "35%",
      color: "text-red-500",
    },
    {
      icon: Users,
      title: "Lifestyle Compatibility",
      description: "Daily habits, social preferences, and life goals alignment",
      weight: "25%",
      color: "text-blue-500",
    },
    {
      icon: Brain,
      title: "Personality Match",
      description: "Communication styles, emotional intelligence, and temperament",
      weight: "20%",
      color: "text-purple-500",
    },
    {
      icon: Target,
      title: "Relationship Goals",
      description: "What you're looking for and timeline expectations",
      weight: "15%",
      color: "text-green-500",
    },
    {
      icon: Zap,
      title: "Interests & Hobbies",
      description: "Shared activities and passions you can enjoy together",
      weight: "5%",
      color: "text-yellow-500",
    },
  ]

  const algorithmSteps = [
    {
      step: 1,
      title: "Profile Analysis",
      description: "Our AI analyzes your profile, preferences, and compatibility quiz responses.",
    },
    {
      step: 2,
      title: "Compatibility Scoring",
      description: "Each potential match receives a compatibility score based on multiple factors.",
    },
    {
      step: 3,
      title: "Quality Filtering",
      description: "We filter out inactive profiles and focus on users serious about dating.",
    },
    {
      step: 4,
      title: "Personalized Curation",
      description: "Your daily matches are hand-picked based on your unique compatibility profile.",
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Matching Process</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how our advanced algorithm creates meaningful connections based on deep compatibility.
            </p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Makes a Great Match?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingFactors.map((factor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <factor.icon className={`h-8 w-8 ${factor.color}`} />
                      <Badge variant="outline" className="text-xs">
                        {factor.weight}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{factor.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{factor.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <Card className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold mb-6 text-center">How Our Algorithm Works</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {algorithmSteps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold">{step.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm opacity-90">{step.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-6 w-6 text-purple-500 mr-2" />
                    Smart Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Our algorithm learns from your interactions and feedback to improve match quality over time.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Analyzes your likes and passes</li>
                    <li>• Learns from successful conversations</li>
                    <li>• Adapts to your changing preferences</li>
                    <li>• Improves with community feedback</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-6 w-6 text-green-500 mr-2" />
                    Quality Assurance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    We maintain high match quality through verification and active profile monitoring.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Photo verification required</li>
                    <li>• Active profile monitoring</li>
                    <li>• Fake profile detection</li>
                    <li>• Community reporting system</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <Card className="p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Match Success Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-pink-600 mb-2">87%</div>
                    <div className="text-sm text-gray-600">Match Satisfaction Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">3.2</div>
                    <div className="text-sm text-gray-600">Average Dates per Match</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">68%</div>
                    <div className="text-sm text-gray-600">Second Date Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">24%</div>
                    <div className="text-sm text-gray-600">Long-term Relationships</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="text-center">
            <Card className="p-8 bg-gradient-to-r from-pink-50 to-purple-50">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Find Your Perfect Match?</h2>
                <p className="text-gray-600 mb-6">
                  Let our advanced matching algorithm work for you and discover meaningful connections.
                </p>
                <Link href="/register">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                    Start Matching Today
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
