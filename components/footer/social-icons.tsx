import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import IconFacebook from "../icons/facebook";
import IconInstagram from "../icons/instagram";
import IconPinterest from "../icons/pinterest";
import { Twitter } from "lucide-react";
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
      <Link href="https://www.facebook.com/raratours/" target="_blank">
        <li>
          <IconFacebook />
        </li>
      </Link>
      <Link href="https://www.instagram.com/raratreks" target="_blank">
        <li>
          <IconInstagram />
        </li>
      </Link>
      <Link href="https://x.com/raratreks" target="_blank">
        <li>
          <Twitter />
        </li>
      </Link>
      <Link href="https://www.pinterest.com/raratreks/" target="_blank">
        <li>
          <IconPinterest />
        </li>
      </Link>
    </ul>
  );
}

export default SocialIcons;
