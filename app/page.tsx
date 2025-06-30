import Link from "next/link"

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
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Welcome to Hanna's Connect
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-light">Clarity Before Chemistry</p>
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
