import { Mountain } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white"></div>

      <div className="relative w-full container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
          <div className="space-y-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-50 rounded-xl">
              <Mountain className="w-7 h-7 text-emerald-600" />
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
                About Our
                <span className="block text-emerald-600 font-normal">
                  Journey
                </span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                For the past decade, we've been crafting extraordinary
                adventures that connect travelers with the world's most
                breathtaking destinations and vibrant cultures.
              </p>
            </div>

            <div className="w-16 h-0.5 bg-emerald-200"></div>
          </div>

          <div className="relative">
            <div className="w-3xl h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/assets/2.png"
                alt="Mountain landscape"
                fill
                className="w-full h-full rounded-3xl object-cover"
              />
            </div>
            {/* Subtle floating element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-50 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
