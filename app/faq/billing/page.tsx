import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard, DollarSign, RefreshCw } from "lucide-react"

export default function BillingFAQPage() {
  const billingFAQs = [
    {
      question: "How much does Hanna's Connect cost?",
      answer:
        "We offer a free basic membership and premium plans starting at $29.99/month. Premium Plus is $49.99/month. We also offer 3-month and 6-month plans at discounted rates. All premium features are included with no hidden fees.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are processed securely through encrypted payment gateways.",
    },
    {
      question: "When will I be charged?",
      answer:
        "You'll be charged immediately when you upgrade to premium. For monthly subscriptions, you'll be billed on the same date each month. For longer plans, you'll be charged the full amount upfront.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes! You can cancel your subscription anytime in Settings > Billing > Cancel Subscription. You'll continue to have premium access until the end of your current billing period, then your account will revert to free.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for first-time premium subscribers. If you're not satisfied within 30 days of your first premium purchase, contact support for a full refund. Refunds are processed within 5-7 business days.",
    },
    {
      question: "What happens if my payment fails?",
      answer:
        "If a payment fails, we'll retry charging your card 3 times over 7 days. You'll receive email notifications about failed payments. If all attempts fail, your account will revert to free membership until payment is updated.",
    },
    {
      question: "Can I change my subscription plan?",
      answer:
        "Yes! You can upgrade or downgrade your plan anytime in Settings > Billing. Upgrades take effect immediately with prorated billing. Downgrades take effect at the end of your current billing cycle.",
    },
    {
      question: "Do you offer student discounts?",
      answer:
        "Yes! We offer a 50% student discount on all premium plans. Verify your student status through our partner service, and the discount will be applied automatically. Student verification is required annually.",
    },
    {
      question: "What if I want to pause my subscription?",
      answer:
        "We don't offer subscription pausing, but you can cancel anytime and resubscribe later. Alternatively, you can hide your profile in Settings > Privacy to take a break while keeping your premium features active.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees! The price you see is what you pay. This includes all premium features, customer support, and platform access. Some app stores may charge additional fees for in-app purchases.",
    },
    {
      question: "Can I get a receipt for my purchase?",
      answer:
        "Yes! Receipts are automatically emailed to your registered email address after each payment. You can also download receipts anytime from Settings > Billing > Payment History.",
    },
    {
      question: "What if I'm charged incorrectly?",
      answer:
        "If you notice an incorrect charge, contact our billing support immediately. We'll investigate and resolve billing issues within 24-48 hours. Incorrect charges are refunded promptly once verified.",
    },
  ]

  const pricingPlans = [
    { name: "Free", price: "$0", features: ["Basic matching", "Limited messages", "Profile creation"] },
    { name: "Premium", price: "$29.99/mo", features: ["Unlimited messages", "See who likes you", "Advanced filters"] },
    {
      name: "Premium Plus",
      price: "$49.99/mo",
      features: ["Everything in Premium", "Personal coach", "Priority support"],
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

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-pink-500 mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">Billing & Subscription</h1>
            </div>
            <p className="text-xl text-gray-600">
              Everything you need to know about pricing, payments, and managing your subscription.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {billingFAQs.map((faq, index) => (
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
                    <DollarSign className="h-6 w-6 text-green-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Current Plans</h3>
                  </div>
                  <div className="space-y-4">
                    {pricingPlans.map((plan, index) => (
                      <div key={index} className="border-l-4 border-pink-500 pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                          <span className="text-pink-600 font-bold">{plan.price}</span>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent className="p-6 text-center">
                  <RefreshCw className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Day Guarantee</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Not satisfied? Get a full refund within 30 days of your first premium purchase.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full bg-transparent">
                      Contact Billing Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upgrade to Premium</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Unlock all features and find meaningful connections faster.
                  </p>
                  <Link href="/how-it-works/premium">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full">View Premium Features</Button>
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
