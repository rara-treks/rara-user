"use client";
import { useState, useEffect } from "react";
import ActionButtons from "./Inquiry_form/ActionButtons";
import CostSummary from "./Inquiry_form/CostSummary";
import { GuestCounts } from "./Inquiry_form/GuestSelector";
import InfoNote from "./Inquiry_form/InfoNote";
import PriceHeader from "./Inquiry_form/PriceHeader";
import { InquiryData } from "@/components/ProductDetail/type";

interface InquiryProps {
  data: InquiryData;
}

function Inquiry({ data }: InquiryProps) {
  const [guests, setGuests] = useState<GuestCounts>({
    infant: 0,
    child: 0,
    adult: 1, // Default to 1 adult
  });
  const [totalCost, setTotalCost] = useState(0);
  const [selectedDates, setSelectedDates] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  // Get pricing based on number of adults (default to first price if no match)
  const getCurrentPricing = () => {
    if (!data.prices || data.prices.length === 0) {
      return { originalPrice: 0, currentPrice: 0 };
    }

    const matchingPrice =
      data.prices.find((price) => price.number_of_people === guests.adult) ||
      data.prices[0];

    return {
      originalPrice: matchingPrice.original_price_usd,
      currentPrice:
        matchingPrice.discounted_price_usd > 0
          ? matchingPrice.discounted_price_usd
          : matchingPrice.original_price_usd,
    };
  };

  const { originalPrice, currentPrice } = getCurrentPricing();

  // Calculate discount percentage
  const discountPercentage =
    originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  useEffect(() => {
    const total =
      guests.adult * currentPrice + guests.child * (currentPrice * 0.7);
    setTotalCost(Math.round(total));
  }, [guests, currentPrice]);

  const isFormComplete =
    selectedDates.from &&
    selectedDates.to &&
    (guests.adult > 0 || guests.child > 0 || guests.infant > 0);

  return (
    <div className="w-full max-w-sm mx-auto bg-[#71B34433] p-1 rounded-2xl shadow-lg overflow-hidden">
      <PriceHeader
        originalPrice={discountPercentage > 0 ? `$${originalPrice}` : ""}
        currentPrice={`$${currentPrice}`}
        discount={
          discountPercentage > 0 ? `save up to ${discountPercentage}%` : ""
        }
      />

      <div className="p-6 bg-white rounded-2xl">
        <CostSummary costPerAdult={currentPrice} totalCost={totalCost} />

        <InfoNote
          impact={data.impact}
        />

        <ActionButtons
          disabled={!isFormComplete}
          id={data.id}
          title={data.title}
          selectedDates={selectedDates}
          guests={guests}
          totalCost={totalCost}
          onInquireAvailability={() =>
            console.log("Inquire availability clicked")
          }
          onCheckAvailability={() => console.log("Check availability clicked")}
        />
      </div>
    </div>
  );
}

export default Inquiry;
