import React from "react";
import CHNBrandmarkImg from "@/assets/images/brandmark.webp";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  size?: number;
  className?: string;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

function TextWithBrandmark({ children, size = 50, className, type = "h6" }: Props) {
  const Text = type;
  return (
    <div className={cn("flex items-center", className)}>
      <Image width={size} src={CHNBrandmarkImg} alt={"rara brandmark"} />
      <Text
        className="*:font-bebas-neue font-bebas-neue"
        style={{
          fontSize: `${size / 2}px`,
          marginLeft: `-${size / 2}px`,
          marginTop: `${size / 2}px`,
        }}
      >
        {children}
      </Text>
    </div>
  );
}

export default TextWithBrandmark;
