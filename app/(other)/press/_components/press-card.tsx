import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "date-fns";

interface Props {
  title: string;
  mediaName: string;
  featuredImage: string;
  description: string;
  date: string;
  link: string;
}

function PressCard({ title, mediaName, featuredImage, description, date, link }: Props) {
  return (
    <Link href={link} target="_blank" className="block">
      <div className="bg-transparent hover:bg-white transition-all duration-500 rounded-xl overflow-hidden hover:shadow-lg">
        <Image
          src={featuredImage}
          alt={title}
          width={400}
          height={300}
          className="w-full object-cover aspect-[16/11]"
        />
        <div className="p-4">
          <h3 className="text-xl md:text-2xl mb-1 font-bebas-neue">{title}</h3>
          <p className="text-sm mb-1">
            <span className="font-medium">{mediaName}</span> | {formatDate(date, "MMM dd, yyyy")}
          </p>
          <div className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    </Link>
  );
}

export default PressCard;
