"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import InquireDateAndGuestSelector from "./inquire-date-and-guest-selector";
import BookingPopup from "./booking-popup";
import OrderCalculations from "./order-calculations";
import { useProduct } from "../_hooks/product-provider";
import AddActivities from "./add-activities";

interface Props {
  dateType?: "single" | "double";
}

function BookNowForm({ dateType }: Props) {
  const product = useProduct();

  return (
    <div className="grid grid-cols-1 gap-3 text-center">
      <h3>No Credit Card required. Pay on Arrival</h3>
      <InquireDateAndGuestSelector dateType={dateType} />
      <AddActivities />
      <OrderCalculations
        hideLabels
        product={{
          type: product.type,
          prices: product.prices,
          relatedProducts: [...product.related_homestays, ...product.related_experiences],
        }}
      />
      <BookingPopup
        dateType={dateType}
        product={{
          id: product.id,
          type: product.type,
          name: product.name,
          location: product.location,
          averageRating: product.average_rating,
          featuredImage: product.files.featuredImage,
          relatedProducts: [...product.related_homestays, ...product.related_experiences],
          prices: product.prices,
        }}
      >
        <Button className="text-lg">Reserve</Button>
      </BookingPopup>
      <h4>Prices are adjustable according to the number of attendees.</h4>
    </div>
  );
}

export default BookNowForm;
