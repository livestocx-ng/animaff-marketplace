import {
  NavLink,
  Feature,
  FaqOption,
  TeamMember,
  FilterOption,
  FooterNavLink,
} from "@/types/index.types";
import { EnterprisePlanComparison, DefaultTestimonial } from "@/types/types";

export const NavLinks: NavLink[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Enterprise",
    url: "/enterprise",
  },
  {
    title: "Pricing",
    url: "/pricing",
  },
  {
  	title: 'Blog',
  	url: '/blog',
  },
  {
    title: "About Us",
    url: "/about-us",
  },
  {
    title: "Contact Us",
    url: "/contact-us",
  },
];

export const AccountNavLinks: FooterNavLink[] = [
  {
    title: "Manage Account",
    url: "/account",
    currentTab: "Account",
  },
  {
    title: "Products",
    url: "/account",
    currentTab: "Products",
  },
  // {
  // 	title: 'Desired Items',
  // 	url: '/account',
  // 	currentTab: 'Desired Items',
  // },
  // {
  // 	title: 'Sellers',
  // 	url: '/sellers',
  // },
];

export const HelpNavLinks: NavLink[] = [
  {
    title: "Contact Us",
    url: "/contact-us",
  },
  {
    title: "FAQs",
    url: "/contact-us",
  },
  {
    title: "Terms of Service",
    url: "/terms-of-service",
  },
  {
    title: "Privacy Policy",
    url: "/privacy-policy",
  },
];

export const OtherNavLinks: NavLink[] = [
  {
    title: "About",
    url: "/about-us",
  },
  {
    title: "Sitemap",
    url: "#",
  },
  {
    title: "Login",
    url: "/signin",
  },
  {
    title: "Register",
    url: "/signup",
  },
];

export const Testimonials: DefaultTestimonial[] = [
  {
    id: 1,
    author: "Emily Wilson",
    avatar: "/testimonial_avatar_1.jpg",
    description:
      "Animaff has been the perfect marketplace for me. I had been searching for a platform to present my goat business, and this one has shown the most potential.",
  },
  {
    id: 2,
    author: "Julian Davis",
    avatar: "/testimonial_avatar_2.jpg",
    description:
      "Due to the very fragmented dog market with a lot of middle men, Animaff has helped me find more customers directly. And it is free. Amazing.",
  },
  {
    id: 3,
    author: "Ava Morales",
    avatar: "/testimonial_avatar_3.jpg",
    description:
      "I must say that their services have left a lasting impression on me, and I am eagerly looking forward to future interactions.",
  },
];

export const TeamMembers: TeamMember[] = [
  {
    id: 1,
    image: "/team/about__1.png",
    name: "Oghenekevwe Emadago",
    intro:
      "Co-founder/CEO: Oghenekevwe has over 7 years experience in sales across agricultural and hygiene sectors and has raised over $230,000 in combined funding. As the visionary leader of Animaff, he sets the strategic direction and long-term vision for the company with his background in livestock management and deep understanding of the agricultural landscape. He also leads our customer interactions and onboarding and is in charge of fundraising/investor relations.",
    facebook: "https://www.facebook.com/oghenekevwe.emadago?mibextid=kFxxJD",
    linkedin:
      "https://www.linkedin.com/in/oghenekevwe-emadago?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAC6nN7sB_tHEBBPhKw7AlemgLv4gM8PXzao&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BNaz%2FvpQPTWu7rMCohxRbTQ%3D%3D",
    twitter: "https://twitter.com/emadagokevwe",
  },
  {
    id: 2,
    image: "/team/about__2.png",
    name: "Idokoh Divine",
    intro:
      "COO, Agriculturist and Graphic designer: As, Animaff's COO, Divine brings a diverse skill set to the team. With a background in Agriculture, graphics and UI/UX design, Divine ensures operational excellence. She leads on-the-ground engagements, enhancing market understanding and driving platform growth.",
    facebook: "https://www.facebook.com/chide2001?mibextid=ZbWKwL",
    linkedin: "https://www.linkedin.com/in/divine-idokoh",
    twitter: "https://x.com/ojo__chide?s=09",
  },
  {
    id: 3,
    image: "/team/about__3.jpg",
    name: "Yada Martins",
    intro:
      "Co-founder/CTO: Martins is a full stack developer with 6 years+ experience with JavaScript and Python. Most experienced in  NestJS, NextJS, and Flutter. He is the technical backbone of Animaff, leading the development and implementation of our technology stack with his expertise in software development and emerging technologies.",
    facebook: "https://www.facebook.com/chide2001?mibextid=ZbWKwL",
    linkedin: "https://www.linkedin.com/in/yada-martins",
    twitter: "https://x.com/ojo__chide?s=09",
  },
  {
    id: 4,
    image: "/team/about__4.jpeg",
    name: "Steve Odinkaru",
    intro:
      "Co-founder/Product Architect & Lead Designer: Steve is an expert in Figma design and product management with 5 years of experience. He is also a developer of Python and C++. He is in charge of our front-end designs and user experience. He also manages our social media handles.",
    facebook: "https://www.facebook.com/chide2001?mibextid=ZbWKwL",
    linkedin: "https://www.linkedin.com/in/steve-odinkaru/",
    twitter: "https://x.com/ojo__chide?s=09",
  },
  {
    id: 5,
    image: "/team/about__5.jpeg",
    name: "Asalu Peter",
    intro:
      "AI/Data Engineer: Asalu is a key contributor to Animaff's backend infrastructure, focusing on our data collection and training our AI model on collected data. With his expertise in software architecture and database management, Asalu ensures that we can handle high volumes of transactions and data while maintaining optimal performance and reliability.",
    facebook: "https://www.facebook.com/chide2001?mibextid=ZbWKwL",
    linkedin: "https://www.linkedin.com/in/asalu-peter-41300a188/",
    twitter: "https://x.com/ojo__chide?s=09",
  },
];

