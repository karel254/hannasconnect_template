import Link from "next/link"

// Remove the featured blog section entirely from the home page.

export default function Home() {
  return (
    <div className="h-screen w-screen fixed inset-0 overflow-hidden">
      {/* Background Image - Fixed, no scroll, no resize */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-couple.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content - Centered layout matching the screenshot */}
      <div className="relative z-10 h-full w-full flex flex-col justify-between">
        {/* Top section with title and tagline */}
        <div className="pt-10 sm:pt-14 md:pt-20 text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Welcome to Hanna's Connect
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-light">Clarity Before Chemistry</p>
        </div>

        {/* Centered How it works Button */}
        <div className="flex-1 flex items-center justify-center">
          <Link href="/how-it-works">
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              How it works
            </button>
          </Link>
        </div>

        {/* Bottom section with buttons */}
        <div className="pb-12 px-6">
          <div className="flex gap-4 max-w-sm mx-auto">
            {/* Log in Button */}
            <Link href="/login" className="flex-1">
              <button className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300">
                Log in
              </button>
            </Link>

            {/* Sign up Button */}
            <Link href="/register" className="flex-1">
              <button className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300">
                Sign up
              </button>
            </Link>
          </div>
        </div>

        {/* Home indicator (iOS style) */}
        <div className="pb-2 flex justify-center">
          <div className="w-32 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
