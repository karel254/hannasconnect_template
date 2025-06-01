import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FF69B4] to-[#FF9CC0] text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How Hanna's Connect Works</h1>
          <p className="text-xl max-w-3xl">
            Discover our unique approach to dating that prioritizes privacy, intentionality, and meaningful connections.
          </p>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-[#B22222] text-center">Our Simple Process</h2>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-[#B22222]">1. Create Your Profile</h3>
                  <p className="text-gray-700 mb-4">
                    Start by creating a detailed profile that focuses on what truly matters. Unlike traditional dating
                    apps, we don't require profile pictures. Instead, we ask about your:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Values and beliefs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Life goals and aspirations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Education and career</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Family background and plans</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Relationship expectations</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="bg-[#DAA520]/20 p-4 rounded-full">
                  <div className="w-24 h-24 bg-[#B22222] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    1
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <div className="bg-[#DAA520]/20 p-4 rounded-full">
                  <div className="w-24 h-24 bg-[#B22222] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    2
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-[#B22222]">2. Choose Your Icon</h3>
                  <p className="text-gray-700 mb-4">
                    Instead of a profile picture, select or upload a custom icon that represents your personality and
                    values. This approach:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Protects your privacy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Reduces bias based on appearance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Encourages connections based on compatibility</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Creates a unique visual identity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-[#B22222]">3. Find Matches</h3>
                  <p className="text-gray-700 mb-4">
                    Use our advanced filtering system to find potential matches based on what truly matters to you:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Filter by values and life goals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Search by relationship expectations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Find people with compatible backgrounds</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Discover connections based on shared interests</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="bg-[#DAA520]/20 p-4 rounded-full">
                  <div className="w-24 h-24 bg-[#B22222] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    3
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <div className="bg-[#DAA520]/20 p-4 rounded-full">
                  <div className="w-24 h-24 bg-[#B22222] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    4
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-[#B22222]">4. Connect Securely</h3>
                  <p className="text-gray-700 mb-4">
                    When you find someone you're interested in, our secure communication system allows you to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Express interest privately</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Message only when there's mutual interest</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Communicate in a respectful environment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                      <span className="text-gray-700">Build meaningful connections at your own pace</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#F5F5F5]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-[#B22222] text-center">Privacy & Security</h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            At Hanna's Connect, we take your privacy and security seriously. Here's how we protect your information:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#B22222]">Data Protection</h3>
              <p className="text-gray-700">
                We use industry-standard encryption to protect your personal information. Your data is never sold to
                third parties, and we only collect what's necessary to provide our service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#B22222]">Profile Privacy</h3>
              <p className="text-gray-700">
                You control who sees your profile. Our platform allows you to remain discreet until you feel comfortable
                engaging with potential matches.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#B22222]">Secure Messaging</h3>
              <p className="text-gray-700">
                Our messaging system is encrypted and only allows communication between users who have expressed mutual
                interest, protecting you from unwanted contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-[#B22222] text-center">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#B22222]">Can I use a profile picture instead of an icon?</h3>
              <p className="text-gray-700">
                Our platform is designed to prioritize privacy and meaningful connections over appearances. While we
                encourage using our icon system, you can share photos privately with matches once you've established a
                connection.
              </p>
            </div>

            <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#B22222]">How do I know if someone is interested in me?</h3>
              <p className="text-gray-700">
                You'll receive a notification when someone expresses interest in your profile. If you're also
                interested, you can then begin messaging each other through our secure platform.
              </p>
            </div>

            <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#B22222]">Is Hanna's Connect free to use?</h3>
              <p className="text-gray-700">
                We offer both free and premium membership options. Free members can create profiles and browse matches,
                while premium members enjoy additional features like advanced filtering and priority matching.
              </p>
            </div>

            <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#B22222]">
                How is Hanna's Connect different from other dating apps?
              </h3>
              <p className="text-gray-700">
                Unlike traditional dating apps that focus on appearances, we prioritize values, goals, and
                compatibility. Our unique approach to privacy and intentionality creates an environment where meaningful
                connections can flourish.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/faq" className="text-[#B22222] font-semibold hover:underline">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#FF69B4] to-[#FF9CC0] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join Hanna's Connect today and experience a dating platform that values privacy, intentionality, and
            meaningful connections.
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
