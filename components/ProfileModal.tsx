import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Heart, Info, Settings, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return "N/A";
  try {
    const dob = new Date(dateOfBirth);
    if (isNaN(dob.getTime())) return "N/A";
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  } catch (error) {
    return "N/A";
  }
}

export default function ProfileModal({ open, onOpenChange, profile }) {
  if (!profile) return null;
  
  // Safely handle profile data
  const safeProfile = {
    ...profile,
    interests: Array.isArray(profile.interests) ? profile.interests : [],
    languages: Array.isArray(profile.languages) ? profile.languages : [],
    preferences: profile.preferences || {}
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-full max-h-[95vh] overflow-y-auto p-0 bg-gradient-to-br from-white via-red-50 to-[#fff0f0] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl mx-2">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6">
          {/* Left Column - Profile Info */}
          <div className="flex-shrink-0 flex flex-col items-center w-full lg:w-1/3 space-y-4">
            <div className="relative">
              <img 
                src={safeProfile.icon || safeProfile.avatar} 
                alt="Profile" 
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-[#B22222] shadow-xl object-cover" 
              />
              <span className="absolute -bottom-1 -right-1 bg-[#B22222] text-white text-xs px-2 py-1 rounded-full shadow">
                {safeProfile.age || calculateAge(safeProfile.dateOfBirth)} yrs
              </span>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl lg:text-2xl font-bold text-[#B22222] tracking-tight leading-tight drop-shadow break-words">
                {safeProfile.name}
              </h2>
              <div className="text-gray-600 dark:text-gray-300 text-sm lg:text-base break-words">
                @{safeProfile.username}
              </div>
              <div className="flex flex-wrap justify-center gap-1 mb-2">
                <Badge className="bg-[#B22222] text-white font-medium px-2 py-1 text-xs">
                  {safeProfile.occupation}
                </Badge>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm text-center break-words">
                {safeProfile.location}
              </div>
            </div>
            <div className="flex flex-wrap gap-1 justify-center w-full">
              {(safeProfile.interests || ['Art','Travel','Photography']).slice(0, 6).map((interest, i) => (
                <Badge key={i} className="bg-red-100 text-[#B22222] dark:bg-red-900/20 dark:text-red-400 text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Right Column - Details */}
          <div className="flex-1 space-y-4 lg:space-y-6 min-w-0">
            {/* Personal Info */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-4 lg:p-6">
              <h3 className="font-bold text-lg lg:text-xl text-[#B22222] mb-3 flex items-center gap-2 border-b border-[#B22222]/20 pb-2">
                <User className="h-5 w-5 flex-shrink-0" /> 
                <span className="break-words">Personal Info</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2 lg:gap-y-3 text-sm lg:text-base">
                <div className="break-words"><span className="font-semibold">Username:</span> {safeProfile.username || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Gender:</span> {safeProfile.gender || safeProfile.preferences?.gender || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Age:</span> {safeProfile.age || calculateAge(safeProfile.dateOfBirth) || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Race:</span> {safeProfile.race || safeProfile.preferences?.race || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Country:</span> {safeProfile.country || safeProfile.preferences?.country || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">County:</span> {safeProfile.county || safeProfile.preferences?.county || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Tribe:</span> {safeProfile.tribe || safeProfile.preferences?.tribe || 'N/A'}</div>
                <div className="sm:col-span-2 break-words">
                  <span className="font-semibold">Languages:</span> {
                    (safeProfile.languages && safeProfile.languages.length > 0) ? 
                    safeProfile.languages.join(', ') : 
                    (safeProfile.preferences?.languages && safeProfile.preferences.languages.length > 0) ? 
                    safeProfile.preferences.languages.join(', ') : 'N/A'
                  }
                </div>
              </div>
            </div>
            
            {/* Physical Appearance */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-4 lg:p-6">
              <h3 className="font-bold text-lg lg:text-xl text-[#B22222] mb-3 flex items-center gap-2 border-b border-[#B22222]/20 pb-2">
                <Info className="h-5 w-5 flex-shrink-0" /> 
                <span className="break-words">Physical Appearance</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2 lg:gap-y-3 text-sm lg:text-base">
                <div className="break-words"><span className="font-semibold">Height:</span> {safeProfile.height || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Weight:</span> {safeProfile.weight || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Body Type:</span> {safeProfile.bodyType || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Complexion:</span> {safeProfile.complexion || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Eye Color:</span> {safeProfile.eyeColor || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Dimples:</span> {safeProfile.dimples || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Teeth Features:</span> {safeProfile.teethFeatures || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Tattoos:</span> {safeProfile.tattoos || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Piercings:</span> {safeProfile.piercings || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Glasses:</span> {safeProfile.glasses || 'N/A'}</div>
                <div className="sm:col-span-2 break-words">
                  <span className="font-semibold">Self Description (Physical):</span> {safeProfile.selfDescriptionPhysical || 'N/A'}
                </div>
              </div>
            </div>
            
            {/* Health */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-4 lg:p-6">
              <h3 className="font-bold text-lg lg:text-xl text-[#B22222] mb-3 flex items-center gap-2 border-b border-[#B22222]/20 pb-2">
                <Heart className="h-5 w-5 flex-shrink-0" /> 
                <span className="break-words">Health</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2 lg:gap-y-3 text-sm lg:text-base">
                <div className="break-words"><span className="font-semibold">HIV Status:</span> {safeProfile.hivStatus || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Disability:</span> {safeProfile.disability || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Chronic Illness:</span> {safeProfile.chronicIllness || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Allergies:</span> {safeProfile.allergies || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Blood Type:</span> {safeProfile.bloodType || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Snoring:</span> {safeProfile.snoring || safeProfile.preferences?.snoring || 'N/A'}</div>
              </div>
            </div>
            
            {/* Work & Lifestyle */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-4 lg:p-6">
              <h3 className="font-bold text-lg lg:text-xl text-[#B22222] mb-3 flex items-center gap-2 border-b border-[#B22222]/20 pb-2">
                <Settings className="h-5 w-5 flex-shrink-0" /> 
                <span className="break-words">Work & Lifestyle</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2 lg:gap-y-3 text-sm lg:text-base">
                <div className="break-words"><span className="font-semibold">Employment Status:</span> {safeProfile.employmentStatus || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Occupation:</span> {safeProfile.occupation || 'N/A'}</div>
                <div className="sm:col-span-2 break-words">
                  <span className="font-semibold">Work Location:</span> {
                    [safeProfile.workCountry, safeProfile.workCounty, safeProfile.workConstituency, safeProfile.workWard, safeProfile.workState]
                    .filter(Boolean).join(', ') || 'N/A'
                  }
                </div>
                <div className="break-words"><span className="font-semibold">Financial Stability:</span> {safeProfile.financialStability || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Alcohol:</span> {safeProfile.alcohol || safeProfile.preferences?.alcohol || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Smoking:</span> {safeProfile.smoking || safeProfile.preferences?.smoking || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Dietary Preference:</span> {safeProfile.dietaryPreference || safeProfile.preferences?.dietaryPreference || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Has Pets:</span> {safeProfile.hasPets || safeProfile.preferences?.pets || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Exercise Frequency:</span> {safeProfile.exerciseFrequency || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Hobbies:</span> {safeProfile.hobbies || 'N/A'}</div>
              </div>
            </div>
            
            {/* Beliefs */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-4 lg:p-6">
              <h3 className="font-bold text-lg lg:text-xl text-[#B22222] mb-3 flex items-center gap-2 border-b border-[#B22222]/20 pb-2">
                <Calendar className="h-5 w-5 flex-shrink-0" /> 
                <span className="break-words">Beliefs</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2 lg:gap-y-3 text-sm lg:text-base">
                <div className="break-words"><span className="font-semibold">Religion:</span> {safeProfile.religion || safeProfile.preferences?.religion || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Religiousness:</span> {safeProfile.religiousness || safeProfile.preferences?.religiousness || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Denomination:</span> {safeProfile.denomination || safeProfile.preferences?.denomination || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Church Attendance:</span> {safeProfile.churchAttendance || safeProfile.preferences?.churchAttendance || 'N/A'}</div>
              </div>
            </div>
            
            {/* Family */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-4 lg:p-6">
              <h3 className="font-bold text-lg lg:text-xl text-[#B22222] mb-3 flex items-center gap-2 border-b border-[#B22222]/20 pb-2">
                <Users className="h-5 w-5 flex-shrink-0" /> 
                <span className="break-words">Family</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2 lg:gap-y-3 text-sm lg:text-base">
                <div className="break-words"><span className="font-semibold">Marital Status:</span> {safeProfile.maritalStatus || safeProfile.preferences?.maritalStatus || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Has Children:</span> {safeProfile.hasChildren || safeProfile.preferences?.hasChildren || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Number of Children:</span> {safeProfile.numberOfChildren || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Children Ages:</span> {safeProfile.childrenAges || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Children Live With User:</span> {safeProfile.childrenLiveWithUser || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Wants Children:</span> {safeProfile.wantsChildren || safeProfile.preferences?.wantsChildren || 'N/A'}</div>
                <div className="sm:col-span-2 break-words">
                  <span className="font-semibold">Accepts Partner With Kids:</span> {safeProfile.acceptsPartnerWithKids || safeProfile.preferences?.acceptsPartnerWithKids || 'N/A'}
                </div>
              </div>
            </div>
            
            {/* Preferences */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-4 lg:p-6">
              <h3 className="font-bold text-lg lg:text-xl text-[#B22222] mb-3 flex items-center gap-2 border-b border-[#B22222]/20 pb-2">
                <Settings className="h-5 w-5 flex-shrink-0" /> 
                <span className="break-words">Preferences</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2 lg:gap-y-3 text-sm lg:text-base">
                <div className="break-words"><span className="font-semibold">Open to Relocate:</span> {safeProfile.openToRelocate || safeProfile.preferences?.openToRelocate || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Sexual Orientation:</span> {safeProfile.sexualOrientation || safeProfile.preferences?.sexualOrientation || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Relationship Tradition:</span> {safeProfile.relationshipTradition || safeProfile.preferences?.relationshipTradition || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Long Distance OK:</span> {safeProfile.longDistanceOk || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Dating Perspective:</span> {safeProfile.datingPerspective || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Deal Breakers:</span> {safeProfile.dealBreakers || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Relationship Hopes:</span> {safeProfile.relationshipHopes || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Partner Preferences:</span> {safeProfile.partnerPreferences || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Personality Type:</span> {safeProfile.personalityType || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Don't Contact If:</span> {safeProfile.dontContactIf || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Imperfections:</span> {safeProfile.imperfections || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Political Views:</span> {safeProfile.politicalViews || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Date Different Politics:</span> {safeProfile.dateDifferentPolitics || 'N/A'}</div>
                <div className="break-words"><span className="font-semibold">Believes in Marriage:</span> {safeProfile.believesInMarriage || 'N/A'}</div>
              </div>
            </div>
            
            {/* About Me */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-4 lg:p-6">
              <h3 className="font-bold text-lg lg:text-xl text-[#B22222] mb-3 flex items-center gap-2 border-b border-[#B22222]/20 pb-2">
                <Info className="h-5 w-5 flex-shrink-0" /> 
                <span className="break-words">About Me</span>
              </h3>
              <div className="text-gray-700 dark:text-gray-300 italic text-sm lg:text-base break-words">
                {safeProfile.bio || safeProfile.selfDescription || 'No bio provided yet.'}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 