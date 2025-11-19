import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Mountains } from "@phosphor-icons/react";
import MobileAdventureCard from "./MobileAdventureCard";
import { Adventure } from "./Adventure";
import TrekInquiryPopup from "../ProductDetail/Details/Departure/Inquire";

interface AdventureCardProps {
  data: Adventure;
}

const AdventureCard = ({ data }: AdventureCardProps) => {
  const { name, featuredImage, overview, prices, departures, id, type, slug } =
    data;

  // Get the earliest departure dates
  const earliestDeparture = departures[0];
  const startDate = earliestDeparture?.departure_from || "";
  const endDate = earliestDeparture?.departure_to || "";

  // Get pricing info
  const priceInfo = prices[0];
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
      <div className="w-full hidden md:flex gap-4 items-center justify-center h-full py-2 px-3 rounded-2xl border border-[#dde4d7] bg-white">
        <div className="flex items-center justify-center gap-4">
          <Image
            src={featuredImage.url}
            alt={name}
            width={255}
            height={200}
            className="rounded-lg w-[255px] h-[230px] object-cover"
          />
        </div>
        <div className="flex-1 w-full relative flex flex-col items-start justify-start gap-[38px] text-left text-sm text-darkslategray-400 font-sen">
          <div className="self-stretch flex flex-col items-start justify-start gap-3">
            <div className="self-stretch flex flex-col items-start justify-start gap-1.5">
              <div className="self-stretch text-[#1E2F2280] relative leading-[150%] font-semibold">
                {formatDate(startDate)}→{formatDate(endDate)}
              </div>
              <Link
                href={`/${type}/${slug}`}
                className="text-2xl leading-[150%] line-clamp-2 font-semibold text-[#1e2f22] hover:text-[#71b344] transition-colors cursor-pointer"
              >
                {name}
              </Link>
            </div>
            <div className="flex flex-row items-start justify-start gap-3 text-darkslategray-300 font-mulish">
              <div className="flex flex-row items-center justify-start gap-1">
                <Clock className="text-sm w-4 h-4 text-[#71b344]" />
                <div className="relative leading-[150%]">
                  {overview.duration} Days
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-1">
                <Users className="text-sm w-4 h-4 text-[#71b344]" />
                <div className="relative leading-[150%]">
                  {overview.group_size}
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-1">
                <Mountains className="text-sm w-4 h-4 text-[#71b344]" />
                <div className="relative leading-[150%]">
                  {overview.trip_grade}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-between gap-0 text-right text-xl text-[#1E2F22] font-mulish">
            <div className="flex flex-col items-start justify-center font-mulish">
              <div className="relative leading-[150%] font-extrabold">
                USD {finalPrice.toLocaleString()}
              </div>
              {discountedPrice > 0 && originalPrice !== discountedPrice && (
                <div className="relative text-sm [text-decoration:line-through] leading-[150%] font-extrabold text-[#1E2F2280]">
                  USD {originalPrice.toLocaleString()}
                </div>
              )}
            </div>
            <TrekInquiryPopup
              trekId={id}
              trekTitle={name}
              buttonText="Book a seat now"
              buttonClassName="rounded-[22px] bg-[#71b344] border-[#71b344] border-solid border-[1px] flex flex-row items-center justify-center py-2 px-4 gap-2 text-left text-base text-whitesmoke font-inter"
            />
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <MobileAdventureCard data={data} />
      </div>
    </div>
  );
};

export default AdventureCard;
