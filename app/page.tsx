import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Info, Cog, Star, HelpCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Always visible in both light and dark mode */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-background.jpg')",
        }}
      >
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-12 pb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">HANNA'S CONNECT</h1>
          </div>
          <p className="text-white/90 text-xl font-light tracking-wider">Clarity Before Chemistry</p>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          {/* Main Title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-16 tracking-wide drop-shadow-2xl">
            Find Your Match
          </h2>

          {/* Navigation Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full mb-12">
            {/* About */}
            <Link href="/about">
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center">
                <Info className="w-10 h-10 md:w-12 md:h-12 text-white mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">About</h3>
                <p className="text-white/80 text-xs md:text-sm">Our Story</p>
              </div>
            </Link>

            {/* How It Works */}
            <Link href="/how-it-works">
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center">
                <Cog className="w-10 h-10 md:w-12 md:h-12 text-white mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-180" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">How It Works</h3>
                <p className="text-white/80 text-xs md:text-sm">Simple Steps</p>
              </div>
            </Link>

            {/* Success Stories */}
            <Link href="/success-stories">
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center">
                <Star className="w-10 h-10 md:w-12 md:h-12 text-white mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Success Stories</h3>
                <p className="text-white/80 text-xs md:text-sm">Real Love</p>
              </div>
            </Link>

            {/* FAQ */}
            <Link href="/faq">
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center">
                <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-white mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bounce" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">FAQ</h3>
                <p className="text-white/80 text-xs md:text-sm">Get Answers</p>
              </div>
            </Link>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300 animate-pulse hover:animate-none"
              asChild
            >
              <Link href="/login">Start Your Love Story</Link>
            </Button>
            <p className="text-white/70 text-sm mt-4">Join thousands finding true love</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="pb-6 text-center">
          <p className="text-white/60 text-sm">© 2024 Hanna's Connect. Where hearts meet minds.</p>
        </footer>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-yellow-300/40 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-pink-300/30 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 left-20 w-4 h-4 bg-yellow-400/30 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-pink-400/40 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-4000"></div>
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-yellow-300/20 rounded-full animate-bounce delay-1500"></div>
      </div>
    </div>
  )
}
