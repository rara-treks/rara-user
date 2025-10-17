import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import IconFacebook from "../icons/facebook";
import IconInstagram from "../icons/instagram";
import IconPinterest from "../icons/pinterest";
import { IconX } from "@tabler/icons-react";

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
      <Link href="#" target="_blank">
        <li>
          <IconFacebook />
        </li>
      </Link>
      <Link href="#" target="_blank">
        <li>
          <IconInstagram />
        </li>
      </Link>
      <Link href="#" target="_blank">
        <li>
          <IconX />
        </li>
      </Link>
      <Link href="#" target="_blank">
        <li>
          <IconPinterest />
        </li>
      </Link>
    </ul>
  );
}

export default SocialIcons;
