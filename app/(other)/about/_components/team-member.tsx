import React from "react";
import { IconBrandLinkedin } from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  name: string;
  position: string;
  linkedinUrl: string;
  image: string;
  className?: string;
}

function TeamMember({ name, position, linkedinUrl, image, className }: Props) {
  return (
    <div
      className={cn(
        "bg-primary hover:bg-gray-300 transition-colors duration-500 rounded-full w-full h-[350px] min-[450px]:h-[450px] md:h-[500px] relative overflow-hidden",
        className
      )}
    >
      <div className="text-center pt-6 px-6 min-[450px]:pt-9 min-[450px]:px-9">
        <h4 className="font-bebas-neue font-medium text-xl sm:text-2xl">{name}</h4>
        <h5 className="font-medium text-sm md:text-base mb-1">{position}</h5>
        <Link href={linkedinUrl} target="_blank">
          <IconBrandLinkedin size={30} stroke={1.5} className="mx-auto" />
        </Link>
      </div>
      <Image
        className="absolute bottom-0 h-2/3 object-cover object-top"
        src={image}
        width={600}
        height={600}
        alt={name}
      />
    </div>
  );
}

export default TeamMember;
