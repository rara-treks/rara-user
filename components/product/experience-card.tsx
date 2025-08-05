import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  link: string;
  featuredImage: string;
}

function ExperienceCard({ title, description, link, featuredImage }: Props) {
  return (
    <Link href={link}>
      <article
        className="rounded-xl p-4 h-[350px] bg-no-repeat bg-cover relative group overflow-hidden"
        style={{ backgroundImage: `url(${featuredImage})` }}
      >
        <h3
          className={cn(
            "font-bebas-neue text-2xl text-center text-white mt-auto",
            "absolute bottom-4 left-1/2 -translate-x-1/2 z-10",
            "opacity-0 md:opacity-100 group-hover:opacity-0 transition-opacity"
          )}
        >
          {title}
        </h3>
        <div
          className={cn(
            "absolute bottom-4 left-4 right-4 z-10 flex-col gap-2",
            "flex md:opacity-0 group-hover:opacity-100 transition-opacity"
          )}
        >
          <h3 className="font-bebas-neue text-2xl text-white">{title}</h3>
          <p className="text-white font-medium line-clamp-4 text-sm">{description}</p>
        </div>
        <div className={cn("absolute inset-0 z-0", "bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900")} />
      </article>
    </Link>
  );
}

export default ExperienceCard;
