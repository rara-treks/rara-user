import React from "react";
import Image from "next/image";
import BookingComLogo from "@/assets/images/logos/booking-com.webp";
import { IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
  className?: string;
}

function BookingComRating({ className }: Props) {
  return (
    <Link
      href="https://www.booking.com/hotel/np/barauli-community-homestay.en-gb.html"
      rel="noreferrer"
      target="_blank"
      className={className}
    >
      <div className="grid grid-cols-[auto_auto] gap-2 w-fit items-center">
        <div>
          <Image src={BookingComLogo} alt="Booking.com logo" className="size-12" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">Booking.com</h4>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <IconStarFilled size={14} key={index} className="text-primary" />
            ))}
          </div>
          <h6 className="text-sm">75+ reviews</h6>
        </div>
        {/* <div>
          <h6 className="font-bebas-neue text-3xl">4.5</h6>
        </div> */}
      </div>
    </Link>
  );
}

export default BookingComRating;
