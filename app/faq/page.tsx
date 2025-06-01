import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FF69B4] to-[#FF9CC0] text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl">
            Find answers to common questions about Hanna's Connect and how our platform works.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-8 text-[#B22222]">General Questions</h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  What is Hanna's Connect?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  Hanna's Connect is a dating platform that prioritizes privacy, intentionality, and meaningful
                  connections. Unlike traditional dating apps that focus on appearances, we emphasize values, goals, and
                  compatibility to help intentional singles form genuine, aligned relationships.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  How is Hanna's Connect different from other dating apps?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  Hanna's Connect differs from traditional dating apps in several key ways:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>We don't require profile pictures, using custom icons instead</li>
                    <li>We focus on matching based on values, goals, and life circumstances</li>
                    <li>We prioritize privacy and security in all aspects of our platform</li>
                    <li>We encourage users to be clear about their relationship goals from the start</li>
                    <li>
                      We create an environment that attracts intentional singles looking for meaningful connections
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  Is Hanna's Connect free to use?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  We offer both free and premium membership options. Free members can create profiles, browse matches,
                  and receive a limited number of messages. Premium members enjoy additional features like advanced
                  filtering, unlimited messaging, and priority matching. Visit our pricing page for more details on our
                  subscription plans.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  Who is Hanna's Connect for?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  Hanna's Connect is designed for intentional singles who value depth over superficiality in
                  relationships. Our platform is particularly popular among:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Professionals and career-focused individuals</li>
                    <li>People who value privacy and discretion</li>
                    <li>Those looking for serious, long-term relationships</li>
                    <li>Individuals who want to connect based on shared values and goals</li>
                    <li>People who are tired of the superficial nature of traditional dating apps</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h2 className="text-2xl font-bold my-8 text-[#B22222]">Profile & Privacy</h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-5" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  Can I use a profile picture instead of an icon?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  Our platform is designed to prioritize privacy and meaningful connections over appearances. While we
                  encourage using our icon system, you can share photos privately with matches once you've established a
                  connection and feel comfortable doing so. This approach helps ensure that connections are formed based
                  on compatibility rather than initial physical attraction.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  How does Hanna's Connect protect my privacy?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  We take privacy seriously and have implemented several measures to protect your information:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>We use industry-standard encryption to secure your data</li>
                    <li>We don't require profile pictures, using custom icons instead</li>
                    <li>You control who sees your profile and information</li>
                    <li>
                      Our messaging system only allows communication between users who have expressed mutual interest
                    </li>
                    <li>We never sell your personal information to third parties</li>
                    <li>You can control your privacy settings and visibility preferences</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  Can I control who sees my profile?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  Yes, you have full control over your profile visibility. You can choose to make your profile visible
                  to all users, only to users who match certain criteria, or you can browse in "private mode" where you
                  decide who can see your profile on a case-by-case basis.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h2 className="text-2xl font-bold my-8 text-[#B22222]">Matching & Communication</h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-8" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  How does the matching system work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  Our matching system uses a sophisticated algorithm that considers your values, goals, and preferences
                  to suggest compatible matches. You can also use our advanced filtering options to search for specific
                  criteria that matter to you. Unlike traditional apps, our system prioritizes depth-based compatibility
                  over superficial metrics.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  How do I know if someone is interested in me?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  You'll receive a notification when someone expresses interest in your profile. If you're also
                  interested, you can then begin messaging each other through our secure platform. This mutual interest
                  approach ensures that conversations only begin when both parties are genuinely interested.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  Can I message anyone on the platform?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  To protect our users' privacy and ensure a respectful environment, our messaging system only allows
                  communication between users who have expressed mutual interest. This approach prevents unwanted
                  messages and creates a more intentional communication experience.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h2 className="text-2xl font-bold my-8 text-[#B22222]">Account & Technical</h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-11" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  How do I create an account?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  Creating an account is simple. Click the "Sign Up" button, provide your email address, create a
                  password, and follow the guided profile creation process. We'll ask you questions about your values,
                  goals, and preferences to help match you with compatible partners.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  How can I delete my account?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  You can delete your account at any time by going to your account settings and selecting "Delete
                  Account." This will permanently remove your profile and all associated data from our platform. If you
                  need assistance, our support team is available to help.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-13" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-[#B22222] hover:no-underline">
                  Is there a mobile app available?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 px-2">
                  Yes, Hanna's Connect is available as a mobile app for both iOS and Android devices. You can download
                  the app from the App Store or Google Play Store. Our mobile app offers all the features of the web
                  platform with the convenience of on-the-go access.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4 text-[#B22222]">Still Have Questions?</h3>
            <p className="text-gray-700 mb-6">
              If you couldn't find the answer to your question, feel free to contact our support team.
            </p>
            <Button className="bg-[#B22222] hover:bg-[#8B0000] text-white shadow-md" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#FF69B4] to-[#FF9CC0] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
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
