import React from "react";
import Logo from "@/assets/images/logos/chn.png";
import LogoWhite from "@/assets/images/logos/chn-white.png";
import Image from "next/image";

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  variant?: "white" | "default";
}

function CHNLogo({ variant = "default", ...props }: Props) {
  return <Image src={variant === "default" ? Logo : LogoWhite} alt="CHN Logo" {...props} />;
}

export default CHNLogo;
