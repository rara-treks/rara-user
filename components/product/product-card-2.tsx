import React, { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
  location: string;
  images: string[];
  rating: string | null;
  badge?: string;
  prices: ProductPrice[];
  href: string;
  className?: string;
}

type Props = LoadingProps | NonLoadingProps;

function ProductCard2(props: Props) {
  if (props.loading) {
    return <Skeleton className="w-full h-[340px] rounded-2xl" />;
  }

  const closestPrice = useMemo(() => calculatePrice(4, props.prices), []);

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
                  className="aspect-[4/2.7] object-cover bg-gray-100"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Link>
        <CarouselPrevious className="top-1/3 left-2 md:opacity-0 disabled:!opacity-0 transition-opacity" />
        <CarouselNext className="top-1/3 right-2 md:opacity-0 disabled:!opacity-0 transition-opacity" />
      </Carousel>
      <div className="flex flex-col gap-2 p-3 absolute bottom-2 left-2 right-2 bg-white rounded-2xl">
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
        </Link>
        <div className="flex flex-col gap-1 justify-between">
          <h4 className="grid grid-cols-[16px_auto] gap-1 items-center text-sm truncate">
            <IconMapPin size={16} />
            {props.location}
          </h4>
          {/* {props.prices.length > 0 && (
            <div className="flex gap-1.5">
              <PriceTooltip prices={props.prices} />
              <h4 className="font-semibold text-xs">
                <span className="font-bebas-neue font-normal text-xl">
                  ${Number((closestPrice.discounted ?? closestPrice.original) / 4).toFixed(2)}/
                </span>
                adult (Size of 4 person group)
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

export default ProductCard2;
