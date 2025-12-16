"use client";
import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  countryCode: string;
  rating: string;
  review: string;
  reply?: string | null;
}

function ReviewCard({ name, countryCode, rating, review, reply }: Props) {
  return (
    <article>
      <div className="flex items-center gap-3 mb-2">
        <Image
          className="bg-white object-cover max-h-9 border"
          width={50}
          height={50}
          loading="lazy"
          src={`https://flagcdn.com/w160/${countryCode}.webp`}
          alt={"india"}
          onError={(e) => (e.currentTarget.hidden = true)}
        />
        <h5 className="font-semibold">{name}</h5>
        <p className="font-semibold text-muted-foreground">{rating}/5</p>
      </div>
      <div>
        <p>{review}</p>
        {reply && <ReplyCard reply={reply} />}
      </div>
    </article>
  );
}

export default ReviewCard;

function ReplyCard({ reply }: { reply: string }) {
  return (
    <article>
      <div className="flex gap-3">
        <div>
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2C2 22.9906 6.48113 27 27 27" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
          </svg>
        </div>
        <div className="mt-3">
          <h5 className="font-semibold">
            RARA Team <span className="font-normal">replied</span>
          </h5>
          <p>{reply}</p>
        </div>
      </div>
    </article>
  );
}
