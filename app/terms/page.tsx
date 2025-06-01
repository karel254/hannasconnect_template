import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FF69B4] to-[#FF9CC0] text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl max-w-3xl">Please read these terms carefully before using Hanna's Connect.</p>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-8">Last Updated: May 1, 2023</p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing or using Hanna's Connect, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                using or accessing this platform.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">2. Eligibility</h2>
              <p className="text-gray-700 mb-6">
                You must be at least 18 years old to use Hanna's Connect. By using our platform, you represent and
                warrant that you are at least 18 years of age and have the legal capacity to enter into a binding
                agreement.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. You
                are responsible for:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="text-gray-700 mb-6">
                We reserve the right to suspend or terminate your account if you violate these terms or engage in
                fraudulent or harmful activities.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">4. User Conduct</h2>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Use our platform for any illegal purpose or in violation of any laws</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate any person or entity</li>
                <li>Post false, misleading, or deceptive content</li>
                <li>Attempt to gain unauthorized access to other user accounts or our systems</li>
                <li>Use our platform to send spam or unsolicited messages</li>
                <li>Interfere with the proper functioning of our platform</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">5. Content and Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                By posting content on Hanna's Connect, you grant us a non-exclusive, worldwide, royalty-free license to
                use, reproduce, modify, and display such content in connection with our services.
              </p>
              <p className="text-gray-700 mb-6">
                You represent and warrant that you own or have the necessary rights to the content you post and that it
                does not violate the rights of any third party.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">6. Privacy</h2>
              <p className="text-gray-700 mb-6">
                Your use of Hanna's Connect is also governed by our Privacy Policy, which is incorporated into these
                Terms of Service by reference. Please review our Privacy Policy to understand how we collect, use, and
                protect your information.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">7. Subscription and Payments</h2>
              <p className="text-gray-700 mb-4">
                We offer both free and premium subscription options. By subscribing to a premium plan:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>You agree to pay all fees associated with your subscription</li>
                <li>Your subscription will automatically renew unless you cancel it</li>
                <li>You authorize us to charge your payment method for the subscription fees</li>
                <li>Refunds are provided in accordance with our refund policy</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">8. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-6">
                Hanna's Connect is provided "as is" and "as available" without any warranties of any kind, either
                express or implied. We do not guarantee that our platform will be uninterrupted, secure, or error-free.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                To the maximum extent permitted by law, Hanna's Connect shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages resulting from your use of or inability to use
                our platform.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">10. Indemnification</h2>
              <p className="text-gray-700 mb-6">
                You agree to indemnify and hold harmless Hanna's Connect and its affiliates, officers, employees, and
                agents from any claims, liabilities, damages, losses, and expenses arising from your use of our platform
                or violation of these terms.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">11. Modifications to Terms</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to modify these Terms of Service at any time. We will notify you of any material
                changes by posting the updated terms on our platform or through other communication channels. Your
                continued use of Hanna's Connect after such modifications constitutes your acceptance of the updated
                terms.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">12. Governing Law</h2>
              <p className="text-gray-700 mb-6">
                These Terms of Service shall be governed by and construed in accordance with the laws of the United
                States, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">13. Contact Information</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-700 mb-6">
                Email: legal@hannasconnect.com
                <br />
                Address: 123 Connection Street, Suite 456, New York, NY 10001, United States
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-700 mb-6">
                By using Hanna's Connect, you acknowledge that you have read, understood, and agree to be bound by these
                Terms of Service.
              </p>
              <div className="flex justify-center">
                <Button className="bg-[#B22222] hover:bg-[#8B0000] text-white shadow-md font-medium px-6 py-3" asChild>
                  <Link href="/contact">Contact Us With Questions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
