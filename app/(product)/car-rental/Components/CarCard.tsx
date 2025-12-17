import React from "react";
import { Star, Users, Fuel, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Car } from "./types";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
  onQuickBook: (car: Car) => void;
}

const CarCard = ({ car, onViewDetails, onQuickBook }: CarCardProps) => {
  return (
    <div className="p-1 bg-gradient-to-t from-[#086032] via-[#7A7E77] to-[#DDE4D7] p-[1px] rounded-2xl">
      <Card className="bg-white backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-emerald-500/20 transition-all overflow-hidden border-0">
        <CardContent className="p-1">
          <div className="relative">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-2xl"
            />
            {!car.available && (
              <div className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center">
                <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-semibold">
                  Not Available
                </span>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-gray-800 backdrop-blur-sm px-3 py-2 rounded-full">
              <span className="text-emerald-400 font-bold">
                ${car.pricePerDay}/day
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold ">{car.name}</h3>
              <span className="text-sm text-white bg-slate-600/50 px-2 py-1 rounded">
                {car.type}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-semibold ">{car.rating}</span>
              <span className="ml-1 text-sm text-slate-400">
                ({car.reviews} reviews)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-slate-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {car.seats} seats
              </div>
              <div className="flex items-center">
                <Fuel className="w-4 h-4 mr-1" />
                {car.fuelType}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {car.transmission}
              </div>
            </div>

            <div className="flex space-x-2 ">
              <Button
                variant="outline"
                onClick={() => onViewDetails(car)}
                className="flex-1 text-black px-2 py-2 rounded-full  transition-colors"
              >
                View Details
              </Button>
              <Button
                onClick={() => onQuickBook(car)}
                disabled={!car.available}
                className="flex-1 bg-[#086032] px-4 py-2 rounded-full transition-all disabled:bg-slate-600 disabled:cursor-not-allowed"
              >
                {car.available ? "Quick Book" : "Unavailable"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarCard;
