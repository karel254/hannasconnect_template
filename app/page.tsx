import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Users, Star, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-pink-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section - Preserved in dark mode */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center px-4 md:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: `url('/images/hero-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Subtle overlay for better content readability while preserving logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 dark:from-transparent dark:via-black/20 dark:to-black/40"></div>

        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-300/30 rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-6 h-6 bg-pink-300/20 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-3 h-3 bg-yellow-400/40 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-60 right-10 w-5 h-5 bg-pink-400/30 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left side - Main content */}
            <div className="flex-1 text-center lg:text-left space-y-6 lg:pl-4">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                    ✨ Join 10,000+ Happy Members
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white drop-shadow-2xl">Find Your</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 drop-shadow-lg animate-pulse">
                    Perfect Match
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/95 max-w-2xl leading-relaxed drop-shadow-lg">
                  Where <strong className="text-yellow-300">values matter more than looks</strong>. Connect
                  authentically with people who share your vision for life.
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-2xl">
                  <p className="text-xl italic text-yellow-300 font-light mb-2 drop-shadow-md">
                    "Clarity Before Chemistry"
                  </p>
                  <p className="text-white/80 text-sm">The philosophy that guides every connection</p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white font-medium">10,000+ Members</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white font-medium">Privacy First</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white font-medium">Real Connections</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-6 text-lg rounded-2xl shadow-2xl font-bold transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300"
                  asChild
                >
                  <Link href="/register">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/25 px-8 py-6 text-lg rounded-2xl shadow-xl font-bold transition-all duration-300"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="flex justify-center lg:justify-start space-x-6 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg">2.5K+</div>
                  <div className="text-white/80 text-xs">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg">95%</div>
                  <div className="text-white/80 text-xs">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg">24/7</div>
                  <div className="text-white/80 text-xs">Support</div>
                </div>
              </div>
            </div>

            {/* Right side - Interactive elements - Fixed to prevent overflow */}
            <div className="flex-1 flex justify-center items-center w-full max-w-md mx-auto lg:mx-0 px-4 lg:px-0">
              <div className="relative w-full">
                {/* Floating testimonial cards - Fixed to ensure content is fully visible */}
                <div className="absolute -top-16 -left-4 md:-left-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 w-64 md:w-72 animate-float z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">Sarah & Mike</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Married 2023</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                    "Found my soulmate through shared values, not just photos!"
                  </p>
                </div>

                <div className="absolute -bottom-16 -right-4 md:-right-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 w-64 md:w-72 animate-float-delayed z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">David & Amina</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Engaged 2024</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                    "Privacy-first approach gave us confidence to be authentic!"
                  </p>
                </div>

                {/* Central call-to-action card */}
                <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 text-center transform hover:scale-105 transition-all duration-300 relative z-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Join Today</h3>
                  <p className="text-white/90 mb-4">Your perfect match is waiting</p>
                  <div className="text-2xl font-bold text-yellow-300">FREE</div>
                  <div className="text-white/80 text-sm">to get started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#B22222] dark:text-red-400 mb-4">
              Why Choose Hanna's Connect?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience dating reimagined with privacy, authenticity, and meaningful connections at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-[#DAA520] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#B22222] dark:text-red-400 text-center">Privacy First</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                No photos required. Express yourself through custom avatars while keeping your identity secure.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-[#DAA520] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#B22222] dark:text-red-400 text-center">Deep Connections</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                Match based on values, goals, and life vision rather than superficial appearances.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-[#DAA520] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#B22222] dark:text-red-400 text-center">
                Quality Community
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                Join verified professionals who value depth, authenticity, and meaningful relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#FF69B4] to-[#FF9CC0] dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Join Thousands Who Found Love</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/90 italic mb-4 text-lg">
                "Found my soulmate here. The focus on values over looks made all the difference."
              </p>
              <p className="text-white font-semibold">Sarah & Michael</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/90 italic mb-4 text-lg">
                "Privacy-first approach gave me confidence to be authentic from day one."
              </p>
              <p className="text-white font-semibold">David & Amina</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-white/80">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">2.5K+</div>
              <div className="text-white/80">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-white/80">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Fixed to prevent overlapping */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#B22222] dark:text-red-400">
            Ready to Find Your Person?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the community where authentic connections happen. Your perfect match is waiting.
          </p>
          <Button
            className="bg-gradient-to-r from-[#B22222] to-[#8B0000] hover:from-[#8B0000] hover:to-[#B22222] text-white px-8 py-6 text-lg rounded-xl shadow-2xl font-semibold transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            asChild
          >
            <Link href="/register">Join Hanna's Connect Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
