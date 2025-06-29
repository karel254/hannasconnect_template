import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen w-screen fixed inset-0 overflow-hidden">
      {/* Background Image - Fixed, no scroll, no resize */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/images/hero-couple.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Lighter overlay for brighter background */}
        <div className="absolute inset-0 bg-black/25 dark:bg-black/35"></div>
      </div>

      {/* Content - Fixed height, no scroll */}
      <div className="relative z-10 h-full w-full flex flex-col">
        {/* Header */}
        <header className="pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-10 text-center px-4 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-wide drop-shadow-lg">
              Welcome to Hanna&apos;s Connect
            </h1>
          </div>
          <p className="text-white/95 text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wider drop-shadow-md">
            Clarity Before Chemistry
          </p>
        </header>

        {/* Spacer to push buttons to lower section */}
        <div className="flex-1"></div>

        {/* Login and Sign Up Buttons - Fixed position, no scroll */}
        <div className="pb-16 sm:pb-20 md:pb-24 lg:pb-28 px-4 flex-shrink-0">
          <div className="flex gap-4 justify-center items-center max-w-lg mx-auto">
            {/* Login Button - Translucent Dark Style */}
            <Link href="/login" className="flex-1">
              <button className="w-full bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/30 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Log in
              </button>
            </Link>

            {/* Sign Up Button - Translucent Warm Style */}
            <Link href="/register" className="flex-1">
              <button className="w-full bg-amber-900/20 hover:bg-amber-800/30 backdrop-blur-md border border-amber-400/40 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements - Contained within viewport - NO PINK */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-20 md:top-24 left-6 sm:left-10 md:left-12 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-amber-300/50 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-1/4 right-10 sm:right-16 md:right-20 lg:right-24 w-1.5 sm:w-2 md:w-3 h-1.5 sm:h-2 md:h-3 bg-orange-300/40 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 left-10 sm:left-16 md:left-20 lg:left-24 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 bg-yellow-400/40 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 right-6 sm:right-10 md:right-12 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-red-400/50 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-1.5 sm:w-2 md:w-3 h-1.5 sm:h-2 md:h-3 bg-white/30 rounded-full animate-pulse delay-4000"></div>
        <div className="absolute top-2/3 right-1/3 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-amber-300/30 rounded-full animate-bounce delay-1500"></div>
      </div>
    </div>
  )
}
