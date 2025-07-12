import Link from "next/link"
import { ArrowLeft, Search, HelpCircle, Users, CreditCard, Shield, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

export default function FAQPage() {
  const faqCategories = [
    {
      title: "General Questions",
      icon: HelpCircle,
      color: "amber",
      questions: [
        {
          question: "What makes Hanna's Connect™ different from other dating apps?",
          answer:
            "Hanna's Connect™ focuses on privacy-first dating with meaningful connections. We don't sell your data, use advanced compatibility matching, and prioritize quality over quantity. Our 'Clarity Before Chemistry' approach helps you understand compatibility before physical attraction takes over.",
        },
        {
          question: "How does the matching algorithm work?",
          answer:
            "Our algorithm analyzes your values, interests, lifestyle preferences, and relationship goals to find compatible matches. We use a multi-dimensional compatibility scoring system that goes beyond surface-level preferences to identify potential long-term partners.",
        },
        {
          question: "Is Hanna's Connect™ free to use?",
          answer:
            "We offer both free and premium memberships. Free members can create profiles, receive daily matches, and send limited messages. Premium members get unlimited messaging, advanced filters, read receipts, and priority customer support.",
        },
      ],
    },
    {
      title: "Account & Profile",
      icon: Users,
      color: "red",
      questions: [
        {
          question: "How do I create an effective profile?",
          answer:
            "Upload 3-6 high-quality photos that show your face clearly and represent your lifestyle. Write an authentic bio that reflects your personality and values. Complete our compatibility questionnaire thoroughly, and be specific about what you're looking for in a partner.",
        },
        {
          question: "Can I change my location or age range preferences?",
          answer:
            "Yes, you can update your location and age range preferences anytime in your settings. Premium members can also set multiple locations and use advanced filters for more specific preferences.",
        },
        {
          question: "How do I verify my profile?",
          answer:
            "Profile verification involves uploading a government-issued ID and taking a real-time selfie. This process typically takes 24-48 hours. Verified profiles get a checkmark and are prioritized in matching.",
        },
      ],
    },
    {
      title: "Matching & Dating",
      icon: MessageCircle,
      color: "orange",
      questions: [
        {
          question: "How many matches will I receive per day?",
          answer:
            "We send 3-5 high-quality matches daily based on your compatibility score and preferences. This approach focuses on meaningful connections rather than overwhelming you with options.",
        },
        {
          question: "What should I do if I'm not getting matches?",
          answer:
            "Try updating your photos, expanding your age or distance range, or completing more sections of your profile. Our customer support team can also provide personalized profile feedback to improve your matching potential.",
        },
        {
          question: "Can I see who liked my profile?",
          answer:
            "Premium members can see who liked their profile and get priority placement in potential matches' queues. Free members will know when they have likes but can only see specific profiles through mutual matching.",
        },
      ],
    },
    {
      title: "Billing & Subscription",
      icon: CreditCard,
      color: "red",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay/Google Pay for mobile purchases. All payments are processed securely through encrypted channels.",
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer:
            "Yes, you can cancel your subscription anytime from your account settings. Your premium features will remain active until the end of your current billing period, and you won't be charged again.",
        },
        {
          question: "Do you offer refunds?",
          answer:
            "We offer a 7-day money-back guarantee for new premium subscriptions. Refunds are processed within 5-7 business days. Contact our support team if you're not satisfied with your premium experience.",
        },
      ],
    },
  ]

  const popularQuestions = [
    "How do I delete my account?",
    "Why can't I see my matches?",
    "How do I report inappropriate behavior?",
    "Can I pause my account temporarily?",
    "How do I change my email address?",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Find answers to common questions about Hanna&apos;s Connect™. Can't find what you're looking for? Contact
              our support team.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search for answers..." className="pl-10 py-3 text-lg" />
          </div>
        </div>

        {/* Popular Questions */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Questions</h2>
          <div className="flex flex-wrap gap-3">
            {popularQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-sm bg-transparent border-amber-600 text-amber-700 hover:bg-amber-50"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {faqCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon
              const colorClasses = {
                amber: "bg-amber-100 text-amber-700 border-amber-200",
                red: "bg-red-100 text-red-700 border-red-200",
                orange: "bg-orange-100 text-orange-700 border-orange-200",
              }

              return (
                <Card
                  key={categoryIndex}
                  className={`border-2 ${colorClasses[category.color as keyof typeof colorClasses]}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2 rounded-lg ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                    </div>

                    <Accordion type="single" collapsible className="space-y-2">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem
                          key={faqIndex}
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-4">
                            <span className="font-medium">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-gray-600">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-red-800 to-amber-700 text-white rounded-lg p-12 text-center">
            <Shield className="h-12 w-12 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl mb-8 opacity-90">
              Our support team is available 24/7 to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-red-800 hover:bg-gray-100">
                  Contact Support
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-800 bg-transparent"
              >
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
