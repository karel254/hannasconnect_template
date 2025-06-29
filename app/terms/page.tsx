export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 text-center">Terms of Service</h1>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <p className="text-gray-600 mb-8 text-center">Last updated: December 2024</p>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using Hanna&apos;s Connect, you accept and agree to be bound by the terms and provision
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>You must be at least 18 years old to use our service</li>
                <li>You must provide accurate and truthful information</li>
                <li>You must not have been previously banned from our platform</li>
                <li>You must comply with all applicable laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Conduct</h2>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Use the service for any unlawful purpose</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Create fake profiles or impersonate others</li>
                <li>Share inappropriate or offensive content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated systems to access the service</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Guidelines</h2>
              <p className="text-gray-700 mb-4">All content you share must be:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Appropriate and respectful</li>
                <li>Accurate and not misleading</li>
                <li>Your own original content or properly licensed</li>
                <li>Free from spam or promotional material</li>
                <li>Compliant with our community standards</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data</h2>
              <p className="text-gray-700 mb-6">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
                protect your information. By using our service, you consent to our data practices as described in our
                Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to terminate or suspend your account at any time for violations of these terms or
                for any other reason we deem necessary. You may also delete your account at any time through your
                account settings.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                Hanna&apos;s Connect is provided &quot;as is&quot; without any warranties. We are not liable for any
                damages arising from your use of the service, including but not limited to direct, indirect, incidental,
                or consequential damages.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to modify these terms at any time. We will notify users of significant changes via
                email or through the platform. Continued use of the service after changes constitutes acceptance of the
                new terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="text-gray-700">
                  Email: legal@hannasconnect.com
                  <br />
                  Address: 123 Love Street, Heart City, HC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
