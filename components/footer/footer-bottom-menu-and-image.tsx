"use client";

import React from "react";
import useHeader from "@/lib/hooks/use-header";
import FooterLogoSection from "./FooterLogoSection";
import FooterContactSection from "./FooterContactSection";
import FooterMenuSection from "./FooterMenuSection";
import FooterRatingSocialSection from "./FooterRatingSocialSection";
import FooterAssociates from "./FooterAssociates";
import FooterCopyright from "./FooterCopyright";
import { footerData } from "./footerData";

function FooterBottomMenuAndImage() {
  const { isTransparent } = useHeader();

  return (
    <div className="flex flex-col w-full items-start bg-[#1E2F22] pt-12 pb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start w-full justify-between md:container px-3 border-b pb-8">
        <FooterLogoSection
          companyInfo={footerData.companyInfo}
          isTransparent={isTransparent}
        />

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:px-8">
            <FooterContactSection contactInfo={footerData.contactInfo} />

            <div className="grid grid-cols-3 gap-6">
              {footerData.menuSections.map((section) => (
                <FooterMenuSection key={section.title} section={section} />
              ))}
            </div>
          </div>

          <FooterRatingSocialSection
            rating={footerData.rating}
            socialLinks={footerData.socialLinks}
          />

          <FooterAssociates associates={footerData.associates} />
        </div>
      </div>

      <FooterCopyright copyright={footerData.copyright} />
    </div>
  );
}

export default FooterBottomMenuAndImage;
