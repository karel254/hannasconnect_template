"use client"

import { useState, useCallback, useMemo, memo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Progress } from "../../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ArrowRight, CheckCircle, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"
import { useRef } from "react"

function scrollIntoViewIfNeeded(element: HTMLElement | null) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const headerOffset = 80; // Adjust if your header is taller
  const footerOffset = 80; // Adjust if your footer is taller
  const viewHeight = window.innerHeight;
  // If the input is below the visible area (minus footer), scroll it up
  if (rect.bottom > viewHeight - footerOffset) {
    window.scrollBy({
      top: rect.bottom - (viewHeight - footerOffset) + 16,
      behavior: "smooth",
    });
  }
  // If the input is above the visible area (plus header), scroll it down
  if (rect.top < headerOffset) {
    window.scrollBy({
      top: rect.top - headerOffset - 16,
      behavior: "smooth",
    });
  }
}

// Data constants moved to separate object for better performance
const DATA_CONSTANTS = {
  worldCountries: [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ],

  kenyanCounties: [
    "Baringo",
    "Bomet",
    "Bungoma",
    "Busia",
    "Elgeyo-Marakwet",
    "Embu",
    "Garissa",
    "Homa Bay",
    "Isiolo",
    "Kajiado",
    "Kakamega",
    "Kericho",
    "Kiambu",
    "Kilifi",
    "Kirinyaga",
    "Kisii",
    "Kisumu",
    "Kitui",
    "Kwale",
    "Laikipia",
    "Lamu",
    "Machakos",
    "Makueni",
    "Mandera",
    "Marsabit",
    "Meru",
    "Migori",
    "Mombasa",
    "Murang'a",
    "Nairobi",
    "Nakuru",
    "Nandi",
    "Narok",
    "Nyamira",
    "Nyandarua",
    "Nyeri",
    "Samburu",
    "Siaya",
    "Taita-Taveta",
    "Tana River",
    "Tharaka-Nithi",
    "Trans Nzoia",
    "Turkana",
    "Uasin Gishu",
    "Vihiga",
    "Wajir",
    "West Pokot",
  ],

  kenyanConstituencies: {
    Nairobi: [
      "Dagoretti North",
      "Dagoretti South",
      "Embakasi Central",
      "Embakasi East",
      "Embakasi North",
      "Embakasi South",
      "Embakasi West",
      "Kamukunji",
      "Kasarani",
      "Kibra",
      "Lang'ata",
      "Makadara",
      "Mathare",
      "Roysambu",
      "Ruaraka",
      "Starehe",
      "Westlands",
    ],
    Mombasa: ["Changamwe", "Jomba", "Kisauni", "Likoni", "Mvita", "Nyali"],
    Kisumu: ["Kisumu Central", "Kisumu East", "Kisumu West", "Muhoroni", "Nyakach", "Nyando", "Seme"],
    Nakuru: [
      "Bahati",
      "Gilgil",
      "Kuresoi North",
      "Kuresoi South",
      "Molo",
      "Naivasha",
      "Nakuru Town East",
      "Nakuru Town West",
      "Njoro",
      "Rongai",
      "Subukia",
    ],
    Kiambu: [
      "Gatundu North",
      "Gatundu South",
      "Githunguri",
      "Juja",
      "Kabete",
      "Kiambaa",
      "Kiambu",
      "Kikuyu",
      "Limuru",
      "Ruiru",
      "Thika Town",
      "Lari",
    ],
  },

  kenyanWards: {
    Westlands: ["Kitisuru", "Parklands/Highridge", "Karura", "Kangemi", "Mountain View"],
    "Lang'ata": ["Karen", "Nairobi West", "Mugumo-ini", "South C", "Nyayo Highrise"],
    Starehe: ["Nairobi Central", "Ngara", "Pangani", "Ziwani/Kariokor", "Landimawe"],
    Kasarani: ["Clay City", "Mwiki", "Kasarani", "Njiru", "Ruai"],
  },

  kenyanTribes: [
    "Agikuyu",
    "Akamba",
    "Abaluhya",
    "Aluo",
    "Ameru",
    "Abagusii",
    "Amiji",
    "Turkana",
    "Aembu",
    "Akurya",
    "Asomali",
    "Kalenjin",
    "Ataita",
    "Asuba",
    "Agalla",
    "Abakuria",
    "Maasai",
    "Samburu",
    "Ambeere",
    "Adakama",
    "Apokomo",
    "Malakote",
    "Yaaku",
    "Abwaidakho",
    "Dahalo",
    "Boni",
    "Sanye",
    "Sakuye",
    "Garre",
    "Gabra",
    "Borana",
    "Burji",
    "Konso",
    "Rendille",
    "Ariaal",
    "Elmolo",
    "Munyoyaya",
    "Ogiek",
    "Sengwer",
    "Endorois",
    "Makonde",
    "Taita",
    "Taveta",
    "Duruma",
    "Digo",
    "Rabai",
    "Ribe",
    "Kauma",
    "Chonyi",
    "Jibana",
    "Kambe",
    "Giriama",
  ],

  worldLanguages: [
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bosnian",
    "Bulgarian",
    "Burmese",
    "Catalan",
    "Chinese (Mandarin)",
    "Chinese (Cantonese)",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Estonian",
    "Finnish",
    "French",
    "Georgian",
    "German",
    "Greek",
    "Gujarati",
    "Hebrew",
    "Hindi",
    "Hungarian",
    "Icelandic",
    "Indonesian",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Khmer",
    "Korean",
    "Kurdish",
    "Kyrgyz",
    "Lao",
    "Latvian",
    "Lithuanian",
    "Macedonian",
    "Malay",
    "Malayalam",
    "Maltese",
    "Marathi",
    "Mongolian",
    "Nepali",
    "Norwegian",
    "Oriya",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Romanian",
    "Russian",
    "Serbian",
    "Sinhala",
    "Slovak",
    "Slovenian",
    "Spanish",
    "Swahili",
    "Swedish",
    "Tamil",
    "Telugu",
    "Thai",
    "Turkish",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yoruba",
    "Zulu",
  ],

  countriesAndStates: {
    "United States": [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
      "District of Columbia",
    ],
    Canada: [
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Northwest Territories",
      "Nova Scotia",
      "Nunavut",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
      "Yukon",
    ],
    Australia: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Western Australia",
      "South Australia",
      "Tasmania",
      "Northern Territory",
      "Australian Capital Territory",
    ],
    Germany: [
      "Baden-Württemberg",
      "Bavaria",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hesse",
      "Lower Saxony",
      "Mecklenburg-Vorpommern",
      "North Rhine-Westphalia",
      "Rhineland-Palatinate",
      "Saarland",
      "Saxony",
      "Saxony-Anhalt",
      "Schleswig-Holstein",
      "Thuringia",
    ],
    "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
    Kenya: [
      "Baringo",
      "Bomet",
      "Bungoma",
      "Busia",
      "Elgeyo-Marakwet",
      "Embu",
      "Garissa",
      "Homa Bay",
      "Isiolo",
      "Kajiado",
      "Kakamega",
      "Kericho",
      "Kiambu",
      "Kilifi",
      "Kirinyaga",
      "Kisii",
      "Kisumu",
      "Kitui",
      "Kwale",
      "Laikipia",
      "Lamu",
      "Machakos",
      "Makueni",
      "Mandera",
      "Marsabit",
      "Meru",
      "Migori",
      "Mombasa",
      "Murang'a",
      "Nairobi",
      "Nakuru",
      "Nandi",
      "Narok",
      "Nyamira",
      "Nyandarua",
      "Nyeri",
      "Samburu",
      "Siaya",
      "Taita-Taveta",
      "Tana River",
      "Tharaka-Nithi",
      "Trans Nzoia",
      "Turkana",
      "Uasin Gishu",
      "Vihiga",
      "Wajir",
      "West Pokot",
    ],
  },

  religions: [
    "Christianity",
    "Islam",
    "Hinduism",
    "Buddhism",
    "Judaism",
    "Traditional African Religion",
    "Sikhism",
    "Bahá'í Faith",
    "Atheist",
    "Agnostic",
    "Other",
  ],

  educationLevels: [
    "Primary School",
    "Secondary School",
    "College/Diploma",
    "University (Bachelor's)",
    "Postgraduate (Master's)",
    "PhD/Doctorate",
    "Trade/Vocational School",
  ],

  maritalStatuses: ["Single", "Divorced", "Widowed", "In a relationship"],
}

