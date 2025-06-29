import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Crown, Zap, Eye, MessageCircle, Heart, Star, Check, X } from "lucide-react"

export default function PremiumPage() {
  const premiumFeatures = [
    {
      icon: Crown,
      title: "Priority Matching",
      description: "Get shown to more potential matches and see who likes you first",
      included: true,
    },
    {
      icon: Eye,
      title: "Advanced Filters",
      description: "Filter by education, lifestyle, values, and more specific criteria",
      included: true,
    },
    {
      icon: MessageCircle,
      title: "Unlimited Messages",
      description: "Send unlimited messages to all your matches without restrictions",
      included: true,
    },
    {
      icon: Heart,
      title: "See Who Likes You",
      description: "View all users who have liked your profile before you decide",
      included: true,
    },
    {
      icon: Zap,
      title: "Boost Your Profile",
      description: "Get 5x more profile views with weekly boosts",
      included: true,
    },
    {
      icon: Star,
      title: "Read Receipts",
      description: "Know when your messages have been read by matches",
      included: true,
    },
  ]

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        { name: "Create profile", included: true },
        { name: "Browse matches", included: true },
        { name: "5 likes per day", included: true },
        { name: "Basic filters", included: true },
        { name: "Limited messages", included: true },
        { name: "See who likes you", included: false },
        { name: "Advanced filters", included: false },
        { name: "Unlimited messages", included: false },
        { name: "Profile boosts", included: false },
        { name: "Read receipts", included: false },
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Premium",
      price: "$29.99",
      period: "per month",
      description: "Unlock all features for serious dating",
      features: [
        { name: "Everything in Free", included: true },
        { name: "Unlimited likes", included: true },
        { name: "See who likes you", included: true },
        { name: "Advanced filters", included: true },
        { name: "Unlimited messages", included: true },
        { name: "5 profile boosts/month", included: true },
        { name: "Read receipts", included: true },
        { name: "Priority customer support", included: true },
        { name: "Ad-free experience", included: true },
        { name: "Incognito mode", included: true },
      ],
      buttonText: "Upgrade Now",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Premium Plus",
      price: "$49.99",
      period: "per month",
      description: "Maximum visibility and features",
      features: [
        { name: "Everything in Premium", included: true },
        { name: "10 profile boosts/month", included: true },
        { name: "Priority matching algorithm", included: true },
        { name: "Personal dating coach", included: true },
        { name: "Profile optimization tips", included: true },
        { name: "Exclusive events access", included: true },
        { name: "Advanced analytics", included: true },
        { name: "VIP customer support", included: true },
        { name: "Early access to new features", included: true },
        { name: "Success guarantee", included: true },
      ],
      buttonText: "Go Premium Plus",
      buttonVariant: "default" as const,
      popular: false,
    },
  ]

  const successStats = [
    { label: "More Matches", value: "3x", description: "Premium users get 3x more matches" },
    { label: "Faster Connections", value: "50%", description: "50% faster to find meaningful connections" },
    { label: "Higher Success Rate", value: "85%", description: "85% of premium users find relationships" },
    { label: "Better Conversations", value: "2.5x", description: "2.5x longer conversations on average" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link href="/how-it-works" className="inline-flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to How It Works
          </Link>
        </nav>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Features</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock the full potential of Hanna's Connect with premium features designed to help you find love faster.
            </p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What You Get with Premium</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-3 mr-4">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <Card className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold mb-6 text-center">Premium Success Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {successStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold mb-2">{stat.value}</div>
                      <div className="text-lg font-semibold mb-1">{stat.label}</div>
                      <div className="text-sm opacity-90">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "ring-2 ring-pink-500 shadow-lg" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 hover:bg-pink-600">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {plan.price}
                      <span className="text-sm font-normal text-gray-600">/{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "text-gray-900" : "text-gray-400"}>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.buttonVariant}
                      className={`w-full ${
                        plan.buttonVariant === "default"
                          ? "bg-pink-500 hover:bg-pink-600"
                          : "border-gray-300 text-gray-700"
                      }`}
                      disabled={plan.name === "Free"}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <Card className="p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Yes, you can cancel your subscription at any time. You'll continue to have access to premium
                      features until the end of your billing period.
                    </p>
                    <h3 className="font-semibold text-gray-900 mb-2">Is there a money-back guarantee?</h3>
                    <p className="text-gray-600 text-sm">
                      We offer a 30-day money-back guarantee if you're not satisfied with your premium experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      We accept all major credit cards, PayPal, and Apple Pay for your convenience.
                    </p>
                    <h3 className="font-semibold text-gray-900 mb-2">Do premium features really work?</h3>
                    <p className="text-gray-600 text-sm">
                      Our data shows premium users are 3x more likely to find meaningful connections and relationships.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="text-center">
            <Card className="p-8 bg-gradient-to-r from-pink-50 to-purple-50">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Find Love Faster?</h2>
                <p className="text-gray-600 mb-6">
                  Join thousands of premium members who have found meaningful relationships through Hanna's Connect.
                </p>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 mr-4">
                  Upgrade to Premium
                </Button>
                <Button variant="outline">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
