"use client";

import Image from "next/image";

interface TestimonialBackgroundProps {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export default function TestimonialBackground({
  src = "/assets/testimonialbg.png",
  alt = "Testimonial Background",
  className = "",
  priority = false,
}: TestimonialBackgroundProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <Image
        src={src}
        width={1200}
        height={400}
        alt={alt}
        className="w-full object-cover"
        priority={priority}
        quality={85}
        loading={priority ? undefined : "lazy"}
        sizes="100vw"
      />
    </div>
  );
}
