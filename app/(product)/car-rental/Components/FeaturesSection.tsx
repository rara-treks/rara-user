import React from "react";
import { Car, Shield, Clock, Star, Users, MapPin } from "lucide-react";

const serviceFeatures = [
  {
    icon: Car,
    title: "Premium Fleet",
    description: "Luxury and performance vehicles maintained to perfection.",
  },
  {
    icon: Shield,
    title: "Full Coverage",
    description: "Complete insurance with 24/7 roadside assistance included.",
  },
  {
    icon: Clock,
    title: "Always Open",
    description: "Book anytime with instant confirmation and pickup.",
  },
  {
    icon: Star,
    title: "Concierge Service",
    description: "Personalized delivery and dedicated customer support.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Professional consultants for perfect vehicle selection.",
  },
  {
    icon: MapPin,
    title: "City-Wide Access",
    description: "Multiple locations with flexible scheduling options.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Premium car rental reimagined for the modern traveler
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#71B344] rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Subtle accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
            Ready to experience luxury travel
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