export const FilterOptions: FilterOption[] = [
  {
    id: 1,
    title: "Chicken",
    value: "CHICKEN",
  },
  {
    id: 2,
    title: "Dog",
    value: "DOG",
  },
  {
    id: 3,
    title: "Rabbit",
    value: "RABBIT",
  },
  {
    id: 4,
    title: "Turkey",
    value: "TURKEY",
  },
  {
    id: 5,
    title: "Cow",
    value: "COW",
  },
  {
    id: 6,
    title: "Goat",
    value: "GOAT",
  },
  {
    id: 7,
    title: "Pig",
    value: "PIG",
  },
  {
    id: 8,
    title: "Guinea Pig",
    value: "GUINEAPIG",
  },
  {
    id: 9,
    title: "Sheep",
    value: "SHEEP",
  },
  {
    id: 10,
    title: "Fish",
    value: "FISH",
  },
  {
    id: 11,
    title: "Grass Cutter",
    value: "GRASSCUTTER",
  },
  {
    id: 12,
    title: "Snail",
    value: "SNAIL",
  },
  {
    id: 13,
    title: "Bird",
    value: "BIRD",
  },
  {
    id: 14,
    title: "Cat",
    value: "CAT",
  },
  {
    id: 15,
    title: "Horse",
    value: "HORSE",
  },
  {
    id: 16,
    title: "Donkey",
    value: "DONKEY",
  },
  {
    id: 17,
    title: "Duck",
    value: "DUCK",
  },
  {
    id: 18,
    title: "Equipment",
    value: "EQUIPMENT",
  },
];

export type SellerFilterOptionsValue =
  | "recommended"
  | "newest"
  | "oldest"
  | "lowestPrice"
  | "highestPrice";

interface SellerFilterOption {
  id: number;
  title: string;
  value: SellerFilterOptionsValue;
}

export const SellerFilterOptions: SellerFilterOption[] = [
  {
    id: 1,
    title: "Recommended",
    value: "recommended",
  },
  {
    id: 2,
    title: "Newest First",
    value: "newest",
  },
  {
    id: 3,
    title: "Oldest First",
    value: "oldest",
  },
  {
    id: 4,
    title: "Lowest Price First",
    value: "lowestPrice",
  },
  {
    id: 5,
    title: "Highest Price First",
    value: "highestPrice",
  },
];

