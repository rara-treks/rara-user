import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Users, Star } from "lucide-react";

interface DepartureData {
  id: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  duration: string;
  price: number;
  availableSeats: number;
  rating: number;
  imageUrl: string;
  highlights: string[];
}

interface DepartureHeroProps {
  departure?: DepartureData;
}

const DepartureHero = ({
  departure = {
    id: "1",
    destination: "Annapurna Base Camp",
    departureDate: "2024-03-15",
    returnDate: "2024-03-28",
    duration: "14 days",
    price: 1299,
    availableSeats: 8,
    rating: 4.8,
    imageUrl: "/assets/1.png",
    highlights: [
      "Professional Guide",
      "All Meals Included",
      "Permits Arranged",
      "Group Equipment",
    ],
  },
}: DepartureHeroProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getUrgencyColor = (seats: number) => {
    if (seats <= 3) return "text-red-500 bg-red-50";
    if (seats <= 6) return "text-orange-500 bg-orange-50";
    return "text-green-500 bg-green-50";
  };

  return (
    <section className="bg-transparent py-20">
      {/* Main Content */}
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-gray-900 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-sm font-semibold text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Guaranteed Departure
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                Grab Our Guaranteed Departure
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Join our confirmed group departure for an unforgettable adventure.
              With guaranteed departures, professional guides, and all logistics
              handled, your journey to {departure.destination} is secured and
              worry-free.
            </p>
          </div>

          {/* Right Content - Image Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full">
              <div className="relative h-64 md:h-80">
                <Image
                  src={departure.imageUrl}
                  alt={`${departure.destination} departure`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepartureHero;
