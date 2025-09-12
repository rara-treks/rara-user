"use client";

import FAQSection from "./Components/FAQSection";
import BookingForm from "./Components/BookingForm";
import { carImages, carInfo, carFeatures, specifications, faqs } from "./Components/carData";
import CarFeaturesSection from "./Components/CarFeaturesSection";
import CarImageCarousel from "./Components/CarImageCarousel";
import CarInfoSection from "./Components/CarInfoSection";
import CarSpecificationsSection from "./Components/CarSpecificationsSection";



interface BookingFormData {
  name: string;
  email: string;
  contact: string;
  departureDate: string;
  returnDate: string;
  pickupAddress: string;
  dropoffAddress: string;
  additionalRequests: string;
}

export default function CarRentalDetailPage() {
  const handleBookingSubmit = (formData: BookingFormData) => {
    console.log("Booking submitted:", formData);
    alert("Booking request submitted successfully! We will contact you soon.");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="bg-transparent">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Image Carousel */}
            <CarImageCarousel images={carImages} />

            {/* Car Info */}
            <CarInfoSection
              carName={carInfo.name}
              description={carInfo.description}
              rating={carInfo.rating}
              reviewCount={carInfo.reviewCount}
              dailyRate={carInfo.dailyRate}
              originalRate={carInfo.originalRate}
              discount={carInfo.discount}
              badgeText={carInfo.badgeText}
            />
          </div>
        </div>
      </section>

      {/* Main Content Section - Left and Right Layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features Section */}
            <CarFeaturesSection features={carFeatures} />

            {/* Specifications */}
            <CarSpecificationsSection specifications={specifications} />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} />
          </div>

          {/* Right Section - Booking Form */}
          <div>
            <BookingForm
              dailyRate={carInfo.dailyRate}
              onSubmit={handleBookingSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
