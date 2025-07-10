// Utility to calculate compatibility between two users using all available fields
export function calculateCompatibility(user, candidate) {
  let score = 0;
  let total = 0;

  // Helper for primitive fields
  function compareField(field) {
    total++;
    if (user[field] && candidate[field] && user[field] === candidate[field]) score++;
  }

  // Helper for array fields
  function compareArrayField(field) {
    total++;
    if (Array.isArray(user[field]) && Array.isArray(candidate[field])) {
      if (user[field].some(val => candidate[field].includes(val))) score++;
    }
  }

  // List of primitive fields to compare
  const primitiveFields = [
    'age', 'gender', 'location', 'county', 'country', 'tribe', 'race', 'religion',
    'denomination', 'churchAttendance', 'maritalStatus', 'hasChildren', 'wantsChildren',
    'acceptsPartnerWithKids', 'smoking', 'alcohol', 'dietaryPreference', 'pets', 'snoring',
    'openToRelocate', 'sexualOrientation', 'relationshipTradition', 'datingPerspective',
    'financialStability', 'employmentStatus', 'bodyType', 'complexion', 'eyeColor',
    'dimples', 'tattoos', 'piercings', 'glasses', 'hivStatus', 'disability',
    'chronicIllness', 'allergies', 'bloodType', 'personalityType', 'politicalViews',
    'believesInMarriage', 'longDistanceOk'
  ];

  primitiveFields.forEach(compareField);

  // List of array fields to compare
  const arrayFields = [
    'languages', 'interests', 'hobbies', 'partnerPreferences'
  ];
  arrayFields.forEach(compareArrayField);

  // If no fields matched, return 0
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
} 