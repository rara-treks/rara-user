import React from "react";
import { statsData } from "./data";

const StatsSection: React.FC = () => {
  return (
    <section className="bg-emerald-800 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-2">
            Our Numbers Speak
          </h2>
          <p className="text-emerald-400 text-xl ">
            We offer customers a diverse fleet of{" "}
            <span className="text-emerald-300 font-bold">Commercial and</span>
          </p>
          <p className="text-emerald-400 text-xl">
            <span className="text-emerald-300 font-bold">customized cars</span>{" "}
            to suit any requirements.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <div className="text-5xl font-bold text-emerald-400 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
