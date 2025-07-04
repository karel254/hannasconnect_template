"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ArrowRight, CheckCircle, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Complete list of countries and their states/provinces
const countriesAndStates = {
  Afghanistan: [
    "Badakhshan",
    "Badghis",
    "Baghlan",
    "Balkh",
    "Bamyan",
    "Daykundi",
    "Farah",
    "Faryab",
    "Ghazni",
    "Ghor",
    "Helmand",
    "Herat",
    "Jowzjan",
    "Kabul",
    "Kandahar",
    "Kapisa",
    "Khost",
    "Kunar",
    "Kunduz",
    "Laghman",
    "Logar",
    "Nangarhar",
    "Nimroz",
    "Nuristan",
    "Paktia",
    "Paktika",
    "Panjshir",
    "Parwan",
    "Samangan",
    "Sar-e Pol",
    "Takhar",
    "Urozgan",
    "Wardak",
    "Zabul",
  ],
  Albania: [
    "Berat",
    "Dibër",
    "Durrës",
    "Elbasan",
    "Fier",
    "Gjirokastër",
    "Korçë",
    "Kukës",
    "Lezhë",
    "Shkodër",
    "Tirana",
    "Vlorë",
  ],
  Algeria: [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Algiers",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M'Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arréridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naama",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
  ],
  Angola: [
    "Bengo",
    "Benguela",
    "Bié",
    "Cabinda",
    "Cuando Cubango",
    "Cuanza Norte",
    "Cuanza Sul",
    "Cunene",
    "Huambo",
    "Huíla",
    "Luanda",
    "Lunda Norte",
    "Lunda Sul",
    "Malanje",
    "Moxico",
    "Namibe",
    "Uíge",
    "Zaire",
  ],
  Argentina: [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán",
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
  Austria: [
    "Burgenland",
    "Carinthia",
    "Lower Austria",
    "Upper Austria",
    "Salzburg",
    "Styria",
    "Tyrol",
    "Vorarlberg",
    "Vienna",
  ],
  Bangladesh: ["Barisal", "Chittagong", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"],
  Belgium: [
    "Antwerp",
    "East Flanders",
    "Flemish Brabant",
    "Hainaut",
    "Liège",
    "Limburg",
    "Luxembourg",
    "Namur",
    "Walloon Brabant",
    "West Flanders",
    "Brussels",
  ],
  Brazil: [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
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
  China: [
    "Anhui",
    "Beijing",
    "Chongqing",
    "Fujian",
    "Gansu",
    "Guangdong",
    "Guangxi",
    "Guizhou",
    "Hainan",
    "Hebei",
    "Heilongjiang",
    "Henan",
    "Hong Kong",
    "Hubei",
    "Hunan",
    "Inner Mongolia",
    "Jiangsu",
    "Jiangxi",
    "Jilin",
    "Liaoning",
    "Macau",
    "Ningxia",
    "Qinghai",
    "Shaanxi",
    "Shandong",
    "Shanghai",
    "Shanxi",
    "Sichuan",
    "Tianjin",
    "Tibet",
    "Xinjiang",
    "Yunnan",
    "Zhejiang",
  ],
  Egypt: [
    "Alexandria",
    "Assiut",
    "Aswan",
    "Beheira",
    "Beni Suef",
    "Cairo",
    "Dakahlia",
    "Damietta",
    "Fayoum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr el-Sheikh",
    "Luxor",
    "Matrouh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai",
    "Suez",
  ],
  Ethiopia: [
    "Addis Ababa",
    "Afar",
    "Amhara",
    "Benishangul-Gumuz",
    "Dire Dawa",
    "Gambela",
    "Harari",
    "Oromia",
    "Sidama",
    "Somali",
    "Southern Nations",
    "Tigray",
  ],
  France: [
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Brittany",
    "Centre-Val de Loire",
    "Corsica",
    "Grand Est",
    "Hauts-de-France",
    "Île-de-France",
    "Normandy",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Pays de la Loire",
    "Provence-Alpes-Côte d'Azur",
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
  Ghana: [
    "Ashanti",
    "Brong-Ahafo",
    "Central",
    "Eastern",
    "Greater Accra",
    "Northern",
    "Upper East",
    "Upper West",
    "Volta",
    "Western",
  ],
  India: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ],
  Indonesia: [
    "Aceh",
    "North Sumatra",
    "West Sumatra",
    "Riau",
    "Riau Islands",
    "Jambi",
    "South Sumatra",
    "Bengkulu",
    "Lampung",
    "Bangka Belitung Islands",
    "Jakarta",
    "West Java",
    "Central Java",
    "East Java",
    "Yogyakarta",
    "Banten",
    "Bali",
    "West Nusa Tenggara",
    "East Nusa Tenggara",
    "West Kalimantan",
    "Central Kalimantan",
    "South Kalimantan",
    "East Kalimantan",
    "North Kalimantan",
    "North Sulawesi",
    "Central Sulawesi",
    "South Sulawesi",
    "Southeast Sulawesi",
    "Gorontalo",
    "West Sulawesi",
    "Maluku",
    "North Maluku",
    "Papua",
    "West Papua",
  ],
  Italy: [
    "Abruzzo",
    "Basilicata",
    "Calabria",
    "Campania",
    "Emilia-Romagna",
    "Friuli-Venezia Giulia",
    "Lazio",
    "Liguria",
    "Lombardy",
    "Marche",
    "Molise",
    "Piedmont",
    "Puglia",
    "Sardinia",
    "Sicily",
    "Trentino-Alto Adige",
    "Tuscany",
    "Umbria",
    "Aosta Valley",
    "Veneto",
  ],
  Japan: [
    "Aichi",
    "Akita",
    "Aomori",
    "Chiba",
    "Ehime",
    "Fukui",
    "Fukuoka",
    "Fukushima",
    "Gifu",
    "Gunma",
    "Hiroshima",
    "Hokkaido",
    "Hyogo",
    "Ibaraki",
    "Ishikawa",
    "Iwate",
    "Kagawa",
    "Kagoshima",
    "Kanagawa",
    "Kochi",
    "Kumamoto",
    "Kyoto",
    "Mie",
    "Miyagi",
    "Miyazaki",
    "Nagano",
    "Nagasaki",
    "Nara",
    "Niigata",
    "Oita",
    "Okayama",
    "Okinawa",
    "Osaka",
    "Saga",
    "Saitama",
    "Shiga",
    "Shimane",
    "Shizuoka",
    "Tochigi",
    "Tokushima",
    "Tokyo",
    "Tottori",
    "Toyama",
    "Wakayama",
    "Yamagata",
    "Yamaguchi",
    "Yamanashi",
  ],
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
  Mexico: [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Coahuila",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Mexico",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
    "Mexico City",
  ],
  Nigeria: [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Federal Capital Territory",
  ],
  Russia: [
    "Adygea",
    "Altai Krai",
    "Altai Republic",
    "Amur Oblast",
    "Arkhangelsk Oblast",
    "Astrakhan Oblast",
    "Bashkortostan",
    "Belgorod Oblast",
    "Bryansk Oblast",
    "Buryatia",
    "Chelyabinsk Oblast",
    "Chechnya",
    "Chukotka",
    "Chuvashia",
    "Dagestan",
    "Ingushetia",
    "Irkutsk Oblast",
    "Ivanovo Oblast",
    "Jewish Autonomous Oblast",
    "Kabardino-Balkaria",
    "Kaliningrad Oblast",
    "Kalmykia",
    "Kaluga Oblast",
    "Kamchatka Krai",
    "Karachay-Cherkessia",
    "Karelia",
    "Kemerovo Oblast",
    "Khabarovsk Krai",
    "Khakassia",
    "Khanty-Mansi",
    "Kirov Oblast",
    "Komi",
    "Kostroma Oblast",
    "Krasnodar Krai",
    "Krasnoyarsk Krai",
    "Kurgan Oblast",
    "Kursk Oblast",
    "Leningrad Oblast",
    "Lipetsk Oblast",
    "Magadan Oblast",
    "Mari El",
    "Mordovia",
    "Moscow",
    "Moscow Oblast",
    "Murmansk Oblast",
    "Nenets",
    "Nizhny Novgorod Oblast",
    "North Ossetia-Alania",
    "Novgorod Oblast",
    "Novosibirsk Oblast",
    "Omsk Oblast",
    "Orenburg Oblast",
    "Oryol Oblast",
    "Penza Oblast",
    "Perm Krai",
    "Primorsky Krai",
    "Pskov Oblast",
    "Rostov Oblast",
    "Ryazan Oblast",
    "Sakha",
    "Sakhalin Oblast",
    "Samara Oblast",
    "Saint Petersburg",
    "Saratov Oblast",
    "Smolensk Oblast",
    "Stavropol Krai",
    "Sverdlovsk Oblast",
    "Tambov Oblast",
    "Tatarstan",
    "Tomsk Oblast",
    "Tula Oblast",
    "Tuva",
    "Tver Oblast",
    "Tyumen Oblast",
    "Udmurtia",
    "Ulyanovsk Oblast",
    "Vladimir Oblast",
    "Volgograd Oblast",
    "Vologda Oblast",
    "Voronezh Oblast",
    "Yamalo-Nenets",
    "Yaroslavl Oblast",
    "Zabaykalsky Krai",
  ],
  "South Africa": [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape",
  ],
  Spain: [
    "Andalusia",
    "Aragon",
    "Asturias",
    "Balearic Islands",
    "Basque Country",
    "Canary Islands",
    "Cantabria",
    "Castile and León",
    "Castile-La Mancha",
    "Catalonia",
    "Extremadura",
    "Galicia",
    "La Rioja",
    "Madrid",
    "Murcia",
    "Navarre",
    "Valencia",
  ],
  Tanzania: [
    "Arusha",
    "Dar es Salaam",
    "Dodoma",
    "Geita",
    "Iringa",
    "Kagera",
    "Katavi",
    "Kigoma",
    "Kilimanjaro",
    "Lindi",
    "Manyara",
    "Mara",
    "Mbeya",
    "Morogoro",
    "Mtwara",
    "Mwanza",
    "Njombe",
    "Pemba North",
    "Pemba South",
    "Pwani",
    "Rukwa",
    "Ruvuma",
    "Shinyanga",
    "Simiyu",
    "Singida",
    "Songwe",
    "Tabora",
    "Tanga",
    "Unguja North",
    "Unguja South",
  ],
  Uganda: [
    "Abim",
    "Adjumani",
    "Agago",
    "Alebtong",
    "Amolatar",
    "Amudat",
    "Amuria",
    "Amuru",
    "Apac",
    "Arua",
    "Budaka",
    "Bududa",
    "Bugiri",
    "Buhweju",
    "Buikwe",
    "Bukedea",
    "Bukomansimbi",
    "Bukwo",
    "Bulambuli",
    "Buliisa",
    "Bundibugyo",
    "Bushenyi",
    "Busia",
    "Butaleja",
    "Butambala",
    "Buvuma",
    "Buyende",
    "Central",
    "Eastern",
    "Kampala",
    "Northern",
    "Western",
  ],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
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
}

// Complete list of world countries
const worldCountries = [
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
]

// Kenya-specific data
const kenyanCounties = [
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
]

const kenyanConstituencies = {
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
}

const kenyanWards = {
  Westlands: ["Kitisuru", "Parklands/Highridge", "Karura", "Kangemi", "Mountain View"],
  "Lang'ata": ["Karen", "Nairobi West", "Mugumo-ini", "South C", "Nyayo Highrise"],
  Starehe: ["Nairobi Central", "Ngara", "Pangani", "Ziwani/Kariokor", "Landimawe"],
  Kasarani: ["Clay City", "Mwiki", "Kasarani", "Njiru", "Ruai"],
}

const kenyanTribes = [
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
]

// World languages (International recognized languages)
const worldLanguages = [
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
]

const religions = [
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
]

const educationLevels = [
  "Primary School",
  "Secondary School",
  "College/Diploma",
  "University (Bachelor's)",
  "Postgraduate (Master's)",
  "PhD/Doctorate",
  "Trade/Vocational School",
]

const maritalStatuses = ["Single", "Divorced", "Widowed", "Separated", "In a relationship"]

interface FormData {
  // Profile Setup
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

  // Cultural Identity
  tribe: string
  languages: string[]

  // Features & Appearance
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

  // Health
  glasses: string
  hivStatus: string
  disability: string
  disabilityDescription: string
  chronicIllness: string
  chronicIllnessDescription: string
  allergies: string
  bloodType: string

  // Education & Work
  educationLevel: string
  employmentStatus: string
  occupation: string
  workCountry: string
  workCounty: string
  workConstituency: string
  workWard: string
  workState: string
  financialStability: string

  // Lifestyle
  alcohol: string
  smoking: string
  hobbies: string
  interests: string
  religion: string
  religiousness: number
  denomination: string
  churchAttendance: string
  exerciseFrequency: string

  // Dating Info
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

  // Personality & Other
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

  // Search states for filtering
  const [countrySearch, setCountrySearch] = useState("")
  const [countySearch, setCountySearch] = useState("")
  const [constituencySearch, setConstituencySearch] = useState("")
  const [wardSearch, setWardSearch] = useState("")
  const [stateSearch, setStateSearch] = useState("")
  const [tribeSearch, setTribeSearch] = useState("")
  const [languageSearch, setLanguageSearch] = useState("")

  const [formData, setFormData] = useState<FormData>({
    selectedAvatar: 1,
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
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleLanguage = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
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
  }

  const getMinDate = () => {
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate())
    return minDate.toISOString().split("T")[0]
  }

  // Filter functions
  const filterCountries = () => {
    return worldCountries.filter((country) => country.toLowerCase().includes(countrySearch.toLowerCase()))
  }

  const filterCounties = () => {
    return kenyanCounties.filter((county) => county.toLowerCase().includes(countySearch.toLowerCase()))
  }

  const filterConstituencies = () => {
    if (!formData.county || !kenyanConstituencies[formData.county as keyof typeof kenyanConstituencies]) {
      return []
    }
    return kenyanConstituencies[formData.county as keyof typeof kenyanConstituencies].filter((constituency) =>
      constituency.toLowerCase().includes(constituencySearch.toLowerCase()),
    )
  }

  const filterWards = () => {
    if (!formData.constituency || !kenyanWards[formData.constituency as keyof typeof kenyanWards]) {
      return []
    }
    return kenyanWards[formData.constituency as keyof typeof kenyanWards].filter((ward) =>
      ward.toLowerCase().includes(wardSearch.toLowerCase()),
    )
  }

  const filterStates = () => {
    if (!formData.country || !countriesAndStates[formData.country as keyof typeof countriesAndStates]) {
      return []
    }
    return countriesAndStates[formData.country as keyof typeof countriesAndStates].filter((state) =>
      state.toLowerCase().includes(stateSearch.toLowerCase()),
    )
  }

  const filterTribes = () => {
    return kenyanTribes.filter((tribe) => tribe.toLowerCase().includes(tribeSearch.toLowerCase()))
  }

  const filterLanguages = () => {
    return worldLanguages.filter((language) => language.toLowerCase().includes(languageSearch.toLowerCase()))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Profile Setup</h2>
              <p className="text-gray-600 dark:text-gray-400">Let's start with your basic information</p>
            </div>

            {/* Avatar Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium dark:text-gray-200">Choose Your Profile Avatar</Label>
              <div className="flex justify-center mb-4">
                <Avatar className="h-20 w-20 ring-2 ring-[#B22222]/20 dark:ring-red-400/20">
                  <AvatarImage src={`/images/avatar${formData.selectedAvatar}.jpg`} alt="Selected avatar" />
                  <AvatarFallback className="text-lg font-bold text-[#B22222] dark:text-red-400">
                    {formData.fullName.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((avatarNumber) => (
                  <div
                    key={avatarNumber}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all aspect-square ${
                      formData.selectedAvatar === avatarNumber
                        ? "border-[#B22222] dark:border-red-400 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                    onClick={() => updateFormData("selectedAvatar", avatarNumber)}
                  >
                    <img
                      src={`/images/avatar${avatarNumber}.jpg`}
                      alt={`Avatar ${avatarNumber}`}
                      className="w-full h-full object-cover"
                    />
                    {formData.selectedAvatar === avatarNumber && (
                      <div className="absolute inset-0 bg-[#B22222]/10 dark:bg-red-400/10 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-[#B22222] dark:text-red-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                placeholder="Enter your full name"
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
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                <SelectTrigger>
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
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label>Country *</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Search countries..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                />
                <Select
                  value={formData.country}
                  onValueChange={(value) => {
                    updateFormData("country", value)
                    updateFormData("county", "")
                    updateFormData("constituency", "")
                    updateFormData("ward", "")
                    updateFormData("state", "")
                    setCountrySearch("")
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterCountries().map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Kenya-specific location fields */}
            {formData.country === "Kenya" && (
              <>
                <div className="space-y-2">
                  <Label>County *</Label>
                  <div className="space-y-2">
                    <Input
                      placeholder="Search counties..."
                      value={countySearch}
                      onChange={(e) => setCountySearch(e.target.value)}
                    />
                    <Select
                      value={formData.county}
                      onValueChange={(value) => {
                        updateFormData("county", value)
                        updateFormData("constituency", "")
                        updateFormData("ward", "")
                        setCountySearch("")
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterCounties().map((county) => (
                          <SelectItem key={county} value={county}>
                            {county}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.county && (
                  <div className="space-y-2">
                    <Label>Constituency</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search constituencies..."
                        value={constituencySearch}
                        onChange={(e) => setConstituencySearch(e.target.value)}
                      />
                      <Select
                        value={formData.constituency}
                        onValueChange={(value) => {
                          updateFormData("constituency", value)
                          updateFormData("ward", "")
                          setConstituencySearch("")
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select constituency" />
                        </SelectTrigger>
                        <SelectContent>
                          {filterConstituencies().map((constituency) => (
                            <SelectItem key={constituency} value={constituency}>
                              {constituency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {formData.constituency && (
                  <div className="space-y-2">
                    <Label>Ward</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search wards..."
                        value={wardSearch}
                        onChange={(e) => setWardSearch(e.target.value)}
                      />
                      <Select
                        value={formData.ward}
                        onValueChange={(value) => {
                          updateFormData("ward", value)
                          setWardSearch("")
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ward" />
                        </SelectTrigger>
                        <SelectContent>
                          {filterWards().map((ward) => (
                            <SelectItem key={ward} value={ward}>
                              {ward}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* State for other countries */}
            {formData.country && formData.country !== "Kenya" && (
              <div className="space-y-2">
                <Label>State/Province</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search states..."
                    value={stateSearch}
                    onChange={(e) => setStateSearch(e.target.value)}
                  />
                  <Select
                    value={formData.state}
                    onValueChange={(value) => {
                      updateFormData("state", value)
                      setStateSearch("")
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state/province" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterStates().map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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

            {/* Languages for everyone */}
            <div className="space-y-2">
              <Label>Languages Spoken (Select all that apply) *</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Search languages..."
                  value={languageSearch}
                  onChange={(e) => setLanguageSearch(e.target.value)}
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto border rounded-md p-3">
                  {filterLanguages().map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={() => toggleLanguage(language)}
                      />
                      <Label htmlFor={language} className="text-sm">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Selected: {formData.languages.join(", ") || "None"}</p>
              </div>
            </div>

            {/* Tribe - only for Kenya */}
            {formData.country === "Kenya" && (
              <div className="space-y-2">
                <Label>Tribe *</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search tribes..."
                    value={tribeSearch}
                    onChange={(e) => setTribeSearch(e.target.value)}
                  />
                  <Select
                    value={formData.tribe}
                    onValueChange={(value) => {
                      updateFormData("tribe", value)
                      setTribeSearch("")
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your tribe" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterTribes().map((tribe) => (
                        <SelectItem key={tribe} value={tribe}>
                          {tribe}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                  className="flex-1"
                />
                <Select value={formData.weightUnit} onValueChange={(value) => updateFormData("weightUnit", value)}>
                  <SelectTrigger className="w-20">
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
                  className="flex-1"
                />
                <Select value={formData.heightUnit} onValueChange={(value) => updateFormData("heightUnit", value)}>
                  <SelectTrigger className="w-20">
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
              <div className="space-y-2">
                <Label>Please describe your disability</Label>
                <Textarea
                  value={formData.disabilityDescription}
                  onChange={(e) => updateFormData("disabilityDescription", e.target.value)}
                  placeholder="Describe your disability"
                />
              </div>
            )}

            {formData.chronicIllness === "yes" && (
              <div className="space-y-2">
                <Label>Please describe your chronic illness</Label>
                <Textarea
                  value={formData.chronicIllnessDescription}
                  onChange={(e) => updateFormData("chronicIllnessDescription", e.target.value)}
                  placeholder="Describe your chronic illness"
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
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
                  <SelectTrigger>
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
              />
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">Work Location</Label>

              <div className="space-y-2">
                <Label>Work Country</Label>
                <Select
                  value={formData.workCountry}
                  onValueChange={(value) => {
                    updateFormData("workCountry", value)
                    updateFormData("workCounty", "")
                    updateFormData("workConstituency", "")
                    updateFormData("workWard", "")
                    updateFormData("workState", "")
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work country" />
                  </SelectTrigger>
                  <SelectContent>
                    {worldCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.workCountry === "Kenya" && (
                <>
                  <div className="space-y-2">
                    <Label>Work County</Label>
                    <Select
                      value={formData.workCounty}
                      onValueChange={(value) => {
                        updateFormData("workCounty", value)
                        updateFormData("workConstituency", "")
                        updateFormData("workWard", "")
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select work county" />
                      </SelectTrigger>
                      <SelectContent>
                        {kenyanCounties.map((county) => (
                          <SelectItem key={county} value={county}>
                            {county}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.workCounty &&
                    kenyanConstituencies[formData.workCounty as keyof typeof kenyanConstituencies] && (
                      <div className="space-y-2">
                        <Label>Work Constituency</Label>
                        <Select
                          value={formData.workConstituency}
                          onValueChange={(value) => {
                            updateFormData("workConstituency", value)
                            updateFormData("workWard", "")
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select work constituency" />
                          </SelectTrigger>
                          <SelectContent>
                            {kenyanConstituencies[formData.workCounty as keyof typeof kenyanConstituencies].map(
                              (constituency) => (
                                <SelectItem key={constituency} value={constituency}>
                                  {constituency}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                  {formData.workConstituency && kenyanWards[formData.workConstituency as keyof typeof kenyanWards] && (
                    <div className="space-y-2">
                      <Label>Work Ward</Label>
                      <Select value={formData.workWard} onValueChange={(value) => updateFormData("workWard", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work ward" />
                        </SelectTrigger>
                        <SelectContent>
                          {kenyanWards[formData.workConstituency as keyof typeof kenyanWards].map((ward) => (
                            <SelectItem key={ward} value={ward}>
                              {ward}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}

              {formData.workCountry && formData.workCountry !== "Kenya" && (
                <div className="space-y-2">
                  <Label>Work State/Province</Label>
                  <Select value={formData.workState} onValueChange={(value) => updateFormData("workState", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work state/province" />
                    </SelectTrigger>
                    <SelectContent>
                      {countriesAndStates[formData.workCountry as keyof typeof countriesAndStates]?.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Financial Stability</Label>
              <Select
                value={formData.financialStability}
                onValueChange={(value) => updateFormData("financialStability", value)}
              >
                <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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
              />
            </div>

            <div className="space-y-2">
              <Label>Interests</Label>
              <Textarea
                value={formData.interests}
                onChange={(e) => updateFormData("interests", e.target.value)}
                placeholder="What interests you?"
              />
            </div>

            <div className="space-y-2">
              <Label>Religion</Label>
              <Select value={formData.religion} onValueChange={(value) => updateFormData("religion", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {religions.map((religion) => (
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
                className="w-full"
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
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Church Attendance</Label>
                <Select
                  value={formData.churchAttendance}
                  onValueChange={(value) => updateFormData("churchAttendance", value)}
                >
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {maritalStatuses.map((status) => (
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
                  <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.hasChildren === "yes" && (
              <>
                <div className="space-y-2">
                  <Label>Number of Children</Label>
                  <Input
                    type="number"
                    value={formData.numberOfChildren}
                    onChange={(e) => updateFormData("numberOfChildren", e.target.value)}
                    placeholder="How many children do you have?"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Children's Ages</Label>
                  <Input
                    value={formData.childrenAges}
                    onChange={(e) => updateFormData("childrenAges", e.target.value)}
                    placeholder="e.g., 5, 8, 12"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Do your children live with you?</Label>
                  <Select
                    value={formData.childrenLiveWithUser}
                    onValueChange={(value) => updateFormData("childrenLiveWithUser", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="sometimes">Sometimes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Do you want children?</Label>
                <Select
                  value={formData.wantsChildren}
                  onValueChange={(value) => updateFormData("wantsChildren", value)}
                >
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                <SelectTrigger>
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
              />
            </div>

            <div className="space-y-2">
              <Label>Deal Breakers</Label>
              <Textarea
                value={formData.dealBreakers}
                onChange={(e) => updateFormData("dealBreakers", e.target.value)}
                placeholder="What are your deal breakers?"
              />
            </div>

            <div className="space-y-2">
              <Label>What do you hope for in a relationship?</Label>
              <Textarea
                value={formData.relationshipHopes}
                onChange={(e) => updateFormData("relationshipHopes", e.target.value)}
                placeholder="Describe your relationship goals"
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
                <SelectTrigger>
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
              />
            </div>

            <div className="space-y-2">
              <Label>Imperfections</Label>
              <Textarea
                value={formData.imperfections}
                onChange={(e) => updateFormData("imperfections", e.target.value)}
                placeholder="What are some of your imperfections?"
              />
            </div>

            <div className="space-y-2">
              <Label>Political Views</Label>
              <Input
                value={formData.politicalViews}
                onChange={(e) => updateFormData("politicalViews", e.target.value)}
                placeholder="Describe your political views"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Can you date someone with different political views?</Label>
                <Select
                  value={formData.dateDifferentPolitics}
                  onValueChange={(value) => updateFormData("dateDifferentPolitics", value)}
                >
                  <SelectTrigger>
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
                  <SelectTrigger>
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
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold">Create Your Profile</CardTitle>
              <div className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>

          <CardContent className="space-y-6">
            {renderStep()}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep === totalSteps ? (
                <Button onClick={handleSubmit} disabled={isLoading} className="flex items-center space-x-2">
                  {isLoading ? "Creating Account..." : "Complete Registration"}
                </Button>
              ) : (
                <Button onClick={nextStep} className="flex items-center space-x-2">
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
