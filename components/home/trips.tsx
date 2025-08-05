import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import ProductCard2 from "../product/product-card-2";
import { Product } from "@/types/product.types";

interface Props {
  data: Product[];
}

function Trips({ data }: Props) {
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
            <Link href="/circuits">
              <h2 className="font-bebas-neue text-3xl md:text-4xl whitespace-nowrap hover:text-primary transition-colors">
                Community Circuits
              </h2>
            </Link>
            <div className="flex gap-2 -mr-5 items-center max-[480px]:justify-between max-[480px]:w-full">
              <Link href="/circuits" className="font-semibold">
                View all
              </Link>
              <div>
                <CarouselPrevious className="static -translate-y-0 m-0 bg-gradient-orange text-white border-none mr-2" />
                <CarouselNext className="static -translate-y-0 m-0 bg-gradient-orange text-white border-none" />
              </div>
            </div>
          </div>
          <div className="mt-5 overflow-hidden -mx-5">
            <CarouselContent className="pr-8 lg:pr-14 cursor-grab select-none">
              {data.map((circuit, index) => (
                <CarouselItem className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-6 cursor-pointer" key={index}>
                  <ProductCard2
                    className="rounded-3xl"
                    id={circuit.id}
                    title={circuit.name}
                    rating={circuit.average_rating}
                    href={`/circuits/${circuit.slug}`}
                    images={[circuit.featuredImage, ...circuit.featuredImages]}
                    prices={circuit.prices}
                    location={circuit.location}
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

export default Trips;
