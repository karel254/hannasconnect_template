import Link from "next/link"
import { ArrowLeft, UserPlus, Search, MessageCircle, Heart, Shield, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How Hanna&apos;s Connect™ Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 4-step process helps you find meaningful connections based on compatibility and shared values.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Process Steps */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-amber-100">
              <CardContent className="p-8">
                <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <UserPlus className="h-8 w-8 text-amber-700" />
                </div>
                <div className="bg-amber-700 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
                <p className="text-gray-600 mb-4">
                  Build a comprehensive profile that showcases your personality, values, and what you're looking for in
                  a partner.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Upload verified photos</li>
                  <li>• Complete personality assessment</li>
                  <li>• Set your preferences</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-red-100">
              <CardContent className="p-8">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-red-700" />
                </div>
                <div className="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">Get Matched</h3>
                <p className="text-gray-600 mb-4">
                  Our advanced algorithm finds compatible matches based on your values, interests, and relationship
                  goals.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Compatibility scoring</li>
                  <li>• Quality over quantity</li>
                  <li>• Daily curated matches</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-orange-100">
              <CardContent className="p-8">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-orange-700" />
                </div>
                <div className="bg-orange-700 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">Start Conversations</h3>
                <p className="text-gray-600 mb-4">
                  Break the ice with our conversation starters and get to know each other through meaningful dialogue.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Guided conversation prompts</li>
                  <li>• Safe messaging environment</li>
                  <li>• Video chat options</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-red-100">
              <CardContent className="p-8">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-red-700" />
                </div>
                <div className="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-4">Build Connection</h3>
                <p className="text-gray-600 mb-4">
                  Take your connection offline when you're ready and build a meaningful relationship in the real world.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Date planning assistance</li>
                  <li>• Safety tips & guidelines</li>
                  <li>• Ongoing relationship support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Features */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Makes Our Process Special</h2>

          <div className="space-y-8">
            {/* Privacy & Security */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-amber-600">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Shield className="h-8 w-8 text-amber-700" />
                </div>
                <h3 className="text-2xl font-semibold">Privacy & Security First</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Your Data is Protected</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600" />
                      End-to-end encrypted messaging
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600" />
                      No data selling to third parties
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600" />
                      Bank-level security protocols
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Verified Community</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-red-600" />
                      Photo verification required
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-red-600" />
                      Identity confirmation process
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-red-600" />
                      24/7 moderation and support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Matching Algorithm */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-600">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Star className="h-8 w-8 text-red-700" />
                </div>
                <h3 className="text-2xl font-semibold">Smart Matching Algorithm</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-700 font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Values Assessment</h4>
                  <p className="text-sm text-gray-600">
                    We analyze your core values and life goals to find compatible partners.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-700 font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Compatibility Scoring</h4>
                  <p className="text-sm text-gray-600">
                    Advanced algorithms calculate compatibility across multiple dimensions.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-amber-700 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Curated Matches</h4>
                  <p className="text-sm text-gray-600">
                    Receive a small number of high-quality matches daily, not hundreds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Statistics */}
        <div className="bg-gradient-to-r from-red-800 to-amber-700 text-white rounded-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Success Speaks for Itself</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">87%</div>
              <div className="opacity-90">Match Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3.2</div>
              <div className="opacity-90">Average Months to Relationship</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="opacity-90">User Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="opacity-90">Successful Relationships</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of singles who've found meaningful connections through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-red-700 hover:bg-red-800">
                Create Your Profile
              </Button>
            </Link>
            <Link href="/faq">
              <Button
                size="lg"
                variant="outline"
                className="border-red-700 text-red-700 hover:bg-red-50 bg-transparent"
              >
                Have Questions?
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
