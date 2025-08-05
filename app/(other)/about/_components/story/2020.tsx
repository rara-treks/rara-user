import Link from "next/link";
import React from "react";
import Image from "next/image";
import PATAGold2020Img from "@/assets/images/awards/pata-gold-award-2020-wb.webp";

function Story2020() {
  return (
    <div className="relative group">
      <h2>2020</h2>
      <div className="w-full h-1 bg-muted block absolute top-10 group-hover:bg-primary transition-colors duration-500"></div>
      <p>
        The COVID-19 crisis, which has brought an abrupt halt to tourism since March 2020, has put tourism-dependent
        communities under financial pressure. With aid from{" "}
        <Link
          href="https://blog.communityhomestay.com/community-homestay-network-awarded-with-booking-booster-grant-to-support-local-communities-affected-by-covid-19/"
          target="_blank"
        >
          <b>Booking.com&apos;s booster program</b>
        </Link>
        , we introduced “
        <Link href="https://blog.communityhomestay.com/collaboration-for-communities/" target="_blank">
          <b>Collaboration for Communities</b>
        </Link>
        ” a project that supports tourism dependent communities across Nepal develop, brand and sell authentic local
        products (eg. traditional handicrafts) and generate income.
      </p>
      <Link href="/assets/reports/2020.pdf" target="_blank">
        <b>2020 Annual Report</b>
      </Link>
      <div className="grid grid-cols-3 gap-4 md:gap-8 mt-3">
        <Image src={PATAGold2020Img} alt="PATA Gold Award 2020" />
      </div>
    </div>
  );
}

export default Story2020;
