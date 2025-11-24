
import { useCallback } from "react";
import CustomTripBookingPopup from "../Departure/Booking";
import CustomTripInquiryPopup from "../Departure/CustomInquiry";
import CustomTripSection from "../Departure/CustomTripSection";

interface GuestCounts {
  infant: number;
  child: number;
  adult: number;
}

interface ActionButtonsProps {
  onInquireAvailability?: () => void;
  onCheckAvailability?: () => void;
  disabled?: boolean;
  id?: number;
  title?: string;
  selectedDates?: {
    from: Date | null;
    to: Date | null;
  };
  guests?: GuestCounts;
  totalCost?: number;
}

function ActionButtons({
  title,
  id,
}: ActionButtonsProps) {
    
  return (
    <div className=" gap-4 flex">
      <CustomTripInquiryPopup
        buttonText="inquire Now"
        trekTitle={title}
        trekId={id}
      />
      <CustomTripBookingPopup
        buttonText="Book Now"
        trekTitle={title}
        trekId={id}
      />
      
    </div>
  );
}

export default ActionButtons;
