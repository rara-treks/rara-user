import React from "react";
import CarTypeCarousel from "./CarTypeCarousel";

const UpdatedHeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-slate-800 to-slate-700 text-white overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop&crop=center"
          alt="Luxury cars"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            Premium Car Rental
          </h1>
          <p className="text-2xl mb-8 text-slate-200 max-w-2xl mx-auto">
            Experience luxury and comfort with our premium fleet. From city
            drives to weekend getaways, we have the perfect vehicle for every
            journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-green-600 transition-all shadow-lg hover:shadow-emerald-500/25">
              Explore Our Fleet
            </button>
            <button className="border-2 border-emerald-400 text-emerald-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-400 hover:text-slate-900 transition-all">
              Contact Us
            </button>
          </div>

          <CarTypeCarousel />
        </div>
      </div>
    </section>
  );
};

export default UpdatedHeroSection;
