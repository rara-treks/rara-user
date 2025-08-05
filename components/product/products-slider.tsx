import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "./product-card";
import { ProductPrice } from "@/types/product.types";

interface Props {
  title: string;
  products: {
    id: number;
    type: string;
    slug: string;
    title: string;
    images: string[];
    location: string;
    prices: ProductPrice[];
    rating: string | null;
    tagline: string;
  }[];
}

function ProductsSlider({ title, products }: Props) {
  return (
    <section className="rounded-2xl bg-secondary p-4 md:p-8 overflow-hidden">
      <Carousel
        className="overflow-visible cursor-grab select-none"
        opts={{
          skipSnaps: true,
        }}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
          <h2 className="font-bold text-xl">{title}</h2>
          <div className="flex gap-2">
            <CarouselPrevious className="static translate-y-0 disabled:text-primary text-white border-primary disabled:bg-white bg-primary" />
            <CarouselNext className="static translate-y-0 disabled:text-primary text-white border-primary disabled:bg-white bg-primary" />
          </div>
        </div>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={product.id}>
              <ProductCard
                title={product.title}
                href={`/${product.type}s/${product.slug}`}
                id={product.id}
                images={product.images}
                location={product.location}
                prices={product.prices}
                rating={product.rating}
                tagline={product.tagline}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default ProductsSlider;
