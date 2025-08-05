import Image from "next/image";
import React from "react";
import BookingComBoosterAwardImg from "@/assets/images/awards/booking-com-booster-award-wb.webp";

function Story2018() {
  return (
    <div className="relative group">
      <h2>2018</h2>
      <div className="w-full h-1 bg-muted block absolute top-10 group-hover:bg-primary transition-colors duration-500"></div>
      <p>
        €225,000 grant received from Booking Booster, CHN has created more jobs, more promotions, more social
        investment, overall more impact.
      </p>
      <div className="grid grid-cols-3 gap-4 md:gap-8 mt-3">
        <Image src={BookingComBoosterAwardImg} alt="Booking.com Booster Award" />
      </div>
    </div>
  );
}

export default Story2018;
