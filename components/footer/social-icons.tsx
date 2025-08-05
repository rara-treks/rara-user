import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import IconFacebook from "../icons/facebook";
import IconInstagram from "../icons/instagram";
import IconTiktok from "../icons/tiktok";
import IconYouTube from "../icons/youtube";
import IconLinkedIn from "../icons/linkedin";
import IconPinterest from "../icons/pinterest";

interface Props {
  size: number;
  className?: string;
}

function SocialIcons({ size = 30, className }: Props) {
  return (
    <ul
      style={{
        // @ts-expect-error
        "--icon-size": `${size}px`,
      }}
      className={cn(
        "flex flex-wrap gap-3 items-center [&_svg]:size-[--icon-size] [&_svg]:transition-colors [&_svg]:text-primary/80 [&_svg:hover]:text-primary",
        className
      )}
    >
      <Link href="https://www.facebook.com/communityhomestay/" target="_blank">
        <li>
          <IconFacebook />
        </li>
      </Link>
      <Link href="https://www.instagram.com/communityhomestaynetwork/" target="_blank">
        <li>
          <IconInstagram />
        </li>
      </Link>
      <Link href="https://www.tiktok.com/@communityhomestaynetwork" target="_blank">
        <li>
          <IconTiktok />
        </li>
      </Link>
      <Link href="https://www.youtube.com/channel/UCIA_U1g4o0qye40kaCri8Mw" target="_blank">
        <li>
          <IconYouTube />
        </li>
      </Link>
      <Link href="https://www.linkedin.com/company/communityhomestay-com/" target="_blank">
        <li>
          <IconLinkedIn />
        </li>
      </Link>
      <Link href="https://www.pinterest.com/communityhomestaynetwork/" target="_blank">
        <li>
          <IconPinterest />
        </li>
      </Link>
    </ul>
  );
}

export default SocialIcons;
