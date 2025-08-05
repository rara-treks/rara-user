"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { IconCircleCheckFilled, IconCirclePlus } from "@tabler/icons-react";

interface BaseProps {
  loading?: boolean;
}

interface LoadingProps extends BaseProps {
  loading: true;
}

interface NonLoadingProps extends BaseProps {
  id: number;
  title: string;
  tagline: string;
  price: number | string | undefined;
  featuredImage: string;
  badge?: string;
  selected?: boolean;
  onPlusClick?: (id: number) => void;
}

type Props = LoadingProps | NonLoadingProps;

function RelatedProductCard(props: Props) {
  if (props.loading) {
    return <Skeleton className="w-full h-[280px] rounded-2xl" />;
  }
  const Icon = props.selected ? IconCircleCheckFilled : IconCirclePlus;

  return (
    <article className="relative text-left">
      <div className="relative">
        <Image
          src={props.featuredImage}
          alt={props.title}
          width={800}
          height={800}
          className="w-full aspect-video object-cover rounded-2xl bg-white"
        />
        <Icon
          size={30}
          className="absolute bottom-3 right-3 text-white rounded-full cursor-pointer"
          onClick={() => props.onPlusClick?.(props.id)}
        />
      </div>
      <div className="py-2">
        <div>
          <h3 className="font-semibold break-all">{props.title}</h3>
          <p className="text-sm break-all">{props.tagline}</p>
        </div>
        {props.price && (
          <h4 className="font-semibold mt-1 break-all ">
            <span className="text-primary">$</span>
            {Number(props.price).toFixed(2)}/adult
          </h4>
        )}
      </div>
      {props.badge && <Badge className="absolute top-3 rounded-l-[2px]">{props.badge}</Badge>}
    </article>
  );
}

export default RelatedProductCard;
