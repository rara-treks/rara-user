import React, { useMemo, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { IconMapPin, IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import WishlistIcon from "./wishlist-icon";
import { cn } from "@/lib/utils";
import { ProductPrice } from "@/types/product.types";
import IconVerified from "../icons/verified";
import PriceTooltip from "./price-tooltip";
import { calculatePrice } from "@/lib/utils/calculate-price";

interface BaseProps {
  loading?: boolean;
}

interface LoadingProps extends BaseProps {
  loading: true;
}

interface NonLoadingProps extends BaseProps {
  id: number;
  title: string;
  type: string;
  tagline: string;
  location: string;
  prices: ProductPrice[];
  images: string[];
  rating: string | null;
  badge?: string;
  href: string;
  className?: string;
  button?: React.ReactNode;
}

type Props = LoadingProps | NonLoadingProps;

const specialProductType = ["circuit", "package"];

function ProductCard4(props: Props) {
  if (props.loading) {
    return <Skeleton className="w-full h-[315px] rounded-2xl block" />;
  }
  const isSpecialProduct = specialProductType.includes(props.type);
  const closestPriceFor4 = useMemo(() => {
    const price = calculatePrice(4, props.prices);
    return (price.discounted ?? price.original) / 4;
  }, []);
  const normalPrice = props.prices[0]?.discounted_price_usd ?? props.prices[0]?.original_price_usd;

  return (
    <article
      id={`product-${props.id}`}
      className={cn(
        "relative rounded-2xl overflow-hidden border h-fit bg-background",
        "[&:hover_.carousel-nav-btn]:opacity-100",
        props?.className
      )}
    >
      <Carousel
        className="[&_div]:pointer-events-none"
        opts={{
          skipSnaps: true,
        }}
      >
        <Link href={props.href}>
          <CarouselContent>
            {props.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image}
                  alt={props.title}
                  width={800}
                  height={800}
                  className="aspect-[4/2.5] object-cover border-b pointer-events-none bg-gray-100"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Link>
        <CarouselDots />
        <CarouselPrevious className="left-2 md:opacity-0 disabled:!opacity-0 transition-opacity" />
        <CarouselNext className="right-2 md:opacity-0 disabled:!opacity-0 transition-opacity" />
      </Carousel>
      <div className="p-3">
        <Link href={props.href}>
          <div className="flex justify-between items-start">
            <h3 className="text-base font-bold break-words truncate" title={props.title}>
              {props.title}
            </h3>
            <div className="flex gap-1 items-center whitespace-nowrap">
              {!!props.rating && (
                <>
                  <IconStarFilled size={16} className="text-primary" />
                  <p className="text-base text-gray-500 font-bold">{props.rating}</p>
                  <IconVerified />
                </>
              )}
            </div>
          </div>
          <p className="text-xs md:truncate" title={props.tagline}>
            {props.tagline ?? "_"}
          </p>
          <h4 className="grid grid-cols-[16px_auto] gap-1 items-center text-sm my-2 truncate font-medium">
            <IconMapPin className="text-red-500" size={16} />
            {props.location}
          </h4>
        </Link>
        <div className={cn("flex justify-between gap-1.5 items-center", isSpecialProduct && "flex-col items-stretch")}>
          {props.prices.length > 0 && (
            <div className="flex gap-1.5">
              <h4 className="font-semibold">
                ${Number(isSpecialProduct ? closestPriceFor4 : normalPrice).toFixed(2)}
                <span className="text-sm">/adult {isSpecialProduct && "(Size of 4 person group)"}</span>
              </h4>
              <PriceTooltip prices={props.prices} />
            </div>
          )}
          {props.button}
        </div>
      </div>
      {props.badge && <Badge className="absolute top-3 rounded-l-[2px]">{props.badge}</Badge>}
      <WishlistIcon
        productId={props.id}
        size={28}
        className="absolute top-3 right-3 cursor-pointer text-muted-foreground bg-white rounded-full p-1 border"
      />
    </article>
  );
}

export default ProductCard4;
