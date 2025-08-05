import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  sideImage: string;
  title: string;
  latitude: number;
  longitude: number;
}

function LocationCard({ title, sideImage, latitude, longitude }: Props) {
  return (
    <Link
      className="flex"
      href={`https://maps.google.com/?q=${latitude},${longitude}`}
      rel="noreferrer"
      target="_blank"
    >
      <div className="md:grid md:grid-cols-3 items-center rounded-2xl border w-full md:max-w-80 relative overflow-hidden bg-white">
        <Image
          className="aspect-[4/3] md:aspect-square object-cover h-fit md:h-24 self-start bg-white"
          width={500}
          height={500}
          src={sideImage}
          alt={title}
        />
        <div className="md:col-span-2 p-3">
          <h2 className="font-semibold md:text-lg leading-6">{title}</h2>
        </div>
        <IconExternalLink size={20} stroke={1.5} className="absolute top-3 right-3" />
      </div>
    </Link>
  );
}

export default LocationCard;
