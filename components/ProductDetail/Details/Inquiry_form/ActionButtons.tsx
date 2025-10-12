import { Button } from "@/components/ui/button";
import TrekInquiryPopup from "../Departure/Inquire";
import CustomTripInquiryPopup from "../Departure/CustomInquiry";

interface GuestCounts {
  infant: number;
  child: number;
  adult: number;
}

interface ActionButtonsProps {
  onInquireAvailability?: () => void;
  onCheckAvailability?: () => void;
  disabled?: boolean;
  id?: string | number;
  title?: string;
  selectedDates?: {
    from: Date | null;
    to: Date | null;
  };
  guests?: GuestCounts;
  totalCost?: number;
}

function ActionButtons({
  onCheckAvailability,
  disabled = false,
  title,
}: ActionButtonsProps) {
  return (
    <div className="space-y-3">
      <CustomTripInquiryPopup buttonText="Enquire Now" trekTitle={title} />

      {/* 
      <Button
        variant="outline"
        className={`w-full border-[#71B344] text-[#71B344] hover:bg-green-50 font-medium py-3 rounded-full ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        onClick={onCheckAvailability}
        disabled={disabled}
      >
        Check Availability
      </Button> */}
    </div>
  );
}

export default ActionButtons;
