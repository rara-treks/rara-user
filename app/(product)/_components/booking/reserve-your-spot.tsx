"use client";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import InquireDateAndGuestSelector from "./inquire-date-and-guest-selector";
import BookingPopup from "./booking-popup";
import OrderCalculations from "./order-calculations";
import { cn } from "@/lib/utils";
import { useProduct } from "../_hooks/product-provider";

interface Props {
  className?: string;
}

function ReserveYourSpot({ className }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const product = useProduct();

  return (
    <div className={cn("border border-border rounded-2xl p-4 bg-white", className)}>
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">Reserve Your Spot</h2>
        <p className="text-center">No Credit Card required, Pay on Arrival</p>
        <InquireDateAndGuestSelector dateType="single" />
        <button className="underline text-left" onClick={() => ref.current?.click()}>
          Add a note
        </button>
        <OrderCalculations
          hideLabels
          product={{
            type: product.type,
            prices: product.prices,
            relatedProducts: [...product.related_homestays, ...product.related_experiences],
          }}
        />
        <BookingPopup
          dateType="single"
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
          <Button ref={ref} className="text-lg">
            Book Now
          </Button>
        </BookingPopup>
      </div>
    </div>
  );
}

export default ReserveYourSpot;
