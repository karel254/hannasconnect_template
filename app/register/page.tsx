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

  maritalStatuses: ["Single", "Divorced", "Widowed", "Separated", "In a relationship"],
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
  }: {
    items: string[]
    value: string
    onValueChange: (value: string) => void
    placeholder: string
    searchPlaceholder: string
    label: string
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
          />
          <Select
            value={value}
            onValueChange={(val) => {
              onValueChange(val)
              setSearch("")
            }}
          >
            <SelectTrigger className="transition-all duration-200">
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

// Memoized Language Selection Component
const LanguageSelection = memo(
  ({
    languages,
    selectedLanguages,
    onToggle,
  }: {
    languages: string[]
    selectedLanguages: string[]
    onToggle: (language: string) => void
  }) => {
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 300)

    const filteredLanguages = useMemo(
      () => languages.filter((lang) => lang.toLowerCase().includes(debouncedSearch.toLowerCase())),
      [languages, debouncedSearch],
    )

    return (
      <div className="space-y-2">
        <Label>Languages Spoken (Select all that apply) *</Label>
        <div className="space-y-2">
          <Input
            placeholder="Search languages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="transition-all duration-200"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto border rounded-md p-3 bg-background">
            {filteredLanguages.map((language) => (
              <div
                key={language}
                className="flex items-center space-x-2 p-1 rounded hover:bg-muted/50 transition-colors duration-150"
              >
                <Checkbox
                  id={language}
                  checked={selectedLanguages.includes(language)}
                  onCheckedChange={() => onToggle(language)}
                  className="transition-all duration-200"
                />
                <Label htmlFor={language} className="text-sm cursor-pointer">
                  {language}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Selected: {selectedLanguages.length > 0 ? selectedLanguages.join(", ") : "None"}
          </p>
        </div>
      </div>
    )
  },
)

interface FormData {
  selectedAvatar: number
  fullName: string
  username: string
  gender: string
  customGender: string
  dateOfBirth: string
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
  teethFeatures: string
  eyeColor: string
  complexion: string
  piercings: string
  tattoos: string
  glasses: string
  hivStatus: string
  disability: string
  disabilityDescription: string
  chronicIllness: string
  chronicIllnessDescription: string
  allergies: string
  bloodType: string
  educationLevel: string
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
  marriedBefore: string
  hasChildren: string
  numberOfChildren: string
  childrenAges: string
  childrenLiveWithUser: string
  wantsChildren: string
  acceptsPartnerWithKids: string
  longDistanceOk: string
  datingPerspective: string
  dealBreakers: string
  relationshipHopes: string
  personalityType: string
  dontContactIf: string
  imperfections: string
  politicalViews: string
  dateDifferentPolitics: string
  believesInMarriage: string
  selfDescription: string
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
    fullName: "",
    username: "",
    gender: "",
    customGender: "",
    dateOfBirth: "",
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
    teethFeatures: "",
    eyeColor: "",
    complexion: "",
    piercings: "",
    tattoos: "",
    glasses: "",
    hivStatus: "",
    disability: "",
    disabilityDescription: "",
    chronicIllness: "",
    chronicIllnessDescription: "",
    allergies: "",
    bloodType: "",
    educationLevel: "",
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
    marriedBefore: "",
    hasChildren: "",
    numberOfChildren: "",
    childrenAges: "",
    childrenLiveWithUser: "",
    wantsChildren: "",
    acceptsPartnerWithKids: "",
    longDistanceOk: "",
    datingPerspective: "",
    dealBreakers: "",
    relationshipHopes: "",
    personalityType: "",
    dontContactIf: "",
    imperfections: "",
    politicalViews: "",
    dateDifferentPolitics: "",
    believesInMarriage: "",
    selfDescription: "",
  })

  const totalSteps = 8
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
    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
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
              fullName={formData.fullName}
            />

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                placeholder="Enter your full name"
                className="transition-all duration-200"
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Preferred Public Username *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => updateFormData("username", e.target.value)}
                placeholder="Choose a username"
                className="transition-all duration-200"
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
                />
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth (Must be 25 or older) *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                max={getMinDate()}
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                className="transition-all duration-200"
              />
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
                  />
                )}

                {formData.constituency && filteredWards.length > 0 && (
                  <SearchableSelect
                    items={filteredWards}
                    value={formData.ward}
                    onValueChange={(value) => updateFormData("ward", value)}
                    placeholder="Select ward"
                    searchPlaceholder="Search wards..."
                    label="Ward"
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
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
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
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-colors duration-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Cultural Identity</h2>
              <p className="text-gray-600 dark:text-gray-400">Tell us about your cultural background</p>
            </div>

            <LanguageSelection
              languages={DATA_CONSTANTS.worldLanguages}
              selectedLanguages={formData.languages}
              onToggle={toggleLanguage}
            />

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
                />
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Features & Appearance</h2>
              <p className="text-gray-600 dark:text-gray-400">Share your physical characteristics</p>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label>Weight</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateFormData("weight", e.target.value)}
                  className="flex-1 transition-all duration-200"
                />
                <Select value={formData.weightUnit} onValueChange={(value) => updateFormData("weightUnit", value)}>
                  <SelectTrigger className="w-20 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label>Height</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateFormData("height", e.target.value)}
                  className="flex-1 transition-all duration-200"
                />
                <Select value={formData.heightUnit} onValueChange={(value) => updateFormData("heightUnit", value)}>
                  <SelectTrigger className="w-20 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="ft">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Other physical features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Dimples</Label>
                <Select value={formData.dimples} onValueChange={(value) => updateFormData("dimples", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Eye Color</Label>
                <Select value={formData.eyeColor} onValueChange={(value) => updateFormData("eyeColor", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="hazel">Hazel</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Complexion</Label>
                <Select value={formData.complexion} onValueChange={(value) => updateFormData("complexion", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very-light">Very Light</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="very-dark">Very Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Piercings</Label>
                <Select value={formData.piercings} onValueChange={(value) => updateFormData("piercings", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tattoos</Label>
                <Select value={formData.tattoos} onValueChange={(value) => updateFormData("tattoos", value)}>
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

            <div className="space-y-2">
              <Label>Teeth Features</Label>
              <Input
                value={formData.teethFeatures}
                onChange={(e) => updateFormData("teethFeatures", e.target.value)}
                placeholder="Describe any notable teeth features"
                className="transition-all duration-200"
              />
            </div>
          </div>
        )

      case 4:
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
                <Label>Any disability?</Label>
                <Select value={formData.disability} onValueChange={(value) => updateFormData("disability", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Any chronic illness?</Label>
                <Select
                  value={formData.chronicIllness}
                  onValueChange={(value) => updateFormData("chronicIllness", value)}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Allergies?</Label>
                <Select value={formData.allergies} onValueChange={(value) => updateFormData("allergies", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Blood Type</Label>
                <Select value={formData.bloodType} onValueChange={(value) => updateFormData("bloodType", value)}>
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.disability === "yes" && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <Label>Please describe your disability</Label>
                <Textarea
                  value={formData.disabilityDescription}
                  onChange={(e) => updateFormData("disabilityDescription", e.target.value)}
                  placeholder="Describe your disability"
                  className="transition-all duration-200"
                />
              </div>
            )}

            {formData.chronicIllness === "yes" && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <Label>Please describe your chronic illness</Label>
                <Textarea
                  value={formData.chronicIllnessDescription}
                  onChange={(e) => updateFormData("chronicIllnessDescription", e.target.value)}
                  placeholder="Describe your chronic illness"
                  className="transition-all duration-200"
                />
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Education & Work</h2>
              <p className="text-gray-600 dark:text-gray-400">Tell us about your education and career</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Education Level</Label>
                <Select
                  value={formData.educationLevel}
                  onValueChange={(value) => updateFormData("educationLevel", value)}
                >
                  <SelectTrigger className="transition-all duration-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {DATA_CONSTANTS.educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                  <SelectItem value="stable">Stable</SelectItem>
                  <SelectItem value="managing">Managing</SelectItem>
                  <SelectItem value="struggling">Struggling</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 6:
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
              />
            </div>

            <div className="space-y-2">
              <Label>Interests</Label>
              <Textarea
                value={formData.interests}
                onChange={(e) => updateFormData("interests", e.target.value)}
                placeholder="What interests you?"
                className="transition-all duration-200"
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
          </div>
        )

      case 7:
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
                <Label>Were you married before?</Label>
                <Select
                  value={formData.marriedBefore}
                  onValueChange={(value) => updateFormData("marriedBefore", value)}
                >
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
                  />
                </div>

                <div className="space-y-2">
                  <Label>Children's Ages</Label>
                  <Input
                    value={formData.childrenAges}
                    onChange={(e) => updateFormData("childrenAges", e.target.value)}
                    placeholder="e.g., 5, 8, 12"
                    className="transition-all duration-200"
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
                <Label>Can you accept someone with kids?</Label>
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
              />
            </div>

            <div className="space-y-2">
              <Label>Deal Breakers</Label>
              <Textarea
                value={formData.dealBreakers}
                onChange={(e) => updateFormData("dealBreakers", e.target.value)}
                placeholder="What are your deal breakers?"
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label>What do you hope for in a relationship?</Label>
              <Textarea
                value={formData.relationshipHopes}
                onChange={(e) => updateFormData("relationshipHopes", e.target.value)}
                placeholder="Describe your relationship goals"
                className="transition-all duration-200"
              />
            </div>
          </div>
        )

      case 8:
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
              />
            </div>

            <div className="space-y-2">
              <Label>Imperfections</Label>
              <Textarea
                value={formData.imperfections}
                onChange={(e) => updateFormData("imperfections", e.target.value)}
                placeholder="What are some of your imperfections?"
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label>Political Views</Label>
              <Input
                value={formData.politicalViews}
                onChange={(e) => updateFormData("politicalViews", e.target.value)}
                placeholder="Describe your political views"
                className="transition-all duration-200"
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
            <CardHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl sm:text-3xl font-bold">Create Your Profile</CardTitle>
                <div className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </div>
              </div>
              <Progress value={progress} className="w-full transition-all duration-300" />
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-6 pb-24">
              <div className="transition-all duration-300 ease-in-out">{renderStep()}</div>

              <div className="flex justify-between pt-6 sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t mt-8 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4">
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
                    disabled={isLoading}
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
