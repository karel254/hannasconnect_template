import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FF69B4] to-[#FF9CC0] text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Connections Based on Values, Not Appearances
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                Hanna's Connect prioritizes privacy, intentionality, and meaningful relationships for intentional
                singles.
              </p>
              <p className="text-xl italic font-light">Clarity Before Chemistry</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="bg-[#B22222] hover:bg-[#8B0000] text-white px-8 py-6 text-lg rounded-md shadow-lg font-medium"
                  asChild
                >
                  <Link href="/register">
                    Join Now <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-md shadow-lg font-medium"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <img src="/images/logo.png" alt="Hanna's Connect Logo" className="w-full max-w-md h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#B22222]">
            A Dating Platform Built on Intentionality
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F9F9F9] p-8 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#DAA520] rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#B22222]">Privacy-Focused</h3>
              <p className="text-gray-700">
                No profile pictures required. Express yourself through custom icons that reflect your personality and
                values.
              </p>
            </div>

            <div className="bg-[#F9F9F9] p-8 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#DAA520] rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#B22222]">Meaningful Connections</h3>
              <p className="text-gray-700">
                Match based on values, goals, and life circumstances rather than superficial metrics.
              </p>
            </div>

            <div className="bg-[#F9F9F9] p-8 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#DAA520] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#B22222]">Exclusive Community</h3>
              <p className="text-gray-700">
                Join a community of professionals and individuals who value depth over superficiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#F5F5F5]">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#B22222]">How Hanna's Connect Works</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#B22222] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-md">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#B22222]">Create Your Profile</h3>
              <p className="text-gray-700">
                Share your values, goals, and life circumstances without revealing your identity.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#B22222] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-md">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#B22222]">Choose Your Icon</h3>
              <p className="text-gray-700">
                Select or upload a custom icon that represents your personality and values.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#B22222] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-md">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#B22222]">Find Matches</h3>
              <p className="text-gray-700">
                Use advanced filters to find connections based on what truly matters to you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#B22222] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-md">
                4
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#B22222]">Connect Securely</h3>
              <p className="text-gray-700">
                Communicate privately and securely with mutual matches in a respectful environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - UPDATED to remove icons */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#B22222]">Success Stories</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#F9F9F9] p-8 rounded-lg shadow-md">
              <div>
                <p className="italic text-gray-700 mb-4">
                  "Hanna's Connect allowed me to find a partner who shares my values and life goals. The focus on
                  meaningful connections rather than appearances made all the difference."
                </p>
                <p className="font-semibold text-[#B22222]">Michael K., 34</p>
              </div>
            </div>

            <div className="bg-[#F9F9F9] p-8 rounded-lg shadow-md">
              <div>
                <p className="italic text-gray-700 mb-4">
                  "As a professional who values privacy, this platform was exactly what I needed. I was able to connect
                  with like-minded individuals without compromising my privacy."
                </p>
                <p className="font-semibold text-[#B22222]">Sarah T., 29</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#FF69B4] to-[#FF9CC0] text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Meaningful Connections?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join Hanna's Connect today and experience a dating platform that values privacy, intentionality, and
            authentic connections.
          </p>
          <Button
            className="bg-[#B22222] hover:bg-[#8B0000] text-white px-8 py-6 text-lg rounded-md shadow-lg font-medium"
            asChild
          >
            <Link href="/register">Create Your Profile</Link>
          </Button>
        </div>
      </section>

      {/* Footer is now in the layout component */}
    </div>
  )
}
