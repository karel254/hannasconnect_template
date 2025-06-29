import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, User, Heart, CreditCard, MessageCircle, ArrowRight, Search } from "lucide-react"

export default function FAQPage() {
  const faqCategories = [
    {
      icon: HelpCircle,
      title: "General Questions",
      description: "Basic information about Hanna's Connect and how to get started",
      link: "/faq/general",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: User,
      title: "Account & Profile",
      description: "Managing your account, profile setup, and verification process",
      link: "/faq/account",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      icon: Heart,
      title: "Matching & Dating",
      description: "How matching works, conversation tips, and dating advice",
      link: "/faq/matching",
      color: "text-pink-500",
      bgColor: "bg-pink-100",
    },
    {
      icon: CreditCard,
      title: "Billing & Subscription",
      description: "Pricing, payments, subscriptions, and refund information",
      link: "/faq/billing",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ]

  const popularQuestions = [
    {
      question: "How does the matching algorithm work?",
      answer:
        "Our algorithm analyzes compatibility across 50+ factors including personality traits, values, lifestyle preferences, and relationship goals to find your most compatible matches.",
      category: "Matching",
    },
    {
      question: "Is Hanna's Connect free to use?",
      answer:
        "Yes! You can create a profile, receive matches, and send messages for free. Premium subscriptions unlock additional features like unlimited likes and advanced filters.",
      category: "Billing",
    },
    {
      question: "How do I verify my profile?",
      answer:
        "Profile verification involves uploading a photo of yourself holding a piece of paper with a verification code. This helps ensure authentic profiles and builds trust.",
      category: "Account",
    },
    {
      question: "What safety measures do you have in place?",
      answer:
        "We use photo verification, AI content monitoring, background checks for premium users, and provide safety tips and reporting tools to ensure a secure dating environment.",
      category: "Safety",
    },
    {
      question: "How many matches will I get?",
      answer:
        "Free users receive 3-5 curated matches daily, while premium users get 10-15 matches. We focus on quality over quantity to help you find meaningful connections.",
      category: "Matching",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your current billing period.",
      category: "Billing",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions about Hanna's Connect. Can't find what you're looking for? Contact our
            support team.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search FAQ..." className="pl-10" />
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Browse by Category</h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faqCategories.map((category, index) => (
              <Link key={index} href={category.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`${category.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                    >
                      <category.icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Questions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Questions */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Popular Questions</h2>
            <div className="space-y-6">
              {popularQuestions.map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">{faq.question}</h3>
                      <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full ml-4">
                        {faq.category}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-12">
              <MessageCircle className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-xl mb-8 opacity-90">
                Can't find the answer you're looking for? Our support team is here to help 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact/support">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Contact Support
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact/feedback">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  >
                    Send Feedback
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
