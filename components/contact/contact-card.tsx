import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import SocialIcons from "../footer/social-icons";

const ICON_STROKE = 1.5;

function ContactCard() {
  return (
    <section className="bg-neutral-800 text-white rounded-2xl p-5 md:p-10 flex flex-col gap-8 justify-between">
      <div>
        <h3 className="font-medium text-xl mb-2">Contact Information</h3>
        <p className="text-gray-400">Contact us through different means</p>
      </div>
      <ul className="flex flex-col gap-3 *:grid *:grid-cols-[24px_auto] *:gap-2 *:items-center [&_svg]:text-white [&_a]:break-all">
        <li>
          <IconPhone stroke={ICON_STROKE} className="text-primary/80" />
          <div className="flex flex-wrap">
            <Link href="tel:+977-01-4519039">+977-01-4519039</Link> <span className="px-1">|</span>{" "}
            <Link href="tel:+977-9801902572">9801902572</Link>
          </div>
        </li>
        <li>
          <IconMail stroke={ICON_STROKE} className="text-primary/80" />
          <Link href="mailto:info@raratreks.com">info@raratreks.com</Link>
        </li>
        <li>
          <IconMapPin stroke={ICON_STROKE} className="text-primary/80" />
          Lal Durbar Marg, Kathmandu, Nepal
        </li>
      </ul>
      <SocialIcons size={30} className="[&_svg]:text-white [&_svg:hover]:text-gray-300" />
    </section>
  );
}

export default ContactCard;
