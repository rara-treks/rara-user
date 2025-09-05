import React from "react";
import { specialServices } from "./data";
import { Button } from "@/components/ui/button";

const SpecialServicesSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold  mb-4">Special Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Beyond car rental, we offer premium services to make your journey
            exceptional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialServices.map((service, index) => (
            <div
              key={index}
              className="bg-white backdrop-blur-sm rounded-2xl p-8 transition-all border border-slate-700/50"
            >
              <h3 className="text-2xl font-bold text-[#71B344] mb-4">
                {service.title}
              </h3>
              <p className="text-slate-800 mb-6">{service.description}</p>
              <Button className="bg-[#71B344]  px-6 py-3 rounded-full transition-all">
                {service.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialServicesSection;
