"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BookingDialog from "./Components/BookingDialog";
import CarListings from "./Components/CarListings";
import FAQSection from "./Components/FAQSection";
import FeaturesSection from "./Components/FeaturesSection";
import SpecialServicesSection from "./Components/SpecialServicesSection";
import StatsSection from "./Components/StatsSection";
import { Car } from "./Components/types";
import HeroSection from "./Components/HeroSection";
import RentalForm from "./Components/RentalForm";

const Rental = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState<boolean>(false);
  const router = useRouter();

  const handleQuickBook = (car: Car) => {
    setSelectedCar(car);
    setShowBookingDialog(true);
  };

  const handleViewDetails = (car: Car) => {
    router.push(`/car-rental/detail`);
    // Alternative: if you prefer route params instead of query params
    // router.push(`/detail/${car.id}`);
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
      <SpecialServicesSection />
      <FAQSection />
    </div>
  );
};

export default Rental;