export const Features: Feature[] = [
  {
    icon: "/icon__feature__1.svg",
    title: "Co-ordination and Logistics",
    description:
      "Animaff integrates a logistics module, streamlining the coordination of transportation for Animaff. Farmers can easily schedule transportation services directly through our platform, optimizing routes to minimize environmental impact and reduce the huge carbon footprint of the transportation process",
  },
  {
    icon: "/icon__feature__2.svg",
    title: "Farmer Empowerment",
    description:
      "We are committed to empowering local farmers by eliminating unnecessary middlemen, reducing transaction costs, and ensuring fair pricing. By providing direct access to buyers and market information, our platform enhances the financial resilience of farmers, making them better equipped to adapt to climate-related challenges.",
  },
  {
    icon: "/icon__feature__3.svg",
    title: "Real-time Data Analytics",
    description:
      "Our platform includes robust data analytics tools that provide insights into market trends, pricing, and demand patterns. Local farmers can make informed decisions, reducing the risk of overproduction and aligning their activities with climate-resilient agricultural practices.",
  },
  {
    icon: "/icon__feature__4.svg",
    title: "Climate-Resilient Practices",
    description:
      "As a future goal, we are putting measures in place to encourage and incentivize climate-resilient farming practices. We will reward farmers who adopt eco-friendly methods, contributing to the overall climate resilience of the agricultural sector.",
  },
];

export const FaqItems: FaqOption[] = [
  {
    id: 1,
    title: "What can Animaff do for me as a farmer?",
    description:
      "Animaff will help you get more customers easily and faster by giving you and your business increased visibility all over USA and beyond. This is through our unique features to promote small-holder animaff farmers all over USA.",
  },
  {
    id: 2,
    title: "Do I need to pay to post my product on Animaff?",
    description:
      "Posting on Animaff, like posting on Facebook, is totally free of charge. But for farmers who want to stand out among others in search, we charge a small premium fee of 500 Naira for advertisement.",
  },
  {
    id: 3,
    title:
      "Why do I have to upload my means of identification when registering?",
    description:
      "This is one of our steps to reduce the number of scammers on our platform. We only use your means of identification to verify that you are an actual and legitimate animaff farmer.",
  },
  {
    id: 4,
    title:
      "What other steps are you taking to prevent scammers on your platform?",
    description:
      "We are currently working on a chat-like feature where buyers and sellers can converse in-app so that in cases of fraudulent activities, we can properly investigate it.",
    first_description:
      "We take a strong stance against all forms of scamming and fraud. To this end, in addition to collecting your details for verification, we are creating a badge system for trusted sellers who have shown credibility over time. This will help buyers avoid less credible sellers.",
    second_description:
      "We have created a means for reporting all unethical or fraudulent activities to us. This will help us take necessary action on the sellers involved.",
  },
  {
    id: 5,
    title: "Do you have a mobile app I can download on my phone?",
    description:
      "We are currently developing our mobile app that you can download on your phone. In the meantime, you should be able to do everything through our site: www.animaff.com",
  },
];

export const enterprisePlanComparisons: EnterprisePlanComparison[] = [
  {
    feature: "Initial Cost",
    customBusinessWebsite:
      "High (design, development, hosting, domain) $3,000 - $10,000 initial + $100 - $300/month maintenance",
    platform: "Low (starting at $21/month)",
  },
  {
    feature: "Maintenance Cost",
    customBusinessWebsite: "High (ongoing maintenance, updates, hosting)",
    platform: "Included in subscription",
  },
  {
    feature: "Time to Launch",
    customBusinessWebsite: "Long (weeks to months for development)",
    platform: "Short (immediate setup upon subscription)",
  },
  {
    feature: "Technical Skills Required",
    customBusinessWebsite: "High (coding, design, server management)",
    platform: "None (user-friendly interface)",
  },
  {
    feature: "Product Uploads",
    customBusinessWebsite: "Additional setup and costs",
    platform: "Unlimited uploads for $5/month",
  },
  {
    feature: "Sales Management Tools",
    customBusinessWebsite: "Additional cost and integration needed",
    platform: "Included",
  },
  {
    feature: "Customer Reach",
    customBusinessWebsite: "Limited (depends on SEO, marketing efforts)",
    platform: "High (marketplace visibility)",
  },
  {
    feature: "Promotion and Marketing",
    customBusinessWebsite: "Requires separate strategy and additional costs",
    platform: "Included (weekly product promotions)",
  },
  {
    feature: "Analytics and Insights",
    customBusinessWebsite: "Requires separate setup and additional tools",
    platform: "Included",
  },
  {
    feature: "Security and Updates",
    customBusinessWebsite:
      "Responsibility of the business owner (time and cost-intensive)",
    platform: "Handled by Animaff (regular updates and security management)",
  },
  {
    feature: "Customer Support",
    customBusinessWebsite: "Varies, generally limited to hosting provider",
    platform: "Included (platform support and assistance)",
  },
];

