import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FF69B4] to-[#FF9CC0] text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl max-w-3xl">
            At Hanna's Connect, we take your privacy seriously. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-8">Last Updated: May 1, 2023</p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">Introduction</h2>
              <p className="text-gray-700 mb-6">
                Welcome to Hanna's Connect. We are committed to protecting your privacy and ensuring that your personal
                information is handled in a safe and responsible manner. This Privacy Policy explains how we collect,
                use, and safeguard your information when you use our platform.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">Information We Collect</h2>
              <p className="text-gray-700 mb-4">We collect information that you provide directly to us when you:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Create an account and set up your profile</li>
                <li>Complete questionnaires or provide information about your preferences</li>
                <li>Communicate with other users through our platform</li>
                <li>Contact our customer support team</li>
                <li>Participate in surveys, promotions, or other activities</li>
              </ul>
              <p className="text-gray-700 mb-6">
                This information may include your name, email address, date of birth, gender, location, education,
                occupation, relationship goals, and other details you choose to share.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Provide, maintain, and improve our services</li>
                <li>Match you with compatible users based on your preferences</li>
                <li>Process transactions and manage your account</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Protect against fraudulent, unauthorized, or illegal activity</li>
                <li>Enforce our terms of service and other policies</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>With service providers who perform services on our behalf</li>
                <li>To comply with legal obligations or protect our rights</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
                <li>With your consent or at your direction</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">Data Security</h2>
              <p className="text-gray-700 mb-6">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You have certain rights regarding your personal information:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Access and update your profile information</li>
                <li>Control your privacy settings and visibility preferences</li>
                <li>Opt out of marketing communications</li>
                <li>Request deletion of your account and personal information</li>
                <li>Object to the processing of your information</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-6">
                We use cookies and similar tracking technologies to collect information about your browsing activities
                and to understand how you use our platform. You can control cookies through your browser settings and
                other tools.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">Children's Privacy</h2>
              <p className="text-gray-700 mb-6">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
                information from children. If you believe a child has provided us with personal information, please
                contact us, and we will take steps to delete such information.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                updated policy on our platform or through other communication channels.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-[#B22222]">Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices,
                please contact us at:
              </p>
              <p className="text-gray-700 mb-6">
                Email: privacy@hannasconnect.com
                <br />
                Address: 123 Connection Street, Suite 456, New York, NY 10001, United States
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-700 mb-6">
                By using Hanna's Connect, you agree to the collection and use of information in accordance with this
                Privacy Policy.
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
