import React from "react";
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
import IconVerified from "../icons/verified";
import { ProductPrice } from "@/types/product.types";
import PriceTooltip from "./price-tooltip";

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
  location: string;
  prices: ProductPrice[];
  images: string[];
  rating: string | null;
  badge?: string;
  href: string;
  className?: string;
}

type Props = LoadingProps | NonLoadingProps;

function ProductCard(props: Props) {
  if (props.loading) {
    return <Skeleton className="w-full h-[340px] rounded-2xl" />;
  }

  return (
    <article
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
        <Link href={props.href} scroll>
          <div className="flex justify-between items-start">
            <h3 className="text-base font-bold break-words truncate" title={props.title}>
              {props.title}
            </h3>
          </div>
          <p className="text-xs md:truncate" title={props.tagline}>
            {props.tagline}
          </p>
          <h4 className="grid grid-cols-[16px_auto] gap-1 items-center text-sm my-2 font-medium">
            <IconMapPin size={16} />
            {props.location}
          </h4>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center whitespace-nowrap">
            {!!props.rating && (
              <>
                <IconStarFilled size={16} className="text-primary" />
                <p className="text-base text-gray-500 font-bold">{props.rating}</p>
                <IconVerified />
              </>
            )}
          </div>
          {/* {props.prices.length > 0 && (
            <div className="flex gap-1.5">
              <PriceTooltip prices={props.prices} />
              <h4 className="font-semibold text-xs whitespace-nowrap">
                <span className="font-bebas-neue font-normal text-xl">
                  ${Number(props.prices[0]?.discounted_price_usd ?? props.prices[0]?.original_price_usd).toFixed(2)}
                </span>{" "}
                <span>/adult</span>
              </h4>
            </div>
          )} */}
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

export default ProductCard;
