"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import RatingStars from "./rating-stars";

interface Props {
  name: string;
  productName: string;
  countryCode: string;
  rating: number;
  review: string;
}

function ReviewCard2({ name, productName, countryCode, rating, review }: Props) {
  const [hasMore, setHasMore] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const reviewRef = useRef<HTMLParagraphElement>(null);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    if (reviewRef.current) {
      setHasMore(reviewRef.current.scrollHeight > reviewRef.current.clientHeight);
    }
  }, []);

  return (
    <article className="relative bg-white rounded-2xl p-4 md:p-6 h-fit">
      <Image
        width={160}
        height={160}
        loading="lazy"
        className="absolute -top-10 right-4 rounded-full aspect-square z-10 object-cover size-20 lg:size-24 bg-white"
        src={`https://flagcdn.com/w160/${countryCode}.webp`}
        onError={(e) => (e.currentTarget.hidden = true)}
        alt={countryCode}
      />
      <div>
        <h5 className="font-bebas-neue text-2xl">{name}</h5>
        <h6 className="text-primary font-semibold capitalize my-1">{productName}</h6>
        <div className="mb-4 text-black font-medium">
          <p ref={reviewRef} aria-expanded={isExpanded} className="line-clamp-5 aria-expanded:line-clamp-none ">
            {review}
          </p>
          {hasMore && (
            <button className="underline" onClick={handleExpand}>
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
        <RatingStars className="size-5" rating={rating} />
      </div>
    </article>
  );
}

export default ReviewCard2;
