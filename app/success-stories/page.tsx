import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Quote } from "lucide-react"

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FF69B4] to-[#FF9CC0] text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h1>
          <p className="text-xl max-w-3xl">
            Real people, real connections. Discover how Hanna's Connect has helped intentional singles find meaningful
            relationships.
          </p>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-[#B22222] text-center">Featured Success Stories</h2>

          <div className="space-y-12">
            {/* Story 1 */}
            <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="bg-[#DAA520]/20 p-4 rounded-full mb-4">
                    <img src="/images/avatar1.png" alt="Profile icon" className="w-32 h-32 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#B22222] text-center">Michael & Sarah</h3>
                  <p className="text-gray-600 text-center">Connected January 2023</p>
                </div>
                <div className="md:w-2/3">
                  <div className="flex mb-4">
                    <Quote className="h-8 w-8 text-[#DAA520] mr-2 flex-shrink-0" />
                    <p className="text-gray-700 italic">
                      I was skeptical about a dating platform that didn't focus on profile pictures, but Hanna's Connect
                      completely changed my perspective. By focusing on values and life goals, I connected with Sarah in
                      a way that felt genuine from the start. We discovered we shared the same vision for our future,
                      and our relationship has been built on a solid foundation of mutual understanding and respect.
                    </p>
                  </div>
                  <p className="text-gray-700 mt-4">
                    Michael and Sarah got engaged in December 2023 after meeting on Hanna's Connect. They credit the
                    platform's focus on intentionality and values for helping them find a compatible partner.
                  </p>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="bg-[#DAA520]/20 p-4 rounded-full mb-4">
                    <img src="/images/avatar2.png" alt="Profile icon" className="w-32 h-32 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#B22222] text-center">Amina & David</h3>
                  <p className="text-gray-600 text-center">Connected March 2023</p>
                </div>
                <div className="md:w-2/3">
                  <div className="flex mb-4">
                    <Quote className="h-8 w-8 text-[#DAA520] mr-2 flex-shrink-0" />
                    <p className="text-gray-700 italic">
                      As a professional in the public eye, privacy was my biggest concern with online dating. Hanna's
                      Connect provided the discretion I needed while still allowing me to connect with like-minded
                      individuals. David and I matched based on our shared values and life goals, and we've built a
                      relationship that's rooted in mutual respect and understanding.
                    </p>
                  </div>
                  <p className="text-gray-700 mt-4">
                    Amina, a corporate lawyer, and David, a doctor, found that their busy professional lives aligned
                    perfectly. They appreciate how Hanna's Connect helped them find someone who understands their career
                    commitments.
                  </p>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="bg-[#DAA520]/20 p-4 rounded-full mb-4">
                    <img src="/images/avatar4.png" alt="Profile icon" className="w-32 h-32 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-[#B22222] text-center">Jennifer & Robert</h3>
                  <p className="text-gray-600 text-center">Connected May 2023</p>
                </div>
                <div className="md:w-2/3">
                  <div className="flex mb-4">
                    <Quote className="h-8 w-8 text-[#DAA520] mr-2 flex-shrink-0" />
                    <p className="text-gray-700 italic">
                      After trying several dating apps without success, I was drawn to Hanna's Connect's unique
                      approach. The platform's focus on values and intentionality helped me connect with Robert in a
                      meaningful way. We discovered we shared similar life goals and values, which has been the
                      foundation of our relationship.
                    </p>
                  </div>
                  <p className="text-gray-700 mt-4">
                    Jennifer and Robert are now planning their future together after meeting on Hanna's Connect. They
                    appreciate how the platform encouraged them to be clear about their relationship goals from the
                    start.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#F5F5F5]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-[#B22222] text-center">What Our Users Say</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#DAA520]/20 p-2 rounded-full mr-3">
                  <img src="/images/avatar3.png" alt="Profile icon" className="w-12 h-12 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#B22222]">Thomas K.</h3>
                  <p className="text-sm text-gray-600">Member since 2023</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The focus on values rather than appearances was refreshing. I've had more meaningful conversations here
                than on any other dating platform."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#DAA520]/20 p-2 rounded-full mr-3">
                  <img src="/images/avatar2.png" alt="Profile icon" className="w-12 h-12 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#B22222]">Rebecca L.</h3>
                  <p className="text-sm text-gray-600">Member since 2022</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As someone in the public eye, privacy was my main concern. Hanna's Connect provided the discretion I
                needed while still allowing me to meet compatible partners."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#DAA520]/20 p-2 rounded-full mr-3">
                  <img src="/images/avatar1.png" alt="Profile icon" className="w-12 h-12 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#B22222]">James M.</h3>
                  <p className="text-sm text-gray-600">Member since 2023</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The advanced filtering options helped me find someone who shares my values and life goals. I've never
                felt more compatible with someone I met online."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#B22222]">Share Your Success Story</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Have you found a meaningful connection through Hanna's Connect? We'd love to hear about your experience and
            share your story with our community.
          </p>
          <Button className="bg-[#B22222] hover:bg-[#8B0000] text-white px-6 py-2 rounded-md shadow-md" asChild>
            <Link href="/contact">Share Your Story</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#FF69B4] to-[#FF9CC0] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Write Your Own Success Story?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join Hanna's Connect today and start your journey toward finding a meaningful connection.
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
