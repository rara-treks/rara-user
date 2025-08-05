"use client";
import { Promotion } from "@/lib/utils/server/get-home-promotions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: Promotion[];
  className?: string;
}

function Promotions({ data, className }: Props) {
  if (data.length === 0) return null;
  return (
    <section className={className}>
      <div className="flex flex-col gap-5">
        {data.map((promotion, index) => (
          <div key={index}>
            <Link href={promotion.link}>
              <Image
                style={{
                  height: 0,
                }}
                src={promotion.desktop_image}
                alt={promotion.title}
                className="w-full h-auto hidden md:block"
                width={1000}
                height={1000}
                onLoad={(e) => {
                  e.currentTarget.style.height = "";
                }}
                onError={(e) => (e.currentTarget.hidden = true)}
              />
            </Link>
            <Link href={promotion.link}>
              <Image
                style={{
                  height: 0,
                }}
                src={promotion.mobile_image}
                alt={promotion.title}
                className="w-full h-auto block md:hidden"
                width={1000}
                height={1000}
                onLoad={(e) => {
                  e.currentTarget.style.height = "";
                }}
                onError={(e) => (e.currentTarget.hidden = true)}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Promotions;
