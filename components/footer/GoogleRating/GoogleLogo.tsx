import React from "react";
import Image from "next/image";
import google from "@/assets/images/logos/google.webp";
import Link from "next/link";

interface Props {
  className?: string;
}

function GoogleLogo({ className }: Props) {
  return (
    <Link
      href="https://share.google/AjARCHNHRbmKEln0P"
      rel="noreferrer"
      target="_blank"
      className={className}
    >
      <div className="grid grid-cols-[auto_auto] rounded-3xl gap-2 w-fit items-center">
        <div>
          <Image src={google} alt="Google logo" className="size-12" />
        </div>
      </div>
    </Link>
  );
}

export default GoogleLogo;
