import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FF69B4] to-[#FF9CC0] text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Hanna's Connect</h1>
          <p className="text-xl max-w-3xl">
            A revolutionary dating platform that prioritizes meaningful connections based on values, not appearances.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#B22222]">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Hanna's Connect was founded with a simple yet powerful vision: to create a dating platform that values
                substance over superficiality. In a world dominated by swipe-based dating apps that prioritize physical
                appearance, we wanted to build something different.
              </p>
              <p className="text-gray-700 mb-4">
                Our founder, Hanna, experienced firsthand the challenges of modern dating. As a successful professional,
                she found that traditional dating apps didn't provide the privacy, intentionality, or depth she was
                looking for in relationships.
              </p>
              <p className="text-gray-700">
                This led to the creation of Hanna's Connect – a platform designed for intentional singles who value
                clarity, purpose, and meaningful connections in their relationships.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-md max-w-md">
                <h3 className="text-2xl font-bold mb-4 text-[#B22222] text-center">Our Mission</h3>
                <p className="text-gray-700 italic text-center">
                  "To create a dating environment where intentional singles can form genuine, aligned relationships
                  based on shared values and life goals, free from the distractions of conventional dating apps."
                </p>
                <div className="mt-6 text-center">
                  <p className="font-semibold text-[#DAA520]">Clarity Before Chemistry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#F5F5F5]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-[#B22222] text-center">Our Core Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#B22222]">Privacy</h3>
              <p className="text-gray-700">
                We believe that everyone deserves control over their personal information and online presence. Our
                platform is designed to protect your privacy while still allowing for meaningful connections.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#B22222]">Intentionality</h3>
              <p className="text-gray-700">
                We encourage our users to be purposeful and deliberate in their dating journey. By focusing on what
                truly matters – values, goals, and compatibility – we help create connections that have real potential.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#B22222]">Authenticity</h3>
              <p className="text-gray-700">
                We value honesty and transparency. Our platform encourages users to present their true selves – their
                values, goals, and life circumstances – rather than just their best photos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-[#B22222] text-center">Why Choose Hanna's Connect?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="bg-[#DAA520] rounded-full p-2 mr-4 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#B22222]">Privacy-First Approach</h3>
                <p className="text-gray-700">
                  No profile pictures required. Express yourself through custom icons that reflect your personality and
                  values.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#DAA520] rounded-full p-2 mr-4 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#B22222]">Value-Based Matching</h3>
                <p className="text-gray-700">
                  Our platform focuses on connecting people based on shared values, goals, and life circumstances.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#DAA520] rounded-full p-2 mr-4 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#B22222]">Secure Communication</h3>
                <p className="text-gray-700">
                  Our messaging system ensures that conversations only begin when there's mutual interest, protecting
                  your privacy.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#DAA520] rounded-full p-2 mr-4 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#B22222]">Intentional Community</h3>
                <p className="text-gray-700">
                  Our platform attracts professionals and individuals who are serious about finding meaningful
                  relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#FF69B4] to-[#FF9CC0] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience a Different Approach to Dating?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join Hanna's Connect today and discover meaningful connections based on what truly matters.
          </p>
          <Button
            className="bg-[#B22222] hover:bg-[#8B0000] text-white px-8 py-6 text-lg rounded-md shadow-lg font-medium"
            asChild
          >
            <Link href="/register">Create Your Profile</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
