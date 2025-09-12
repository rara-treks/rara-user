import { Users, Luggage, Fuel, Car, Shield, MapPin } from "lucide-react";

export const carImages = [
  "/assets/car/baleno.png",
  "/assets/car/deepal.png",
  "/assets/car/fortuner.png",
  "/assets/car/landcruiser.png",
];

export const carInfo = {
  name: "Toyota Camry Hybrid 2024",
  description:
    "Experience luxury and efficiency with our premium Toyota Camry Hybrid. Perfect for business trips, family vacations, or city exploration. Features advanced safety technology and exceptional fuel economy.",
  rating: 4.9,
  reviewCount: "4.9/5",
  dailyRate: 89,
  originalRate: 120,
  discount: "25% OFF",
  badgeText: "Premium",
};

export const carFeatures = [
  {
    icon: Users,
    label: "5 Passengers",
    description: "Comfortable seating for up to 5 adults",
  },
  {
    icon: Luggage,
    label: "4 Large Bags",
    description: "Spacious trunk for all your luggage",
  },
  {
    icon: Fuel,
    label: "Hybrid Engine",
    description: "Fuel-efficient hybrid technology",
  },
  {
    icon: Car,
    label: "Automatic",
    description: "Smooth automatic transmission",
  },
  {
    icon: Shield,
    label: "Full Insurance",
    description: "Comprehensive coverage included",
  },
  {
    icon: MapPin,
    label: "GPS Navigation",
    description: "Built-in GPS navigation system",
  },
];

export const specifications = {
  "Make & Model": "Toyota Camry Hybrid 2024",
  Engine: "2.5L 4-Cylinder Hybrid",
  "Fuel Type": "Hybrid (Petrol + Electric)",
  Transmission: "CVT Automatic",
  "Drive Type": "Front-Wheel Drive",
  "Fuel Economy": "28 km/L (Combined)",
  "Safety Rating": "5 Stars ANCAP",
  Features: "Apple CarPlay, Android Auto, Wireless Charging",
};

export const faqs = [
  {
    question: "What documents do I need to rent this car?",
    answer:
      "You need a valid driver's license, passport or national ID, and a credit card in the driver's name.",
  },
  {
    question: "Is there a minimum age requirement?",
    answer:
      "Yes, the minimum age is 21 years. Drivers under 25 may incur additional fees.",
  },
  {
    question: "What is included in the rental price?",
    answer:
      "The price includes basic insurance, unlimited mileage, and 24/7 roadside assistance.",
  },
  {
    question: "Can I modify or cancel my booking?",
    answer:
      "Yes, you can modify or cancel your booking up to 24 hours before pickup without charges.",
  },
  {
    question: "What happens if I return the car late?",
    answer:
      "Late returns incur additional charges. Please contact us if you expect to be late.",
  },
];
