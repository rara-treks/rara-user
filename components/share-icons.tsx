"use client";
import { cn } from "@/lib/utils";
import React from "react";
import IconFacebook from "./icons/facebook";
import IconInstagram from "./icons/instagram";
import IconTiktok from "./icons/tiktok";
import IconYouTube from "./icons/youtube";
import IconLinkedIn from "./icons/linkedin";
import IconPinterest from "./icons/pinterest";
import useShare from "@/lib/hooks/use-share";

interface Props {
  size: number;
  className?: string;
  shareData: {
    title: string;
    text: string;
    url?: string;
    fileUrl?: string;
  };
}

function ShareIcons({ size, className, shareData }: Props) {
  const { share } = useShare();

  return (
    <div>
      <ul
        style={{
          // @ts-expect-error
          "--icon-size": `${size}px`,
        }}
        className={cn(
          "flex flex-wrap gap-3 items-center [&_svg]:size-[--icon-size] [&_svg]:transition-colors [&_svg]:text-primary/80 [&_svg:hover]:text-primary *:cursor-pointer",
          className
        )}
        onClick={() => share(shareData)}
      >
        <li>
          <IconFacebook />
        </li>
        <li>
          <IconInstagram />
        </li>
        <li>
          <IconTiktok />
        </li>
        <li>
          <IconYouTube />
        </li>
        <li>
          <IconLinkedIn />
        </li>
        <li>
          <IconPinterest />
        </li>
      </ul>
    </div>
  );
}

export default ShareIcons;
