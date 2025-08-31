"use client";
import { useState, useEffect } from "react";
import ActionButtons from "./Inquiry_form/ActionButtons";
import CostSummary from "./Inquiry_form/CostSummary";
import DateSelector from "./Inquiry_form/DateSelector";
import GuestSelector, { GuestCounts } from "./Inquiry_form/GuestSelector";
import InfoNote from "./Inquiry_form/InfoNote";
import PriceHeader from "./Inquiry_form/PriceHeader";

interface InquiryData {
  id: string | number;
  title: string;
}

interface InquiryProps {
  data?: InquiryData;
  originalPrice?: string;
  currentPrice?: string;
  discount?: string;
  costPerAdult?: number;
}

function Inquiry({
  data,
  originalPrice = "$500",
  currentPrice = "$1200.00",
  discount = "save up to 30%",
  costPerAdult = 1200,
}: InquiryProps) {
  const [guests, setGuests] = useState<GuestCounts>({
    infant: 0,
    child: 0,
    adult: 0,
  });
  const [totalCost, setTotalCost] = useState(1200);
  const [selectedDates, setSelectedDates] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  useEffect(() => {
    const total =
      guests.adult * costPerAdult + guests.child * (costPerAdult * 0.7);
    setTotalCost(Math.round(total));
  }, [guests, costPerAdult]);

  // const handleDateChange = (fromDate: Date | null, toDate: Date | null) => {
  //   setSelectedDates({ from: fromDate, to: toDate });
  // };

  // const handleGuestChange = (newGuests: GuestCounts) => {
  //   setGuests(newGuests);
  // };

  const isFormComplete =
    selectedDates.from &&
    selectedDates.to &&
    (guests.adult > 0 || guests.child > 0 || guests.infant > 0);

  return (
    <div className="w-full max-w-sm mx-auto bg-[#71B34433] p-1 rounded-2xl shadow-lg overflow-hidden">
      <PriceHeader
        originalPrice={originalPrice}
        currentPrice={currentPrice}
        discount={discount}
      />

      <div className="p-6 bg-white rounded-2xl">
        {/* <DateSelector onDateChange={handleDateChange} />

        <GuestSelector onGuestChange={handleGuestChange} /> */}

        <CostSummary costPerAdult={costPerAdult} totalCost={totalCost} />

        <InfoNote message="This is where you might want to put any information you want to give to me in the form of the following corresponding." />

        <ActionButtons
          disabled={!isFormComplete}
          id={data?.id}
          title={data?.title}
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
