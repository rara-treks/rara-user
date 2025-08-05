"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import RelatedProductCard from "@/components/product/related-product-card";
import useBooking from "./_hooks/use-booking";
import { ProductPrice } from "@/types/product.types";
import { cn } from "@/lib/utils";

interface Props {
  id?: string;
  title: string;
  products: {
    id: number;
    title: string;
    featuredImage: string;
    tagline: string;
    prices: ProductPrice[];
  }[];
  className?: string;
}

function RelatedProducts({ id, title, products, className }: Props) {
  const { setData, additionalProducts } = useBooking();
  if (products.length === 0) return null;

  function handleAddToCart(id: number) {
    if (additionalProducts.includes(id)) {
      setData({
        additionalProducts: additionalProducts.filter((product) => product !== id),
      });
    } else {
      setData({
        additionalProducts: [...additionalProducts, id],
      });
    }
  }

  return (
    <section id={id} className={cn("overflow-hidden max-sm:-mx-5", className)}>
      <Carousel
        className="overflow-visible *:overflow-visible pr-10 lg:pr-20 cursor-grab select-none"
        opts={{
          skipSnaps: true,
        }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4 -mr-10 lg:-mr-20 max-sm:px-5 header">
          <h2 className="font-bold text-xl">{title}</h2>
          <div className="hidden md:flex md:gap-2">
            <CarouselPrevious className="static translate-y-0 disabled:text-primary text-white border-primary disabled:bg-white bg-primary" />
            <CarouselNext className="static translate-y-0 disabled:text-primary text-white border-primary disabled:bg-white bg-primary" />
          </div>
        </div>
        <CarouselContent className="-ml-5">
          {products.map((product) => (
            <CarouselItem className="sm:basis-1/2 md:basis-full lg:basis-1/2 pl-6" key={product.id}>
              <RelatedProductCard
                id={product.id}
                title={product.title}
                tagline={product.tagline}
                price={product.prices[0]?.discounted_price_usd ?? product.prices[0]?.original_price_usd}
                featuredImage={product.featuredImage}
                onPlusClick={handleAddToCart}
                selected={additionalProducts.includes(product.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default RelatedProducts;
