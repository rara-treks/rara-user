import React from "react";
import Logo from "@/assets/images/logos/rara.png";
import LogoWhite from "@/assets/images/logos/rara.png";
import Image, { StaticImageData } from "next/image";

interface Props {
  variant?: "white" | "default";
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
}

function CHNLogo({
  variant = "default",
  priority = false,
  width = 120,
  height = 40,
  className = "",
  sizes = "(max-width: 768px) 100px, 120px",
  ...props
}: Props) {
  const logoSrc: StaticImageData = variant === "default" ? Logo : LogoWhite;

  return (
    <Image
      src={logoSrc}
      alt="CHN Logo"
      width={width}
      height={height}
      priority={priority}
      quality={90}
      sizes={sizes}
      className={className}
      placeholder="blur"
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  );
}

export default CHNLogo;
