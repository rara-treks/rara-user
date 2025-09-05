import React from "react";
import CarCard from "./CarCard";
import { cars } from "./data";
import { Car } from "./types";

interface CarListingsProps {
  onViewDetails: (car: Car) => void;
  onQuickBook: (car: Car) => void;
}

const CarListings = ({
  onViewDetails,
  onQuickBook,
}: CarListingsProps) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Premium Fleet</h2>
          <p className="text-slate-800 max-w-2xl mx-auto">
            Choose from our carefully selected collection of vehicles, each
            maintained to the highest standards for your comfort and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onViewDetails={onViewDetails}
              onQuickBook={onQuickBook}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarListings;
