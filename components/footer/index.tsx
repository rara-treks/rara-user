import React from "react";
import CHNLogo from "../chn-logo";
import SocialIcons from "./social-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TripadvisorRating from "../tripadvisor-rating";
import BookingComRating from "../booking-com-rating";
import FooterBottomMenuAndImage from "./footer-bottom-menu-and-image";
import IconLocationPin from "../icons/location-pin";
import IconPhone from "../icons/phone";

const COMPANY_MENU = [
  ["About", "/about"],
  ["Impact", "/impact"],
  ["Safety", "/safety"],
  ["Partner With Us", "/partner-with-us"],
  ["Contact", "/contact"],
  ["Media Coverage", "/media-coverage"],
];

const DISCOVER_MENU = [
  ["Packages", "/packages"],
  ["Homestays", "/homestays"],
  ["Experiences", "/experiences"],
  ["Circuits", "/circuits"],
  ["Blog", "/blog"],
  ["Our Policies", "/policies"],
];

function Footer() {
  return (
    <footer
      className={cn(
        "relative min-h-[400px] lg:min-h-[600px] border-t bg-background",
        "p-5 pb-[40vw] md:p-10 md:pb-[25vw] lg:pb-[20vw] xl:p-10",
        "[&>div_h5]:font-bebas-neue [&>div_h5]:text-2xl [&>div_h5]:mb-2",
        "[&>div_li]:font-medium [&>div_li]:text-muted-foreground [&>div_a_li:hover]:text-foreground",
        "[&>div_li]:mb-1 [&>div_li]:transition-colors overflow-hidden mt-auto"
      )}
    >
      <div
        className={cn(
          "items-start relative z-30 container p-0",
          "grid gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-[180px_160px_160px_1fr_250px]"
        )}
      >
        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
          <Link href="/">
            <CHNLogo className="h-16 w-auto mb-6" />
          </Link>
        </div>
        <div>
          <nav>
            <h5>Company</h5>
            <ul>
              {COMPANY_MENU.map(([title, link]) => (
                <Link key={link} href={link}>
                  <li>{title}</li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <nav>
            <h5>Discover</h5>
            <ul>
              {DISCOVER_MENU.map(([title, link]) => (
                <Link key={link} href={link}>
                  <li>{title}</li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col-span-2 xl:col-span-1">
          <h5>Connect</h5>
          <ul>
            <li className="grid grid-cols-[24px_auto] gap-1 items-center">
              <IconLocationPin className="w-6 h-6 text-primary/80" />
              Lal Durbar Marg, Kathmandu 44600
            </li>
            <li className="grid grid-cols-[24px_auto] gap-1 items-center">
              <IconPhone className="w-5 h-5 text-primary/80" />
              <div className="flex flex-wrap gap-x-2">
                <Link href="tel:+977-01-4519039">+977-01-4519039,</Link>
                <Link href="tel:+977-9801902572">9801902572</Link>
              </div>
            </li>
            <li>
              For sales and agent partnership inquiry, please email us at
              <br />
              <Link
                href="mailto:info@communityhomestay.com"
                className="font-medium hover:text-foreground underline break-all"
              >
                info@communityhomestay.com
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h5>Follow Us</h5>
          <SocialIcons size={30} />
        </div>
      </div>
      <FooterBottomMenuAndImage />
    </footer>
  );
}

export default Footer;