// Memoized Avatar Selection Component
const AvatarSelection = memo(
  ({
    selectedAvatar,
    onSelect,
    fullName,
  }: {
    selectedAvatar: number
    onSelect: (avatar: number) => void
    fullName: string
  }) => {
    const maleImages = ['male1.jpg', 'male2.jpg', 'male3.jpg', 'male4.jpeg']
    const femaleImages = ['female1.jpg', 'female2.jpg', 'female3.jpg', 'female4.jpg', 'female5.jpg', 'female6.jpg', 'female7.jpg', 'female8.jpeg']
    
    const allImages = [...maleImages, ...femaleImages]
    const selectedImage = allImages[selectedAvatar] || allImages[0]
    
    return (
      <div className="space-y-3">
        <Label className="text-sm font-medium dark:text-gray-200">Choose Your Profile Avatar</Label>
        <div className="flex justify-center mb-4">
          <Avatar className="h-20 w-20 ring-2 ring-[#B22222]/20 dark:ring-red-400/20">
            <AvatarImage src={`/images/${selectedImage}`} alt="Selected avatar" />
            <AvatarFallback className="text-lg font-bold text-[#B22222] dark:text-red-400">
              {fullName.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {allImages.map((imageName, index) => (
            <div
              key={index}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 aspect-square ${
                selectedAvatar === index
                  ? "border-[#B22222] dark:border-red-400 bg-red-50 dark:bg-red-900/20 scale-105"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:scale-102"
              }`}
              onClick={() => onSelect(index)}
            >
              <img
                src={`/images/${imageName}`}
                alt={`Avatar ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {selectedAvatar === index && (
                <div className="absolute inset-0 bg-[#B22222]/10 dark:bg-red-400/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-[#B22222] dark:text-red-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  },
)

// Memoized Searchable Select Component
const SearchableSelect = memo(
  ({
    items,
    value,
    onValueChange,
    placeholder,
    searchPlaceholder,
    label,
    onFocus,
  }: {
    items: string[]
    value: string
    onValueChange: (value: string) => void
    placeholder: string
    searchPlaceholder: string
    label: string
    onFocus?: (e: React.FocusEvent<HTMLElement>) => void
  }) => {
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 300)

    const filteredItems = useMemo(
      () => items.filter((item) => item.toLowerCase().includes(debouncedSearch.toLowerCase())),
      [items, debouncedSearch],
    )

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="space-y-2">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="transition-all duration-200"
            onFocus={onFocus}
          />
          <Select
            value={value}
            onValueChange={(val) => {
              onValueChange(val)
              setSearch("")
            }}
          >
            <SelectTrigger className="transition-all duration-200" onFocus={onFocus}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              {filteredItems.map((item) => (
                <SelectItem key={item} value={item} className="transition-colors duration-150">
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  },
)

interface FormData {
  selectedAvatar: number
  username: string
  gender: string
  customGender: string
  dateOfBirth: string
  race: string // NEW
  country: string
  county: string
  constituency: string
  ward: string
  state: string
  email: string
  password: string
  confirmPassword: string
  tribe: string
  languages: string[]
  weight: string
  weightUnit: string
  height: string
  heightUnit: string
  dimples: string
  dimplesDescription?: string
  teethFeatures: string
  eyeColor: string
  complexion: string
  piercings: string
  piercingsDescription?: string
  tattoos: string
  tattoosDescription?: string
  glasses: string
  glassesDescription?: string
  hivStatus: string
  disability: string
  disabilityDescription?: string
  chronicIllness: string
  chronicIllnessDescription?: string
  allergies: string
  bloodType: string
  employmentStatus: string
  occupation: string
  workCountry: string
  workCounty: string
  workConstituency: string
  workWard: string
  workState: string
  financialStability: string
  alcohol: string
  smoking: string
  hobbies: string
  interests: string
  religion: string
  religiousness: number
  denomination: string
  churchAttendance: string
  exerciseFrequency: string
  maritalStatus: string
  hasChildren: string
  numberOfChildren: string
  childrenAges: string
  childrenLiveWithUser: string
  wantsChildren: string
  acceptsPartnerWithKids: string
  acceptsPartnerWithKidsDescription?: string
  longDistanceOk: string
  datingPerspective: string
  dealBreakers: string
  relationshipHopes: string
  partnerPreferences: string
  personalityType: string
  dontContactIf: string
  imperfections: string
  politicalViews: string
  dateDifferentPolitics: string
  believesInMarriage: string
  selfDescription: string
  termsAccepted: boolean // moved up
  paymentCompleted: boolean // moved up
  emailVerified: boolean // NEW
  snoring: string // NEW
  dietaryPreference: string // NEW
  hasPets: string // NEW
  petsDescription?: string // NEW
  openToRelocate: string // NEW
  sexualOrientation: string // NEW
  relationshipTradition: string // NEW
}

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    selectedAvatar: 0,
    username: "",
    gender: "",
    customGender: "",
    dateOfBirth: "",
    race: "", // NEW
    country: "",
    county: "",
    constituency: "",
    ward: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
    tribe: "",
    languages: [],
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    dimples: "",
    dimplesDescription: "",
    teethFeatures: "",
    eyeColor: "",
    complexion: "",
    piercings: "",
    piercingsDescription: "",
    tattoos: "",
    tattoosDescription: "",
    glasses: "",
    glassesDescription: "",
    hivStatus: "",
    disability: "",
    disabilityDescription: "",
    chronicIllness: "",
    chronicIllnessDescription: "",
    allergies: "",
    bloodType: "",
    employmentStatus: "",
    occupation: "",
    workCountry: "",
    workCounty: "",
    workConstituency: "",
    workWard: "",
    workState: "",
    financialStability: "",
    alcohol: "",
    smoking: "",
    hobbies: "",
    interests: "",
    religion: "",
    religiousness: 3,
    denomination: "",
    churchAttendance: "",
    exerciseFrequency: "",
    maritalStatus: "",
    hasChildren: "",
    numberOfChildren: "",
    childrenAges: "",
    childrenLiveWithUser: "",
    wantsChildren: "",
    acceptsPartnerWithKids: "",
    acceptsPartnerWithKidsDescription: "",
    longDistanceOk: "",
    datingPerspective: "",
    dealBreakers: "",
    relationshipHopes: "",
    partnerPreferences: "",
    personalityType: "",
    dontContactIf: "",
    imperfections: "",
    politicalViews: "",
    dateDifferentPolitics: "",
    believesInMarriage: "",
    selfDescription: "",
    termsAccepted: false,
    paymentCompleted: false,
    emailVerified: false, // NEW
    snoring: "", // NEW
    dietaryPreference: "", // NEW
    hasPets: "", // NEW
    petsDescription: "", // NEW
    openToRelocate: "", // NEW
    sexualOrientation: "", // NEW
    relationshipTradition: "", // NEW
  })

  const totalSteps = 7
  const progress = useMemo(() => (currentStep / totalSteps) * 100, [currentStep])

  const updateFormData = useCallback((field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const toggleLanguage = useCallback((language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep, totalSteps])

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const handleSubmit = useCallback(async () => {
    setIsLoading(true)

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!formData.languages[0] || formData.languages.some(l => !l.trim())) {
      toast({
        title: "Error",
        description: "Please enter at least one language (and no blanks).",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Save to localStorage for demo
    localStorage.setItem("registrationData", JSON.stringify(formData))

    toast({
      title: "Registration Successful!",
      description: "Your account has been created successfully.",
    })

    setIsLoading(false)
    router.push("/login")
  }, [formData, toast, router])

  const getMinDate = useCallback(() => {
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate())
    return minDate.toISOString().split("T")[0]
  }, [])

  const getMaxDate = useCallback(() => {
    const today = new Date()
    const maxDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate())
    return maxDate.toISOString().split("T")[0]
  }, [])

  // Memoized filtered data
  const filteredConstituencies = useMemo(() => {
    if (
      !formData.county ||
      !DATA_CONSTANTS.kenyanConstituencies[formData.county as keyof typeof DATA_CONSTANTS.kenyanConstituencies]
    ) {
      return []
    }
    return DATA_CONSTANTS.kenyanConstituencies[formData.county as keyof typeof DATA_CONSTANTS.kenyanConstituencies]
  }, [formData.county])

  const filteredWards = useMemo(() => {
    if (
      !formData.constituency ||
      !DATA_CONSTANTS.kenyanWards[formData.constituency as keyof typeof DATA_CONSTANTS.kenyanWards]
    ) {
      return []
    }
    return DATA_CONSTANTS.kenyanWards[formData.constituency as keyof typeof DATA_CONSTANTS.kenyanWards]
  }, [formData.constituency])

  const filteredStates = useMemo(() => {
    if (
      !formData.country ||
      !DATA_CONSTANTS.countriesAndStates[formData.country as keyof typeof DATA_CONSTANTS.countriesAndStates]
    ) {
      return []
    }
    return DATA_CONSTANTS.countriesAndStates[formData.country as keyof typeof DATA_CONSTANTS.countriesAndStates]
  }, [formData.country])

  const handleFieldFocus = useCallback((e: React.FocusEvent<HTMLElement>) => {
    scrollIntoViewIfNeeded(e.target as HTMLElement)
  }, [])

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Profile Setup</h2>
              <p className="text-gray-600 dark:text-gray-400">Let's start with your basic information</p>
            </div>

            <AvatarSelection
              selectedAvatar={formData.selectedAvatar}
              onSelect={(avatar) => updateFormData("selectedAvatar", avatar)}
              fullName={formData.username}
            />

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Preferred Public Username *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => updateFormData("username", e.target.value)}
                placeholder="Choose a username"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                <SelectTrigger className="transition-all duration-200">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {formData.gender === "other" && (
                <Input
                  value={formData.customGender}
                  onChange={(e) => updateFormData("customGender", e.target.value)}
                  placeholder="Please describe"
                  className="transition-all duration-200 animate-in slide-in-from-top-2"
                  onFocus={handleFieldFocus}
                />
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth (Must be 25 or older) *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                max={getMaxDate()}
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                className="transition-all duration-200"
                pattern="\d{4}-\d{2}-\d{2}"
                onFocus={handleFieldFocus}
              />
            </div>

            {/* Race */}
            <div className="space-y-2">
              <Label htmlFor="race">Race *</Label>
              <Select value={formData.race} onValueChange={value => updateFormData("race", value)}>
                <SelectTrigger className="transition-all duration-200">
                  <SelectValue placeholder="Select race" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Asian">Asian</SelectItem>
                  <SelectItem value="Latino">Latino</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Country */}
            <SearchableSelect
              items={DATA_CONSTANTS.worldCountries}
              value={formData.country}
              onValueChange={(value) => {
                updateFormData("country", value)
                updateFormData("county", "")
                updateFormData("constituency", "")
                updateFormData("ward", "")
                updateFormData("state", "")
              }}
              placeholder="Select country"
              searchPlaceholder="Search countries..."
              label="Country *"
              onFocus={handleFieldFocus}
            />

            {/* Kenya-specific location fields */}
            {formData.country === "Kenya" && (
              <div className="space-y-4 animate-in slide-in-from-top-4">
                <SearchableSelect
                  items={DATA_CONSTANTS.kenyanCounties}
                  value={formData.county}
                  onValueChange={(value) => {
                    updateFormData("county", value)
                    updateFormData("constituency", "")
                    updateFormData("ward", "")
                  }}
                  placeholder="Select county"
                  searchPlaceholder="Search counties..."
                  label="County *"
                  onFocus={handleFieldFocus}
                />

                {formData.county && filteredConstituencies.length > 0 && (
                  <SearchableSelect
                    items={filteredConstituencies}
                    value={formData.constituency}
                    onValueChange={(value) => {
                      updateFormData("constituency", value)
                      updateFormData("ward", "")
                    }}
                    placeholder="Select constituency"
                    searchPlaceholder="Search constituencies..."
                    label="Constituency"
                    onFocus={handleFieldFocus}
                  />
                )}

                {formData.constituency && filteredWards.length > 0 && (
                  <SearchableSelect
                    items={filteredWards}
                    value={formData.ward}
                    onValueChange={(value) => updateFormData("ward", value)}
                    placeholder="Select ward (optional)"
                    searchPlaceholder="Search wards..."
                    label="Ward (Optional)"
                    onFocus={handleFieldFocus}
                  />
                )}
              </div>
            )}

            {/* State for other countries */}
            {formData.country && formData.country !== "Kenya" && filteredStates.length > 0 && (
              <div className="animate-in slide-in-from-top-4">
                <SearchableSelect
                  items={filteredStates}
                  value={formData.state}
                  onValueChange={(value) => updateFormData("state", value)}
                  placeholder="Select state/province"
                  searchPlaceholder="Search states..."
                  label="State/Province"
                  onFocus={handleFieldFocus}
                />
              </div>
            )}

            {/* Email and Password */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="Enter your email address"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="Create a strong password"
                  className="pr-10 transition-all duration-200"
                  onFocus={handleFieldFocus}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  className="pr-10 transition-all duration-200"
                  onFocus={handleFieldFocus}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-colors duration-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* REMOVE the LanguageSelection component usage and insert the new free-form input section for 'Fluent in' here */}
            <div className="space-y-2">
              <Label>What languages are you fluent in? *</Label>
              {formData.languages.map((lang: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <Input
                    value={lang}
                    placeholder={`Language ${idx + 1}`}
                    onChange={e => {
                      const newLangs = [...formData.languages]
                      newLangs[idx] = e.target.value
                      updateFormData("languages", newLangs)
                    }}
                    maxLength={32}
                    required={idx === 0}
                    className="flex-1"
                    onFocus={handleFieldFocus}
                  />
                  {formData.languages.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newLangs = formData.languages.filter((_: string, i: number) => i !== idx)
                        updateFormData("languages", newLangs)
                      }}
                      aria-label="Remove language"
                    >
                      &times;
                    </Button>
                  )}
                </div>
              ))}
              {formData.languages.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => updateFormData("languages", [...formData.languages, ""])}
                  className="mt-1"
                >
                  {formData.languages.length === 0 ? "Add a language" : "Add another language"}
                </Button>
              )}
              <p className="text-xs text-gray-500">You can add up to 3 languages. At least 1 is required.</p>
            </div>

            {/* Tribe - only for Kenya */}
            {formData.country === "Kenya" && (
              <div className="animate-in slide-in-from-top-4">
                <SearchableSelect
                  items={DATA_CONSTANTS.kenyanTribes}
                  value={formData.tribe}
                  onValueChange={(value) => updateFormData("tribe", value)}
                  placeholder="Select your tribe"
                  searchPlaceholder="Search tribes..."
                  label="Tribe *"
                  onFocus={handleFieldFocus}
                />
              </div>
            )}

            {/* Payment, Terms, and Email Verification */}
            <div className="space-y-2">
              {/* Terms and Conditions */}
              <div className="flex items-center gap-2 mb-2">
                <Checkbox id="termsAccepted" checked={formData.termsAccepted} onCheckedChange={checked => updateFormData("termsAccepted", !!checked)} />
                <Label htmlFor="termsAccepted" className="text-xs">I accept the <a href="/terms" target="_blank" className="underline">Terms and Conditions</a></Label>
              </div>
              {/* Payment UI placeholder */}
              <Button
                type="button"
                variant="default"
                disabled={formData.paymentCompleted}
                onClick={() => updateFormData("paymentCompleted", true)}
                className={`w-full font-bold text-lg py-3 ${formData.paymentCompleted ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {formData.paymentCompleted ? 'Payment Complete' : 'Complete Payment'}
              </Button>
              {/* Email Verification */}
              <Button type="button" variant="outline" disabled={formData.emailVerified} onClick={() => updateFormData("emailVerified", true)}>
                {formData.emailVerified ? "Email Verified" : "Send Verification Email"}
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Health Information</h2>
              <p className="text-gray-600 dark:text-gray-400">Your health information (kept private)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Do you wear glasses?</Label>
                <Select value={formData.glasses} onValueChange={(value) => updateFormData("glasses", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                {formData.glasses === "yes" && (
                  <Input
                    value={formData.glassesDescription}
                    onChange={e => updateFormData("glassesDescription", e.target.value)}
                    placeholder="Describe your glasses"
                    className="transition-all duration-200 mt-2"
                    onFocus={handleFieldFocus}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>HIV Status</Label>
                <Select value={formData.hivStatus} onValueChange={(value) => updateFormData("hivStatus", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Do you have any disabilities?</Label>
                <Select value={formData.disability} onValueChange={(value) => updateFormData("disability", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {formData.disability === "yes" && (
                  <Input
                    value={formData.disabilityDescription}
                    onChange={e => updateFormData("disabilityDescription", e.target.value)}
                    placeholder="Describe your disability"
                    className="transition-all duration-200 mt-2"
                    onFocus={handleFieldFocus}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Do you have any chronic illnesses?</Label>
                <Select value={formData.chronicIllness} onValueChange={(value) => updateFormData("chronicIllness", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {formData.chronicIllness === "yes" && (
                  <Input
                    value={formData.chronicIllnessDescription}
                    onChange={e => updateFormData("chronicIllnessDescription", e.target.value)}
                    placeholder="Describe your chronic illness"
                    className="transition-all duration-200 mt-2"
                    onFocus={handleFieldFocus}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Allergies</Label>
                <Input
                  value={formData.allergies}
                  onChange={(e) => updateFormData("allergies", e.target.value)}
                  placeholder="List any allergies"
                  className="transition-all duration-200"
                  onFocus={handleFieldFocus}
                />
              </div>

              <div className="space-y-2">
                <Label>Blood Type</Label>
                <Select value={formData.bloodType} onValueChange={(value) => updateFormData("bloodType", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a-positive">A+</SelectItem>
                    <SelectItem value="a-negative">A-</SelectItem>
                    <SelectItem value="b-positive">B+</SelectItem>
                    <SelectItem value="b-negative">B-</SelectItem>
                    <SelectItem value="ab-positive">AB+</SelectItem>
                    <SelectItem value="ab-negative">AB-</SelectItem>
                    <SelectItem value="o-positive">O+</SelectItem>
                    <SelectItem value="o-negative">O-</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Do you snore?</Label>
                <Select value={formData.snoring} onValueChange={value => updateFormData("snoring", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Career</h2>
              <p className="text-gray-600 dark:text-gray-400">Tell us about your education and career</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Employment Status</Label>
                <Select
                  value={formData.employmentStatus}
                  onValueChange={(value) => updateFormData("employmentStatus", value)}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Occupation</Label>
              <Input
                value={formData.occupation}
                onChange={(e) => updateFormData("occupation", e.target.value)}
                placeholder="What do you do for work?"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">Work Location</Label>

              <SearchableSelect
                items={DATA_CONSTANTS.worldCountries}
                value={formData.workCountry}
                onValueChange={(value) => {
                  updateFormData("workCountry", value)
                  updateFormData("workCounty", "")
                  updateFormData("workConstituency", "")
                  updateFormData("workWard", "")
                  updateFormData("workState", "")
                }}
                placeholder="Select work country"
                searchPlaceholder="Search countries..."
                label="Work Country"
                onFocus={handleFieldFocus}
              />

              {formData.workCountry === "Kenya" && (
                <div className="space-y-4 animate-in slide-in-from-top-4">
                  <SearchableSelect
                    items={DATA_CONSTANTS.kenyanCounties}
                    value={formData.workCounty}
                    onValueChange={(value) => {
                      updateFormData("workCounty", value)
                      updateFormData("workConstituency", "")
                      updateFormData("workWard", "")
                    }}
                    placeholder="Select work county"
                    searchPlaceholder="Search counties..."
                    label="Work County"
                    onFocus={handleFieldFocus}
                  />

                  {formData.workCounty &&
                    DATA_CONSTANTS.kenyanConstituencies[
                      formData.workCounty as keyof typeof DATA_CONSTANTS.kenyanConstituencies
                    ] && (
                      <SearchableSelect
                        items={
                          DATA_CONSTANTS.kenyanConstituencies[
                            formData.workCounty as keyof typeof DATA_CONSTANTS.kenyanConstituencies
                          ]
                        }
                        value={formData.workConstituency}
                        onValueChange={(value) => {
                          updateFormData("workConstituency", value)
                          updateFormData("workWard", "")
                        }}
                        placeholder="Select work constituency"
                        searchPlaceholder="Search constituencies..."
                        label="Work Constituency"
                        onFocus={handleFieldFocus}
                      />
                    )}

                  {formData.workConstituency &&
                    DATA_CONSTANTS.kenyanWards[
                      formData.workConstituency as keyof typeof DATA_CONSTANTS.kenyanWards
                    ] && (
                      <SearchableSelect
                        items={
                          DATA_CONSTANTS.kenyanWards[
                            formData.workConstituency as keyof typeof DATA_CONSTANTS.kenyanWards
                          ]
                        }
                        value={formData.workWard}
                        onValueChange={(value) => updateFormData("workWard", value)}
                        placeholder="Select work ward"
                        searchPlaceholder="Search wards..."
                        label="Work Ward"
                        onFocus={handleFieldFocus}
                      />
                    )}
                </div>
              )}

              {formData.workCountry &&
                formData.workCountry !== "Kenya" &&
                DATA_CONSTANTS.countriesAndStates[
                  formData.workCountry as keyof typeof DATA_CONSTANTS.countriesAndStates
                ] && (
                  <div className="animate-in slide-in-from-top-4">
                    <SearchableSelect
                      items={
                        DATA_CONSTANTS.countriesAndStates[
                          formData.workCountry as keyof typeof DATA_CONSTANTS.countriesAndStates
                        ]
                      }
                      value={formData.workState}
                      onValueChange={(value) => updateFormData("workState", value)}
                      placeholder="Select work state/province"
                      searchPlaceholder="Search states..."
                      label="Work State/Province"
                      onFocus={handleFieldFocus}
                    />
                  </div>
                )}
            </div>

            <div className="space-y-2">
              <Label>Financial Stability</Label>
              <Select
                value={formData.financialStability}
                onValueChange={(value) => updateFormData("financialStability", value)}
              >
                <SelectTrigger className="transition-all duration-200">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-fully-settled">I'm not fully financially settled but I can handle my bills/expenses</SelectItem>
                  <SelectItem value="fully-settled">I'm fully financially settled</SelectItem>
                  <SelectItem value="almost-there">Almost there</SelectItem>
                  <SelectItem value="building-wealth">Building wealth and investments</SelectItem>
                  <SelectItem value="student">Student with limited income</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur building business</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Lifestyle</h2>
              <p className="text-gray-600 dark:text-gray-400">Share your lifestyle and interests</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Alcohol Use</Label>
                <Select value={formData.alcohol} onValueChange={(value) => updateFormData("alcohol", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="occasionally">Occasionally</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Smoking</Label>
                <Select value={formData.smoking} onValueChange={(value) => updateFormData("smoking", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="occasionally">Occasionally</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Hobbies</Label>
              <Textarea
                value={formData.hobbies}
                onChange={(e) => updateFormData("hobbies", e.target.value)}
                placeholder="What are your hobbies?"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="space-y-2">
              <Label>Interests</Label>
              <Textarea
                value={formData.interests}
                onChange={(e) => updateFormData("interests", e.target.value)}
                placeholder="What interests you?"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="space-y-2">
              <Label>Religion</Label>
              <Select value={formData.religion} onValueChange={(value) => updateFormData("religion", value)}>
                <SelectTrigger className="transition-all duration-200">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {DATA_CONSTANTS.religions.map((religion) => (
                    <SelectItem key={religion} value={religion}>
                      {religion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>How religious are you? ({formData.religiousness}/5)</Label>
              <Slider
                value={[formData.religiousness]}
                onValueChange={(value) => updateFormData("religiousness", value[0])}
                max={5}
                min={1}
                step={1}
                className="w-full transition-all duration-200"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Not at all</span>
                <span>Very religious</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Denomination</Label>
              <Input
                value={formData.denomination}
                onChange={(e) => updateFormData("denomination", e.target.value)}
                placeholder="e.g., Catholic, Protestant, etc."
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Church Attendance</Label>
                <Select
                  value={formData.churchAttendance}
                  onValueChange={(value) => updateFormData("churchAttendance", value)}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="rarely">Rarely</SelectItem>
                    <SelectItem value="sometimes">Sometimes</SelectItem>
                    <SelectItem value="often">Often</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Exercise Frequency</Label>
                <Select
                  value={formData.exerciseFrequency}
                  onValueChange={(value) => updateFormData("exerciseFrequency", value)}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="rarely">Rarely</SelectItem>
                    <SelectItem value="sometimes">Sometimes</SelectItem>
                    <SelectItem value="regularly">Regularly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dietary Preference</Label>
              <Select value={formData.dietaryPreference} onValueChange={value => updateFormData("dietaryPreference", value)}>
                <SelectTrigger className="transition-all duration-200">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Halal">Halal</SelectItem>
                  <SelectItem value="Pescatarian">Pescatarian</SelectItem>
                  <SelectItem value="Omnivore">Omnivore</SelectItem>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Do you have pets?</Label>
              <Select value={formData.hasPets} onValueChange={value => updateFormData("hasPets", value)}>
                <SelectTrigger className="transition-all duration-200">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              {formData.hasPets === "yes" && (
                <Input
                  value={formData.petsDescription}
                  onChange={e => updateFormData("petsDescription", e.target.value)}
                  placeholder="Describe your pet(s)"
                  className="transition-all duration-200"
                  onFocus={handleFieldFocus}
                />
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Dating Information</h2>
              <p className="text-gray-600 dark:text-gray-400">Tell us about your relationship goals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current Marital Status</Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => updateFormData("maritalStatus", value)}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {DATA_CONSTANTS.maritalStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Do you have children?</Label>
                <Select value={formData.hasChildren} onValueChange={(value) => updateFormData("hasChildren", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.hasChildren === "yes" && (
              <div className="space-y-4 animate-in slide-in-from-top-4">
                <div className="space-y-2">
                  <Label>Number of Children</Label>
                  <Input
                    type="number"
                    value={formData.numberOfChildren}
                    onChange={(e) => updateFormData("numberOfChildren", e.target.value)}
                    placeholder="How many children do you have?"
                    className="transition-all duration-200"
                    onFocus={handleFieldFocus}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Children's Ages</Label>
                  <Input
                    value={formData.childrenAges}
                    onChange={(e) => updateFormData("childrenAges", e.target.value)}
                    placeholder="e.g., 5, 8, 12"
                    className="transition-all duration-200"
                    onFocus={handleFieldFocus}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Do your children live with you?</Label>
                  <Select
                    value={formData.childrenLiveWithUser}
                    onValueChange={(value) => updateFormData("childrenLiveWithUser", value)}
                  >
                    <SelectTrigger className="transition-all duration-200">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="sometimes">Sometimes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Do you want children?</Label>
                <Select
                  value={formData.wantsChildren}
                  onValueChange={(value) => updateFormData("wantsChildren", value)}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="maybe">Maybe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Can you date someone with kids?</Label>
                <Select
                  value={formData.acceptsPartnerWithKids}
                  onValueChange={(value) => updateFormData("acceptsPartnerWithKids", value)}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="depends">Depends</SelectItem>
                  </SelectContent>
                </Select>
                {formData.acceptsPartnerWithKids === "yes" && (
                  <Input
                    value={formData.acceptsPartnerWithKidsDescription}
                    onChange={e => updateFormData("acceptsPartnerWithKidsDescription", e.target.value)}
                    placeholder="Describe your preference"
                    className="transition-all duration-200 mt-2"
                    onFocus={handleFieldFocus}
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Long-distance relationships okay?</Label>
              <Select
                value={formData.longDistanceOk}
                onValueChange={(value) => updateFormData("longDistanceOk", value)}
              >
                <SelectTrigger className="transition-all duration-200">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="maybe">Maybe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Dating Perspective</Label>
              <Textarea
                value={formData.datingPerspective}
                onChange={(e) => updateFormData("datingPerspective", e.target.value)}
                placeholder="What's your perspective on dating?"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="space-y-2">
              <Label>Deal Breakers</Label>
              <Textarea
                value={formData.dealBreakers}
                onChange={(e) => updateFormData("dealBreakers", e.target.value)}
                placeholder="What are your deal breakers?"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="space-y-2">
              <Label>What do you hope for in a relationship?</Label>
              <Textarea
                value={formData.relationshipHopes}
                onChange={(e) => updateFormData("relationshipHopes", e.target.value)}
                placeholder="Describe your relationship goals"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="space-y-2">
              <Label>What are you looking for in a partner?</Label>
              <Textarea
                value={formData.partnerPreferences}
                onChange={(e) => updateFormData("partnerPreferences", e.target.value)}
                placeholder="Describe what you are looking for in a partner"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="space-y-2">
              <Label>Sexual Orientation</Label>
              <Input
                value={formData.sexualOrientation}
                onChange={e => updateFormData("sexualOrientation", e.target.value)}
                placeholder="Type your sexual orientation"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>
            <div className="space-y-2">
              <Label>How traditional or modern are you in relationships?</Label>
              <Input
                value={formData.relationshipTradition}
                onChange={e => updateFormData("relationshipTradition", e.target.value)}
                placeholder="Describe your approach to relationships"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Personality & Final Details</h2>
              <p className="text-gray-600 dark:text-gray-400">Tell us about yourself and finish your profile</p>
            </div>

            <div className="space-y-2">
              <Label>Personality Type</Label>
              <Select
                value={formData.personalityType}
                onValueChange={(value) => updateFormData("personalityType", value)}
              >
                <SelectTrigger className="transition-all duration-200">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="introvert">Introvert</SelectItem>
                  <SelectItem value="ambivert">Ambivert</SelectItem>
                  <SelectItem value="extrovert">Extrovert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>"Don't contact me if..."</Label>
              <Textarea
                value={formData.dontContactIf}
                onChange={(e) => updateFormData("dontContactIf", e.target.value)}
                placeholder="What would make you not want to be contacted?"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="space-y-2">
              <Label>Imperfections</Label>
              <Textarea
                value={formData.imperfections}
                onChange={(e) => updateFormData("imperfections", e.target.value)}
                placeholder="What are some of your imperfections?"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="space-y-2">
              <Label>Political Views</Label>
              <Input
                value={formData.politicalViews}
                onChange={(e) => updateFormData("politicalViews", e.target.value)}
                placeholder="Describe your political views"
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Can you date someone with different political views?</Label>
                <Select
                  value={formData.dateDifferentPolitics}
                  onValueChange={(value) => updateFormData("dateDifferentPolitics", value)}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="depends">Depends</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Do you believe in marriage?</Label>
                <Select
                  value={formData.believesInMarriage}
                  onValueChange={(value) => updateFormData("believesInMarriage", value)}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="maybe">Maybe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Describe Yourself</Label>
              <Textarea
                value={formData.selfDescription}
                onChange={(e) => updateFormData("selfDescription", e.target.value)}
                placeholder="Tell us about yourself in your own words"
                rows={4}
                className="transition-all duration-200"
                onFocus={handleFieldFocus}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 px-2 sm:py-8 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="h-screen max-h-screen overflow-y-auto">
          <Card className="w-full shadow-lg">
            <CardHeader className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl sm:text-3xl font-bold">Create Your Profile</CardTitle>
                <div className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </div>
              </div>
              <Progress value={progress} className="w-full transition-all duration-300" />
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-6 pb-24 pt-32">
              <div className="transition-all duration-300 ease-in-out">{renderStep()}</div>

              <div className="flex justify-between pt-6 fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t max-w-4xl mx-auto px-4 sm:px-6 py-4 z-50">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 bg-transparent transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>

                {currentStep === totalSteps ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.termsAccepted || !formData.paymentCompleted}
                    className="flex items-center space-x-2 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    {isLoading ? "Creating Account..." : "Complete Registration"}
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="flex items-center space-x-2 transition-all duration-200 hover:scale-105"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
