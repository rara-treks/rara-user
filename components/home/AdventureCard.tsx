import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Clock, Users } from "lucide-react";
import { Mountains } from "@phosphor-icons/react";
import MobileAdventureCard from "./MobileAdventureCard";
import { Adventure } from "./Adventure";
import CustomTripBookingPopup from "../ProductDetail/Details/Departure/Booking";

interface AdventureCardProps {
  data: Adventure;
  className?: string;
}

const AdventureCard = ({ data, className = "" }: AdventureCardProps) => {
  const { name, featuredImage, overview, prices, departures, id, type, slug } =
    data;

  const earliestDeparture = departures?.[0];
  const startDate = earliestDeparture?.departure_from || "";
  const endDate = earliestDeparture?.departure_to || "";

  const priceInfo = prices?.[0];
  const originalPrice = parseFloat(priceInfo?.original_price_usd || "0");
  const discountedPrice = parseFloat(priceInfo?.discounted_price_usd || "0");
  const finalPrice = discountedPrice > 0 ? discountedPrice : originalPrice;

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex w-full ">
      <div className="w-full hidden lg:flex gap-4 items-center justify-center h-full rounded-[32px] border border-[#dde4d7] bg-white">
        <div className="flex items-center justify-center gap-4">
          {featuredImage && (
            <Image
              src={featuredImage.url}
              alt={name}
              width={255}
              height={200}
              className="rounded-[28px] w-[255px] h-[230px] object-cover"
            />
          )}
        </div>
        <div className="flex-1 w-full h-full relative flex flex-col items-start justify-start pl-2 pr-4 pbb-2 pt-4 gap-[20px] text-left text-sm text-darkslategray-400 font-sen">
          <div className="self-stretch flex flex-col items-start justify-start gap-3">
            <div className="self-stretch flex flex-col items-start justify-start gap-1.5">
              <div className="self-stretch text-[#1E2F2280] relative leading-[150%] font-semibold">
                {formatDate(startDate)}→{formatDate(endDate)}
              </div>
              <Link
                href={`/${type}/${slug}`}
                className="text-2xl leading-[150%] line-clamp-2 font-semibold text-[#1e2f22] hover:text-[#086032] transition-colors cursor-pointer"
              >
                {name}
              </Link>
            </div>
            <div className="flex flex-row items-start justify-start gap-3 text-darkslategray-300 font-mulish">
              <div className="flex flex-row items-center justify-start gap-1">
                <Clock className="text-sm w-4 h-4 text-[#086032]" />
                <div className="relative leading-[150%]">
                  {overview.duration} Days
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-1">
                <Users className="text-sm w-4 h-4 text-[#086032]" />
                <div className="relative leading-[150%]">
                  {overview.group_size}
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-1">
                <Mountains className="text-sm w-4 h-4 text-[#086032]" />
                <div className="relative leading-[150%]">
                  {overview.trip_grade}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row md:flex-col xl:flex-row items-center justify-between gap-0 text-right text-xl text-[#1E2F22] font-mulish">
            <div className="flex flex-col items-start justify-center font-mulish">
              <div className="relative leading-[150%] font-bold text-green-600">
                $ {finalPrice.toLocaleString()}
              </div>
              {discountedPrice > 0 && originalPrice !== discountedPrice && (
                <div className="relative text-sm [text-decoration:line-through] leading-[150%] font-extrabold text-[#1E2F2280]">
                  $ {originalPrice.toLocaleString()}
                </div>
              )}
            </div>
            <CustomTripBookingPopup
              buttonText="Book a seat now"
              trekTitle={name}
              trekId={id}
            />
          </div>
        </div>
      </div>
      <div className="w-full block lg:hidden">
        <MobileAdventureCard data={data} className="w-full" />
      </div>
    </div>
  );
};

export default AdventureCard;
