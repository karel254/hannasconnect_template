import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Info, Cog, Star, HelpCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Full screen coverage */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-background-full.jpg')",
          backgroundSize: "cover",
        }}
      >
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-8 md:pt-12 pb-6 md:pb-8 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
            <Heart className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white fill-white animate-pulse" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-wide">
              HANNA'S CONNECT
            </h1>
          </div>
          <p className="text-white/90 text-sm md:text-lg lg:text-xl font-light tracking-wider">
            Clarity Before Chemistry
          </p>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-4 md:py-8">
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center mb-8 md:mb-12 lg:mb-16 tracking-wide drop-shadow-2xl">
            Find Your Match
          </h2>

          {/* Navigation Cards - Equal sizes with responsive grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 w-full max-w-xs md:max-w-2xl lg:max-w-4xl mb-8 md:mb-12">
            {/* About */}
            <Link href="/about" className="block">
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer h-24 md:h-32 lg:h-40 xl:h-48 flex flex-col items-center justify-center">
                <Info className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white mx-auto mb-1 md:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-white mb-0.5 md:mb-1">
                  About
                </h3>
                <p className="text-white/80 text-xs md:text-sm">Our Story</p>
              </div>
            </Link>

            {/* How It Works */}
            <Link href="/how-it-works" className="block">
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer h-24 md:h-32 lg:h-40 xl:h-48 flex flex-col items-center justify-center">
                <Cog className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white mx-auto mb-1 md:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-180" />
                <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-white mb-0.5 md:mb-1">
                  How It Works
                </h3>
                <p className="text-white/80 text-xs md:text-sm">Simple Steps</p>
              </div>
            </Link>

            {/* Success Stories */}
            <Link href="/success-stories" className="block">
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer h-24 md:h-32 lg:h-40 xl:h-48 flex flex-col items-center justify-center">
                <Star className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white mx-auto mb-1 md:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12" />
                <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-white mb-0.5 md:mb-1">
                  Success Stories
                </h3>
                <p className="text-white/80 text-xs md:text-sm">Real Love</p>
              </div>
            </Link>

            {/* FAQ */}
            <Link href="/faq" className="block">
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer h-24 md:h-32 lg:h-40 xl:h-48 flex flex-col items-center justify-center">
                <HelpCircle className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white mx-auto mb-1 md:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:bounce" />
                <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-white mb-0.5 md:mb-1">
                  FAQ
                </h3>
                <p className="text-white/80 text-xs md:text-sm">Get Answers</p>
              </div>
            </Link>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6 text-base md:text-lg lg:text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300 animate-pulse hover:animate-none"
              asChild
            >
              <Link href="/login">Start Your Love Story</Link>
            </Button>
            <p className="text-white/70 text-xs md:text-sm mt-3 md:mt-4">Join thousands finding true love</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="pb-4 md:pb-6 text-center">
          <p className="text-white/60 text-xs md:text-sm">© 2024 Hanna's Connect. Where hearts meet minds.</p>
        </footer>
      </div>

      {/* Floating Animation Elements - Scaled for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 md:top-20 left-8 md:left-10 w-2 md:w-3 h-2 md:h-3 bg-yellow-300/40 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-1/3 right-16 md:right-20 w-1.5 md:w-2 h-1.5 md:h-2 bg-pink-300/30 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 left-16 md:left-20 w-3 md:w-4 h-3 md:h-4 bg-yellow-400/30 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute bottom-16 md:bottom-20 right-8 md:right-10 w-2 md:w-3 h-2 md:h-3 bg-pink-400/40 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-1.5 md:w-2 h-1.5 md:h-2 bg-white/20 rounded-full animate-pulse delay-4000"></div>
        <div className="absolute top-2/3 right-1/3 w-2 md:w-3 h-2 md:h-3 bg-yellow-300/20 rounded-full animate-bounce delay-1500"></div>
      </div>
    </div>
  )
}
