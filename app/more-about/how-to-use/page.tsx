import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, MessageCircle, User, BookOpen, TrendingUp, HelpCircle, Calendar, MapPin, Shield, Star, Home } from "lucide-react"

export default function HowToUsePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center flex items-center justify-center gap-2">
          <BookOpen className="h-8 w-8 text-[#B22222] dark:text-red-400" />
          How to Use This App
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8">
          Welcome to Hanna's Connect! This guide will walk you through every feature and page so you can get the most out of your experience.
        </p>

        {/* Home Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#B22222] mb-2 flex items-center gap-2"><Home className="h-6 w-6" />Home</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>See a summary of your activity: Profile Views, New Matches, Messages, and Connections.</li>
            <li>Quick access to Browse Members, Requests, Messages, Edit Profile, and More About This App.</li>
            <li><span className="inline-flex items-center gap-1"><TrendingUp className="h-4 w-4 text-[#B22222]" />People You Might Be Interested In</span> shows suggested profiles. Click <b>Connect</b> to send a request or <b>View Profile</b> for more details.</li>
            <li><span className="inline-flex items-center gap-1"><BookOpen className="h-4 w-4 text-[#B22222]" />Latest from Our Blog</span> keeps you updated with articles and tips.</li>
          </ul>
        </section>

        {/* Browse/Members Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#B22222] mb-2 flex items-center gap-2"><Users className="h-6 w-6" />Members (Browse)</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>Discover and search for other members.</li>
            <li>Filter by interests, location, and more.</li>
            <li>Click a member to view their profile or connect.</li>
          </ul>
        </section>

        {/* Requests Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#B22222] mb-2 flex items-center gap-2"><Heart className="h-6 w-6" />Requests</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>View and manage your connection requests.</li>
            <li>Accept or reject requests from other members.</li>
            <li>See the status of your sent and received requests.</li>
          </ul>
        </section>

        {/* Messages Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#B22222] mb-2 flex items-center gap-2"><MessageCircle className="h-6 w-6" />Messages</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>Chat with your connections in real time.</li>
            <li>Unread messages are highlighted for your attention.</li>
            <li>Click a conversation to continue chatting or view profile details.</li>
          </ul>
        </section>

        {/* Profile Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#B22222] mb-2 flex items-center gap-2"><User className="h-6 w-6" />Profile</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>View and edit your personal information, interests, and preferences.</li>
            <li>Upload or change your profile photo and gallery.</li>
            <li>Adjust privacy, notification, and appearance settings.</li>
            <li>Manage your connections, blocked users, and pending requests.</li>
            <li>Access account actions like changing password, updating email, or deleting your account.</li>
          </ul>
        </section>

        {/* Connections Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#B22222] mb-2 flex items-center gap-2"><TrendingUp className="h-6 w-6" />Connections</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>See a list of all users you are connected with.</li>
            <li>View their profiles, send messages, or manage your relationship status.</li>
          </ul>
        </section>

        {/* Blog Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#B22222] mb-2 flex items-center gap-2"><BookOpen className="h-6 w-6" />Blog</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>Read articles, tips, and stories from the Hanna's Connect team.</li>
            <li>Stay informed about new features, safety tips, and community highlights.</li>
          </ul>
        </section>

        {/* More About This App Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#B22222] mb-2 flex items-center gap-2"><HelpCircle className="h-6 w-6" />More About This App</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>Access information about the app, including About Us, FAQ, Contact, Terms, Privacy Policy, and Disclaimer.</li>
            <li>Find answers to common questions and learn about our mission and values.</li>
          </ul>
        </section>

        {/* Visual Navigation Illustration */}
        <section>
          <h2 className="text-xl font-semibold text-[#B22222] mb-2 mt-8 flex items-center gap-2"><Shield className="h-5 w-5" />Navigation Tips</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>Use the <b>bottom navigation bar</b> on mobile to quickly switch between Home, Members, Requests, Messages, and Profile.</li>
            <li>On desktop, use the dashboard and sidebar for easy access to all features.</li>
            <li>Look for icons and badges to spot new activity or notifications.</li>
          </ul>
        </section>

        <div className="text-center mt-10">
          <Link href="/">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl font-semibold text-lg transition-colors">
              <Home className="h-5 w-5" /> Go to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
} 