export const RegionStates: string[] = [
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
];

export const RegionCities: { [key: string]: string[] } = {
  Alabama: [
    "Birmingham",
    "Montgomery",
    "Mobile",
    "Huntsville",
    "Tuscaloosa",
    "Dothan",
    "Decatur",
    "Auburn",
    "Madison",
    "Florence",
  ],
  Alaska: [
    "Anchorage",
    "Fairbanks",
    "Juneau",
    "Sitka",
    "Ketchikan",
    "Wasilla",
    "Kenai",
    "Kodiak",
    "Bethel",
    "Palmer",
  ],
  Arizona: [
    "Phoenix",
    "Tucson",
    "Mesa",
    "Chandler",
    "Scottsdale",
    "Glendale",
    "Gilbert",
    "Tempe",
    "Peoria",
    "Surprise",
  ],
  Arkansas: [
    "Little Rock",
    "Fayetteville",
    "Fort Smith",
    "Springdale",
    "Jonesboro",
    "Conway",
    "Rogers",
    "North Little Rock",
    "Bentonville",
    "Pine Bluff",
  ],
  California: [
    "Los Angeles",
    "San Francisco",
    "San Diego",
    "San Jose",
    "Sacramento",
    "Fresno",
    "Long Beach",
    "Oakland",
    "Bakersfield",
    "Anaheim",
  ],
  Colorado: [
    "Denver",
    "Colorado Springs",
    "Aurora",
    "Fort Collins",
    "Boulder",
    "Pueblo",
    "Greeley",
    "Loveland",
    "Grand Junction",
    "Broomfield",
  ],
  Connecticut: [
    "Bridgeport",
    "New Haven",
    "Stamford",
    "Hartford",
    "Waterbury",
    "Norwalk",
    "Danbury",
    "New Britain",
    "Meriden",
    "Bristol",
  ],
  Delaware: [
    "Wilmington",
    "Dover",
    "Newark",
    "Middletown",
    "Smyrna",
    "Milford",
    "Seaford",
    "Georgetown",
    "Elsmere",
    "New Castle",
  ],
  Florida: [
    "Miami",
    "Tampa",
    "Orlando",
    "Jacksonville",
    "St. Petersburg",
    "Hialeah",
    "Fort Lauderdale",
    "Port St. Lucie",
    "Pembroke Pines",
    "Cape Coral",
  ],
  Georgia: [
    "Atlanta",
    "Augusta",
    "Columbus",
    "Savannah",
    "Athens",
    "Macon",
    "Roswell",
    "Sandy Springs",
    "Albany",
    "Johns Creek",
  ],
  Hawaii: [
    "Honolulu",
    "Hilo",
    "Kailua",
    "Kapolei",
    "Kihei",
    "Lahaina",
    "Pearl City",
    "Waipahu",
    "Kaneohe",
    "Mililani Town",
  ],
  Idaho: [
    "Boise",
    "Idaho Falls",
    "Nampa",
    "Pocatello",
    "Coeur d'Alene",
    "Caldwell",
    "Twin Falls",
    "Lewiston",
    "Meridian",
    "Moscow",
  ],
  Illinois: [
    "Chicago",
    "Aurora",
    "Rockford",
    "Joliet",
    "Naperville",
    "Springfield",
    "Peoria",
    "Elgin",
    "Waukegan",
    "Cicero",
  ],
  Indiana: [
    "Indianapolis",
    "Fort Wayne",
    "Evansville",
    "South Bend",
    "Carmel",
    "Bloomington",
    "Fishers",
    "Hammond",
    "Gary",
    "Muncie",
  ],
  Iowa: [
    "Des Moines",
    "Cedar Rapids",
    "Davenport",
    "Sioux City",
    "Iowa City",
    "Waterloo",
    "Council Bluffs",
    "Ames",
    "Dubuque",
    "West Des Moines",
  ],
  Kansas: [
    "Wichita",
    "Overland Park",
    "Kansas City",
    "Topeka",
    "Olathe",
    "Lawrence",
    "Shawnee",
    "Manhattan",
    "Lenexa",
    "Salina",
  ],
  Kentucky: [
    "Louisville",
    "Lexington",
    "Bowling Green",
    "Owensboro",
    "Covington",
    "Richmond",
    "Georgetown",
    "Florence",
    "Hopkinsville",
    "Nicholasville",
  ],
  Louisiana: [
    "New Orleans",
    "Baton Rouge",
    "Shreveport",
    "Lafayette",
    "Lake Charles",
    "Kenner",
    "Bossier City",
    "Monroe",
    "Alexandria",
    "Houma",
  ],
  Maine: [
    "Portland",
    "Lewiston",
    "Bangor",
    "South Portland",
    "Auburn",
    "Biddeford",
    "Sanford",
    "Saco",
    "Augusta",
    "Westbrook",
  ],
  Maryland: [
    "Baltimore",
    "Frederick",
    "Rockville",
    "Gaithersburg",
    "Bowie",
    "Hagerstown",
    "Annapolis",
    "College Park",
    "Salisbury",
    "Laurel",
  ],
  Massachusetts: [
    "Boston",
    "Worcester",
    "Springfield",
    "Lowell",
    "Cambridge",
    "New Bedford",
    "Brockton",
    "Quincy",
    "Lynn",
    "Fall River",
  ],
  Michigan: [
    "Detroit",
    "Grand Rapids",
    "Warren",
    "Sterling Heights",
    "Ann Arbor",
    "Lansing",
    "Flint",
    "Dearborn",
    "Livonia",
    "Westland",
  ],
  Minnesota: [
    "Minneapolis",
    "Saint Paul",
    "Rochester",
    "Duluth",
    "Bloomington",
    "Brooklyn Park",
    "Plymouth",
    "Maple Grove",
    "Woodbury",
    "St. Cloud",
  ],
  Mississippi: [
    "Jackson",
    "Gulfport",
    "Southaven",
    "Hattiesburg",
    "Biloxi",
    "Meridian",
    "Tupelo",
    "Greenville",
    "Olive Branch",
    "Horn Lake",
  ],
  Missouri: [
    "Kansas City",
    "St. Louis",
    "Springfield",
    "Columbia",
    "Independence",
    "Lee's Summit",
    "O'Fallon",
    "St. Joseph",
    "St. Charles",
    "Blue Springs",
  ],
  Montana: [
    "Billings",
    "Missoula",
    "Great Falls",
    "Bozeman",
    "Butte",
    "Helena",
    "Kalispell",
    "Havre",
    "Anaconda",
    "Miles City",
  ],
  Nebraska: [
    "Omaha",
    "Lincoln",
    "Bellevue",
    "Grand Island",
    "Kearney",
    "Fremont",
    "Hastings",
    "North Platte",
    "Norfolk",
    "Columbus",
  ],
  Nevada: [
    "Las Vegas",
    "Reno",
    "Henderson",
    "North Las Vegas",
    "Sparks",
    "Carson City",
    "Elko",
    "Mesquite",
    "Fernley",
    "Boulder City",
  ],
  "New Hampshire": [
    "Manchester",
    "Nashua",
    "Concord",
    "Dover",
    "Rochester",
    "Keene",
    "Portsmouth",
    "Laconia",
    "Claremont",
    "Lebanon",
  ],
  "New Jersey": [
    "Newark",
    "Jersey City",
    "Paterson",
    "Elizabeth",
    "Edison",
    "Woodbridge",
    "Lakewood",
    "Toms River",
    "Hamilton",
    "Trenton",
  ],
  "New Mexico": [
    "Albuquerque",
    "Las Cruces",
    "Rio Rancho",
    "Santa Fe",
    "Roswell",
    "Farmington",
    "Clovis",
    "Hobbs",
    "Alamogordo",
    "Carlsbad",
  ],
  "New York": [
    "New York City",
    "Buffalo",
    "Rochester",
    "Yonkers",
    "Syracuse",
    "Albany",
    "New Rochelle",
    "Mount Vernon",
    "Schenectady",
    "Utica",
  ],
  "North Carolina": [
    "Charlotte",
    "Raleigh",
    "Greensboro",
    "Durham",
    "Winston-Salem",
    "Fayetteville",
    "Cary",
    "Wilmington",
    "High Point",
    "Greenville",
  ],
  "North Dakota": [
    "Fargo",
    "Bismarck",
    "Grand Forks",
    "Minot",
    "West Fargo",
    "Dickinson",
    "Williston",
    "Jamestown",
    "Mandan",
    "Wahpeton",
  ],
  Ohio: [
    "Columbus",
    "Cleveland",
    "Cincinnati",
    "Toledo",
    "Akron",
    "Dayton",
    "Parma",
    "Canton",
    "Youngstown",
    "Lorain",
  ],
  Oklahoma: [
    "Oklahoma City",
    "Tulsa",
    "Norman",
    "Broken Arrow",
    "Lawton",
    "Edmond",
    "Moore",
    "Midwest City",
    "Enid",
    "Stillwater",
  ],
  Oregon: [
    "Portland",
    "Salem",
    "Eugene",
    "Gresham",
    "Hillsboro",
    "Beaverton",
    "Bend",
    "Medford",
    "Springfield",
    "Corvallis",
  ],
  Pennsylvania: [
    "Philadelphia",
    "Pittsburgh",
    "Allentown",
    "Erie",
    "Reading",
    "Scranton",
    "Bethlehem",
    "Lancaster",
    "Harrisburg",
    "Altoona",
  ],
  "Rhode Island": [
    "Providence",
    "Warwick",
    "Cranston",
    "Pawtucket",
    "East Providence",
    "Woonsocket",
    "Coventry",
    "Cumberland",
    "North Providence",
    "South Kingstown",
  ],
  "South Carolina": [
    "Columbia",
    "Charleston",
    "North Charleston",
    "Mount Pleasant",
    "Rock Hill",
    "Greenville",
    "Summerville",
    "Sumter",
    "Hilton Head Island",
    "Florence",
  ],
  "South Dakota": [
    "Sioux Falls",
    "Rapid City",
    "Aberdeen",
    "Brookings",
    "Watertown",
    "Mitchell",
    "Yankton",
    "Pierre",
    "Huron",
    "Spearfish",
  ],
  Tennessee: [
    "Nashville",
    "Memphis",
    "Knoxville",
    "Chattanooga",
    "Clarksville",
    "Murfreesboro",
    "Franklin",
    "Jackson",
    "Johnson City",
    "Bartlett",
  ],
  Texas: [
    "Houston",
    "San Antonio",
    "Dallas",
    "Austin",
    "Fort Worth",
    "El Paso",
    "Arlington",
    "Corpus Christi",
    "Plano",
    "Laredo",
  ],
  Utah: [
    "Salt Lake City",
    "West Valley City",
    "Provo",
    "West Jordan",
    "Orem",
    "Sandy",
    "Ogden",
    "St. George",
    "Layton",
    "Taylorsville",
  ],
  Vermont: [
    "Burlington",
    "South Burlington",
    "Rutland",
    "Barre",
    "Montpelier",
    "St. Albans",
    "Winooski",
    "Newport",
    "Vergennes",
    "St. Johnsbury",
  ],
  Virginia: [
    "Virginia Beach",
    "Norfolk",
    "Chesapeake",
    "Richmond",
    "Newport News",
    "Alexandria",
    "Hampton",
    "Roanoke",
    "Portsmouth",
    "Suffolk",
  ],
  Washington: [
    "Seattle",
    "Spokane",
    "Tacoma",
    "Vancouver",
    "Bellevue",
    "Kent",
    "Everett",
    "Renton",
    "Yakima",
    "Federal Way",
  ],
  "West Virginia": [
    "Charleston",
    "Huntington",
    "Morgantown",
    "Parkersburg",
    "Wheeling",
    "Weirton",
    "Fairmont",
    "Beckley",
    "Martinsburg",
    "Clarksburg",
  ],
  Wisconsin: [
    "Milwaukee",
    "Madison",
    "Green Bay",
    "Kenosha",
    "Racine",
    "Appleton",
    "Waukesha",
    "Eau Claire",
    "Oshkosh",
    "Janesville",
  ],
  Wyoming: [
    "Cheyenne",
    "Casper",
    "Laramie",
    "Gillette",
    "Rock Springs",
    "Sheridan",
    "Green River",
    "Evanston",
    "Riverton",
    "Jackson",
  ],
};
