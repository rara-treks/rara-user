import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import ProductCard3 from "../product/product-card-3";
import { Product } from "@/types/product.types";

interface Props {
  data: Product[];
}

function Packages({ data }: Props) {
  if (data.length === 0) return null;
  return (
    <section>
      <Carousel
        opts={{
          skipSnaps: true,
          slidesToScroll: 2,
          breakpoints: {
            "(max-width: 460px)": {
              skipSnaps: false,
              slidesToScroll: 1,
            },
          },
        }}
      >
        <div>
          <div className="flex max-[480px]:flex-col justify-between min-[481px]:items-center flex-wrap gap-y-3">
            <Link href="/packages">
              <h2 className="font-bebas-neue text-3xl md:text-4xl whitespace-nowrap hover:text-primary transition-colors">
                Community Packages
              </h2>
            </Link>
            <div className="flex gap-2 -mr-5 items-center max-[480px]:justify-between max-[480px]:w-full">
              <Link href="/packages" className="font-semibold">
                View all
              </Link>
              <div>
                <CarouselPrevious className="static -translate-y-0 m-0 bg-gradient-orange text-white border-none mr-2" />
                <CarouselNext className="static -translate-y-0 m-0 bg-gradient-orange text-white border-none" />
              </div>
            </div>
          </div>
          <div className="mt-5 overflow-hidden -mx-5">
            <CarouselContent className="pr-14 lg:pr-24 cursor-grab select-none">
              {data.map((product, index) => (
                <CarouselItem
                  className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pb-2 *:shadow-card-2 pl-6 cursor-pointer"
                  key={index}
                >
                  <ProductCard3
                    className="rounded-3xl [&_img]:rounded-3xl"
                    id={product.id}
                    title={product.name}
                    tagline={product.tagline}
                    rating={product.average_rating}
                    href={`/packages/${product.slug}`}
                    images={[product.featuredImage, ...product.featuredImages]}
                    location={product.location}
                    prices={product.prices}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </div>
      </Carousel>
    </section>
  );
}

export default Packages;
