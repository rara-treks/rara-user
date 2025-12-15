import React from "react";
import Link from "next/link";
import CHNLogo from "../chn-logo";
import { CompanyInfo } from "@/types/footer";
import TripadvisorRating from "../tripadvisor-rating";
import GoogleLogo from "./GoogleRating/GoogleLogo";
import TrustPilotRating from "../trustpilot-rating";

interface FooterLogoSectionProps {
  companyInfo: CompanyInfo;
  isTransparent: boolean;
}

function FooterLogoSection({
  companyInfo,
  isTransparent,
}: FooterLogoSectionProps) {
  return (
    <div className="items-start justify-start flex flex-col w-full md:w-auto">
      <div className="w-full mb-4 sm:mb-6">
        <Link href="/">
          <CHNLogo
            variant= "white"
            className="w-full h-auto text-white object-contain max-w-[200px] sm:max-w-[250px] md:max-w-[300px]"
          />
        </Link>
      </div>
      <div className="w-full">
        <p className="text-white text-sm sm:text-base mb-3 sm:mb-4">
          Reg. No. {companyInfo.regNumber} | License No.{" "}
          {companyInfo.licenseNumber}
        </p>
        {/* <div className="w-full overflow-hidden">
          <iframe
            src={companyInfo.mapEmbedUrl}
            width="100%"
            height="200"
            loading="lazy"
            title="Rara Treks Location Map"
            className="w-full h-[150px] sm:h-[180px] md:h-[200px] rounded-md max-w-full"
            style={{ border: 0 }}
          ></iframe>
        </div> */}
        <div className="flex items-center gap-4 mt-4">
          <TripadvisorRating />
          <TrustPilotRating />
          <GoogleLogo />
        </div>
      </div>
    </div>
  );
}

export default FooterLogoSection;
