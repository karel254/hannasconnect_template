import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, HelpCircle, MessageCircle } from "lucide-react"

export default function GeneralFAQPage() {
  const generalFAQs = [
    {
      question: "What is Hanna's Connect?",
      answer:
        "Hanna's Connect is a premium dating platform focused on creating meaningful, long-term relationships. Unlike other dating apps that prioritize quick matches, we use advanced compatibility algorithms to connect people based on shared values, interests, and relationship goals.",
    },
    {
      question: "How is Hanna's Connect different from other dating apps?",
      answer:
        "We focus on quality over quantity. Our platform emphasizes detailed profiles, compatibility matching, and meaningful conversations. We also provide relationship coaching, community events, and a safer dating environment with verified profiles and 24/7 moderation.",
    },
    {
      question: "Who can join Hanna's Connect?",
      answer:
        "Hanna's Connect is open to singles aged 18 and above who are serious about finding meaningful relationships. We welcome people of all backgrounds, orientations, and relationship preferences in a safe and inclusive environment.",
    },
    {
      question: "Is Hanna's Connect available worldwide?",
      answer:
        "Currently, Hanna's Connect is available in the United States, Canada, United Kingdom, and Australia. We're actively expanding to more countries and will announce new regions as they become available.",
    },
    {
      question: "How much does Hanna's Connect cost?",
      answer:
        "We offer both free and premium memberships. Free members can create profiles, browse matches, and send limited messages. Premium memberships start at $29.99/month and include unlimited messaging, advanced filters, and priority matching.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Absolutely. We use industry-standard encryption to protect your data and never sell your information to third parties. We're GDPR compliant and follow strict privacy policies. You have full control over what information you share and with whom.",
    },
    {
      question: "Can I use Hanna's Connect on my mobile device?",
      answer:
        "Yes! Hanna's Connect is available as a mobile app for both iOS and Android devices, as well as through our responsive web platform. All features are available across all platforms.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "You can delete your account anytime by going to Settings > Account > Delete Account. This will permanently remove your profile and all associated data. If you need help, our support team is available 24/7.",
    },
    {
      question: "What if I'm not finding good matches?",
      answer:
        "Our matching algorithm improves over time as it learns your preferences. We also offer profile optimization tips and personal dating coaching for premium members. You can also adjust your preferences and expand your search criteria.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes! We provide 24/7 customer support through live chat, email, and phone. Premium members receive priority support with faster response times. Our team is here to help with any questions or concerns.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link href="/faq" className="inline-flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to FAQ
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="h-8 w-8 text-pink-500 mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">General Questions</h1>
            </div>
            <p className="text-xl text-gray-600">
              Everything you need to know about Hanna's Connect and how our platform works.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {generalFAQs.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <MessageCircle className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Still Have Questions?</h3>
                <p className="text-gray-600 mb-4">
                  Our support team is available 24/7 to help with any questions you might have.
                </p>
                <Link href="/contact">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">Contact Support</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50">
              <CardContent className="p-0 text-center">
                <HelpCircle className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Other Categories</h3>
                <p className="text-gray-600 mb-4">
                  Find answers to specific questions about accounts, matching, and billing.
                </p>
                <div className="space-y-2">
                  <Link href="/faq/account">
                    <Button variant="outline" className="w-full bg-transparent">
                      Account & Profile
                    </Button>
                  </Link>
                  <Link href="/faq/matching">
                    <Button variant="outline" className="w-full bg-transparent">
                      Matching & Dating
                    </Button>
                  </Link>
                  <Link href="/faq/billing">
                    <Button variant="outline" className="w-full bg-transparent">
                      Billing & Subscription
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
