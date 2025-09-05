"use client";

import { useState } from "react";
import BookingDialog from "./Components/BookingDialog";
import CarListings from "./Components/CarListings";
import FAQSection from "./Components/FAQSection";
import FeaturesSection from "./Components/FeaturesSection";
import SpecialServicesSection from "./Components/SpecialServicesSection";
import StatsSection from "./Components/StatsSection";
import { Car } from "./Components/types";
import HeroSection from "./Components/HeroSection";



const Rental = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState<boolean>(false);

  const handleQuickBook = (car: Car) => {
    setSelectedCar(car);
    setShowBookingDialog(true);
  };

  const handleViewDetails = (car: Car) => {
    alert(
      `Viewing details for ${car.name} - This would navigate to /car/${car.id}`
    );
  };

  const handleCloseDialog = () => {
    setShowBookingDialog(false);
    setSelectedCar(null);
  };

  return (
    <div className="min-h-screen ">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CarListings
        onViewDetails={handleViewDetails}
        onQuickBook={handleQuickBook}
      />
      <SpecialServicesSection />
      <FAQSection />

      <BookingDialog
        isOpen={showBookingDialog}
        onClose={handleCloseDialog}
        selectedCar={selectedCar}
      />
    </div>
  );
};

export default Rental;
