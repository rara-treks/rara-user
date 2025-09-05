import { Trophy, Phone, MapPin } from "lucide-react";
import { Car, FAQ, StatsItem, ServiceFeature, SpecialService } from "./types";

export const carTypes = [
  "Luxury Sedans",
  "SUVs",
  "Sports Cars",
  "Electric Vehicles",
  "Convertibles",
  "Minivans",
  "Commercial Vehicles",
  "Economy Cars",
];

export const cars: Car[] = [
  {
    id: "1",
    name: "Mahendra Scorpio",
    type: "Luxury",
    image: "/assets/car/scorpio.png",
    pricePerDay: 120,
    rating: 4.9,
    reviews: 89,
    features: ["Premium Sound", "Massage Seats", "Chauffeur Available"],
    fuelType: "Hybrid",
    transmission: "Automatic",
    seats: 5,
    available: true,
  },
  {
    id: "2",
    name: "Tyota LandCruiser",
    image: "/assets/car/landcruiser.png",
    type: "SUV",
    pricePerDay: 95,
    rating: 4.8,
    reviews: 156,
    features: ["7 Seater", "AWD", "Premium Interior"],
    fuelType: "Gasoline",
    transmission: "Automatic",
    seats: 7,
    available: true,
  },
  {
    id: "3",
    name: "MG Cyberster",
    type: "Sports",
    image: "/assets/car/mg.png",
    pricePerDay: 180,
    rating: 4.9,
    reviews: 124,
    features: ["Sport Mode", "Track Ready", "Premium Audio"],
    fuelType: "Electric",
    transmission: "Automatic",
    seats: 2,
    available: true,
  },
  {
    id: "4",
    name: "Deepal",
    type: "Electric",
    image: "/assets/car/deepal.png",
    pricePerDay: 110,
    rating: 4.7,
    reviews: 203,
    features: ["Autopilot", "Supercharging", "Premium Interior"],
    fuelType: "Electric",
    transmission: "Automatic",
    seats: 5,
    available: false,
  },
  {
    id: "5",
    name: "Fortuner",
    image: "/assets/car/fortuner.png",
    type: "SUV",
    pricePerDay: 95,
    rating: 4.8,
    reviews: 156,
    features: ["7 Seater", "AWD", "Premium Interior"],
    fuelType: "Gasoline",
    transmission: "Mannual",
    seats: 7,
    available: true,
  },
  {
    id: "6",
    name: "Baleno",
    image: "/assets/car/baleno.png",
    type: "car",
    pricePerDay: 95,
    rating: 4.8,
    reviews: 156,
    features: ["4 Seater", "AWD", "Premium Interior"],
    fuelType: "Gasoline",
    transmission: "Mannual",
    seats: 4,
    available: true,
  },
  {
    id: "7",
    name: "Tata Tiago",
    image: "/assets/car/tata.png",
    type: "taxi",
    pricePerDay: 95,
    rating: 4.8,
    reviews: 156,
    features: ["4 Seater", "AWD", "Premium Interior"],
    fuelType: "Gasoline",
    transmission: "Mannual",
    seats: 4,
    available: true,
  },
  {
    id: "8",
    name: "JMEV Taxi",
    image: "/assets/car/jmev.png",
    type: "car",
    pricePerDay: 95,
    rating: 4.8,
    reviews: 156,
    features: ["4 Seater", "AWD", "Premium Interior"],
    fuelType: "Electric",
    transmission: "Automatic",
    seats: 4,
    available: true,
  },
];

export const faqs: FAQ[] = [
  {
    question: "What do I need to rent a car?",
    answer:
      "You need a valid driver's license, credit card, and must be at least 21 years old. International visitors need an International Driving Permit along with their home country license.",
  },
  {
    question: "Is insurance included in the rental price?",
    answer:
      "Basic insurance is included in all our rentals. We also offer comprehensive coverage options for additional peace of mind during your journey.",
  },
  {
    question: "Can I modify or cancel my reservation?",
    answer:
      "Yes, you can modify or cancel your reservation up to 24 hours before pickup without any fees. Changes made within 24 hours may incur additional charges.",
  },
  {
    question: "Do you offer pickup and delivery services?",
    answer:
      "Yes! We provide complimentary pickup and delivery within the city limits. Airport pickup/delivery and extended area service available for an additional fee.",
  },
  {
    question: "What fuel policy do you follow?",
    answer:
      "We provide vehicles with a full tank and expect them to be returned with a full tank. Alternatively, you can prepay for fuel at competitive rates.",
  },
];

export const statsData: StatsItem[] = [
  { value: "5000+", label: "No of Vehicles" },
  { value: "2 Lakh+", label: "Customers Served Annually" },
  { value: "5000+", label: "No of Drivers" },
  { value: "30", label: "Years of Experience" },
];

export const serviceFeatures: ServiceFeature[] = [
  {
    icon: Trophy,
    title: "First Class Services",
    description:
      "Where luxury meets exceptional care, creating unforgettable moments and exceeding your every expectation.",
  },
  {
    icon: Phone,
    title: "24/7 Customer Service",
    description:
      "Reliable support when you need it most, keeping you on the move with confidence and peace of mind.",
  },
  {
    icon: MapPin,
    title: "Pick-Up & Drop-Off",
    description:
      "Enjoy pickup and drop-off services, adding an extra layer of ease to your car rental experience.",
  },
];

export const specialServices: SpecialService[] = [
  {
    title: "Chauffeur Service",
    description:
      "Professional drivers for your luxury travel needs. Sit back and enjoy the ride while our experienced chauffeurs handle the driving.",
    buttonText: "Book Chauffeur",
  },
  {
    title: "Airport Transfer",
    description:
      "Seamless airport pickup and drop-off services. Start your journey stress-free with our reliable airport transfer solutions.",
    buttonText: "Book Transfer",
  },
  {
    title: "Corporate Solutions",
    description:
      "Tailored fleet solutions for businesses. From executive transportation to team events, we've got your corporate needs covered.",
    buttonText: "Get Quote",
  },
];
