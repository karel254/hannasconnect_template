import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Users, MessageCircle } from "lucide-react"

export default function MatchingFAQPage() {
  const matchingFAQs = [
    {
      question: "How does the matching algorithm work?",
      answer:
        "Our algorithm analyzes multiple compatibility factors including shared values (35%), lifestyle preferences (25%), personality traits (20%), relationship goals (15%), and common interests (5%). It learns from your interactions to improve match quality over time.",
    },
    {
      question: "Why am I not getting good matches?",
      answer:
        "Several factors can affect match quality: incomplete profile, very specific preferences, or new account. Try completing all profile sections, expanding your search criteria, and being active on the platform. Our algorithm improves as it learns your preferences.",
    },
    {
      question: "How many matches will I get per day?",
      answer:
        "Free users receive 3-5 curated matches daily, while premium users get 10-15 matches. Quality over quantity is our focus - we'd rather show you fewer highly compatible matches than many random profiles.",
    },
    {
      question: "Can I change my match preferences?",
      answer:
        "Yes! You can update your preferences anytime in Settings > Match Preferences. Changes include age range, distance, education level, lifestyle choices, and relationship goals. New preferences take effect immediately.",
    },
    {
      question: "What does compatibility percentage mean?",
      answer:
        "The compatibility percentage shows how well you match based on our algorithm's analysis. 70-79% is good compatibility, 80-89% is very good, and 90%+ indicates exceptional compatibility across multiple factors.",
    },
    {
      question: "Why do I see the same profiles repeatedly?",
      answer:
        "This happens when you have very specific criteria or live in a smaller area. Try expanding your distance range, age preferences, or other filters. You can also use the 'Hide' feature to remove profiles you're not interested in.",
    },
    {
      question: "How do I start a conversation with a match?",
      answer:
        "Read their profile thoroughly and reference something specific in your first message. Ask open-ended questions about their interests, values, or experiences. Avoid generic 'hey' messages - personalized messages get 3x more responses.",
    },
    {
      question: "What if someone doesn't respond to my message?",
      answer:
        "Don't take it personally! People have various reasons for not responding. Wait a few days before sending a follow-up, and if there's still no response, it's best to move on to other matches.",
    },
    {
      question: "Can I see who liked my profile?",
      answer:
        "This is a premium feature. Premium users can see everyone who has liked their profile before deciding whether to match. Free users only see mutual matches when both people have liked each other.",
    },
    {
      question: "How do I report inappropriate behavior?",
      answer:
        "Click the three dots on any profile or message and select 'Report.' Choose the appropriate reason (inappropriate photos, harassment, fake profile, etc.). Our team reviews all reports within 24 hours and takes appropriate action.",
    },
    {
      question: "What makes a good first date?",
      answer:
        "Choose a public place where you can talk comfortably - coffee shops, casual restaurants, or activity-based dates like mini golf. Keep it short (1-2 hours) for the first meeting, and always let someone know where you're going.",
    },
    {
      question: "How long should I chat before meeting?",
      answer:
        "We recommend 3-7 days of messaging to establish comfort and interest. Too little chatting doesn't build connection, while too much can create unrealistic expectations. Trust your instincts about when you feel ready to meet.",
    },
  ]

  const datingTips = [
    "Be authentic in your messages",
    "Ask open-ended questions",
    "Reference their profile specifically",
    "Suggest meeting within a week",
    "Choose public places for first dates",
    "Keep first dates short and casual",
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

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-pink-500 mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">Matching & Dating</h1>
            </div>
            <p className="text-xl text-gray-600">
              Everything you need to know about finding matches and starting meaningful conversations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {matchingFAQs.map((faq, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MessageCircle className="h-6 w-6 text-pink-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Dating Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {datingTips.map((tip, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <span className="text-pink-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Improve Your Matches</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Learn how our matching algorithm works and how to get better matches.
                  </p>
                  <Link href="/how-it-works/matching">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Matching Guide
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Dating Advice?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Check out our blog for expert dating tips and relationship advice.
                  </p>
                  <Link href="/blog/dating-tips">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full">Read Dating Tips</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
