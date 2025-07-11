import Link from "next/link"
import { Shield, EyeOff, UserCheck, Users, Search, MessageCircle, Heart, Info, UserPlus, BadgeCheck, User, Baby, Smile, XCircle, CheckCircle, MapPin, Briefcase, Sun, AlertTriangle, Star, ChevronRight } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center py-8 px-2">
      <div className="max-w-3xl w-full bg-white/95 rounded-3xl shadow-2xl p-8 md:p-14 border border-amber-200">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <Heart className="h-14 w-14 text-red-600 mb-2" fill="#fee2e2" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Welcome to Hanna’s Connect</h1>
          <p className="text-lg text-gray-700 font-medium flex items-center gap-2"><Shield className="inline h-5 w-5 text-amber-600" /> For Intentional Connections with Privacy</p>
        </div>
        {/* Membership & Privacy Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-base md:text-lg text-gray-800">
              <UserCheck className="h-5 w-5 text-red-700" />
              <span className="font-semibold">Members-only</span> for adults <span className="font-bold">25+</span>
            </div>
            <div className="flex items-center gap-2 text-base md:text-lg text-gray-800">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>3,000 KES for <span className="font-bold">180 days</span> access</span>
            </div>
            <div className="flex items-center gap-2 text-base md:text-lg text-gray-800">
              <XCircle className="h-5 w-5 text-gray-400" />
              <span>Non-refundable & non-transferable</span>
            </div>
            <div className="space-y-4 mt-4">
              <div className="bg-white rounded-xl shadow p-6 border border-amber-100 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2"><EyeOff className="h-6 w-6 text-amber-700" /><span className="font-semibold text-lg">Privacy is at our core.</span></div>
                <div className="text-gray-700 text-base">No public browsing—only verified members can view profiles.</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 border border-orange-100 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2"><AlertTriangle className="h-6 w-6 text-orange-500" /><span className="font-semibold text-lg">Discretion matters.</span></div>
                <div className="text-gray-700 text-base">No public advertising. <span className="inline-flex items-center gap-1"><User className="h-4 w-4 text-gray-500" /> Avatar-style profile images</span> let you engage without revealing your full face.</div>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4 flex flex-col justify-center">
            <div className="font-semibold mb-2 flex items-center gap-2 text-amber-700"><Info className="h-5 w-5" /> What you see in a profile:</div>
            <table className="w-full text-left text-gray-700 text-sm md:text-base border-separate border-spacing-y-1">
              <tbody>
                <tr><td className="font-medium flex items-center gap-2"><User className="h-4 w-4 text-red-600" />Age</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><Heart className="h-4 w-4 text-pink-500" />Looking for in a partner</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><XCircle className="h-4 w-4 text-gray-400" />What they do not want</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-orange-500" />Deal breakers</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" />Belief in marriage</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><Baby className="h-4 w-4 text-amber-600" />Desire for children</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><Baby className="h-4 w-4 text-amber-600" />Children (how many, living with them)</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-blue-600" />Marital status</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><Shield className="h-4 w-4 text-amber-700" />HIV status</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><Briefcase className="h-4 w-4 text-gray-700" />Occupation</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><MapPin className="h-4 w-4 text-pink-700" />County of residence & work</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><Smile className="h-4 w-4 text-yellow-500" />Body type & complexion</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><Sun className="h-4 w-4 text-orange-400" />Personality flaws/areas for growth</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><Info className="h-4 w-4 text-amber-700" />Self-description</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><XCircle className="h-4 w-4 text-gray-400" />Who should not contact them</td></tr>
                <tr><td className="font-medium flex items-center gap-2"><ChevronRight className="h-4 w-4 text-gray-400" />…and more</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* How it Works Steps Section */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">How Hanna’s Connect Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow p-6 border border-amber-100 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2"><UserPlus className="h-6 w-6 text-red-700" /><span className="font-semibold text-lg">1. Create Your Profile</span></div>
              <ul className="list-disc pl-6 text-gray-700 text-base space-y-1">
                <li>Showcase your personality, values, and preferences</li>
                <li>Upload a verified avatar image</li>
                <li>Complete all required fields for better matches</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border border-red-100 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2"><Search className="h-6 w-6 text-red-700" /><span className="font-semibold text-lg">2. Search & Filter</span></div>
              <ul className="list-disc pl-6 text-gray-700 text-base space-y-1">
                <li>Manually search profiles using advanced filters</li>
                <li>No algorithmic matchmaking—<span className="font-semibold">you’re in control</span></li>
                <li>Connect with members in Kenya or abroad</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border border-orange-100 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2"><Heart className="h-6 w-6 text-pink-600" /><span className="font-semibold text-lg">3. Connect Privately</span></div>
              <ul className="list-disc pl-6 text-gray-700 text-base space-y-1">
                <li>Click <span className="inline-flex items-center gap-1 font-semibold text-red-700"><Heart className="h-4 w-4" /> Connect</span> on a profile</li>
                <li>If accepted, your private inbox opens instantly</li>
                <li>If declined, you’ll receive a courteous notification</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border border-amber-100 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2"><MessageCircle className="h-6 w-6 text-amber-700" /><span className="font-semibold text-lg">4. Build Real Connections</span></div>
              <ul className="list-disc pl-6 text-gray-700 text-base space-y-1">
                <li>Share more as trust grows</li>
                <li>Meet in person when ready</li>
                <li>Enjoy a discreet, supportive environment</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Call to Action Section */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <Link href="/register">
            <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-all flex items-center gap-2">
              <UserPlus className="h-5 w-5" /> Click here to sign up today
            </button>
          </Link>
          <Link href="/login">
            <button className="mt-2 bg-white hover:bg-amber-50 border border-red-700 text-red-700 font-semibold py-3 px-8 rounded-xl text-base shadow transition-all flex items-center gap-2">
              <User className="h-5 w-5" /> Already a member? Log in to continue
            </button>
          </Link>
          <div className="text-xs text-gray-500 mt-2 flex items-center gap-2"><Info className="h-4 w-4 text-amber-600" /> The 3,000 KES membership fee is non-refundable and non-transferable.</div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400 font-medium">Hanna’s Connect, Where Intentions Match.</div>
      </div>
    </div>
  )
}
