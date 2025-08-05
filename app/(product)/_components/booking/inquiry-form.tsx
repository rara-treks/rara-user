"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import InquireDateAndGuestSelector from "./inquire-date-and-guest-selector";
import InquirePopup from "./inquire-popup";
import useBooking, { BookingData } from "../_hooks/use-booking";
import { format } from "date-fns";
import OrderCalculations from "./order-calculations";
import AddActivities from "./add-activities";

interface Props {
  product: BookingData;
  dateType?: "single" | "double";
}

function InquiryForm({ product, dateType }: Props) {
  const { fromDate, toDate } = useBooking();

  return (
    <div className="flex flex-col gap-3 text-center">
      {fromDate && toDate && (
        <h3>
          We will check dates available between {format(fromDate, "dd/MM/yyyy")} and {format(toDate, "dd/MM/yyyy")}.
        </h3>
      )}
      <InquireDateAndGuestSelector dateType={dateType} />
      <AddActivities />
      <OrderCalculations hideLabels product={product} />
      <InquirePopup product={product} dateType={dateType}>
        <Button className="text-lg">Inquire</Button>
      </InquirePopup>
      <h4>Prices are adjustable according to the number of attendees.</h4>
    </div>
  );
}

export default InquiryForm;
