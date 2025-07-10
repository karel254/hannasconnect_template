import Link from "next/link"
import { ArrowLeft, Users, Shield, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Hanna&apos;s Connect™</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing online dating by putting privacy, authenticity, and meaningful connections first.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Our Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Hanna&apos;s Connect™ was born from a simple belief: dating should be about genuine connections, not
                endless swiping. Founded in 2024, we recognized that modern dating apps had lost sight of what truly
                matters - helping people find meaningful relationships built on compatibility, shared values, and
                authentic connection.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our founder, inspired by the timeless wisdom that "clarity comes before chemistry," created a platform
                that prioritizes getting to know someone's character, values, and intentions before physical attraction
                takes center stage.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded">
                <p className="text-lg italic text-gray-800 font-medium">
                  "Clarity Before Chemistry" - Our guiding principle that meaningful relationships start with
                  understanding, not just attraction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-amber-100">
              <CardContent className="p-6">
                <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
                <p className="text-gray-600">
                  Your personal information is protected with bank-level security and never sold to third parties.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-red-100">
              <CardContent className="p-6">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Authentic Connections</h3>
                <p className="text-gray-600">
                  We foster genuine relationships by encouraging meaningful conversations over superficial interactions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-orange-100">
              <CardContent className="p-6">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Community</h3>
                <p className="text-gray-600">
                  Our verification process ensures a safe, respectful environment for all members.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-amber-100">
              <CardContent className="p-6">
                <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Success Focused</h3>
                <p className="text-gray-600">
                  We measure success by the quality of relationships formed, not the number of matches made.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-700 mb-2">10K+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-700 mb-2">500+</div>
              <div className="text-gray-600">Successful Matches</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-700 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Makes Us Different</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow border-l-4 border-amber-600">
              <CheckCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Privacy-First Approach</h3>
                <p className="text-gray-600">
                  Unlike other platforms, we never sell your data. Your privacy is our priority, not our product.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow border-l-4 border-red-600">
              <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality Over Quantity</h3>
                <p className="text-gray-600">
                  We focus on meaningful matches based on compatibility, not endless swiping through profiles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow border-l-4 border-orange-600">
              <CheckCircle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Verified Community</h3>
                <p className="text-gray-600">
                  All members go through our verification process to ensure authenticity and safety.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow border-l-4 border-amber-600">
              <CheckCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Intentional Dating</h3>
                <p className="text-gray-600">
                  Our platform is designed for people serious about finding lasting relationships, not casual
                  encounters.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-red-800 to-amber-700 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Person?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of singles who've chosen quality over quantity in their dating journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-red-800 hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-800 bg-transparent"
              >
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
