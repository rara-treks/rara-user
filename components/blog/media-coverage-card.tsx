import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  featuredImage: string;
  mediaImage?: string;
  mediaName?: string; // Adding mediaName prop
  link: string;
}

function MediaCoverageCard({
  title,
  featuredImage,
  mediaImage,
  mediaName,
  link,
}: Props) {
  return (
    <article className="rounded-3xl bg-white border h-full shadow-card-2 overflow-hidden select-none">
      <Link
        className="overflow-hidden"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="aspect-[4/2.5] object-cover overflow-hidden bg-white">
          <Image
            className="size-full"
            src={featuredImage}
            alt={title}
            width={300}
            height={200}
          />
        </div>
        <div className="p-4 flex flex-col justify-center items-center text-center">
          {mediaImage ? (
            <Image
              className="h-10 max-w-full w-auto bg-white"
              src={mediaImage}
              alt={title}
              width={300}
              height={200}
            />
          ) : (
            mediaName && (
              <div className="text-lg font-bold text-gray-700">{mediaName}</div>
            )
          )}
          <h2 className="font-semibold mt-4">{title}</h2>
        </div>
      </Link>
    </article>
  );
}

export default MediaCoverageCard;
