import React from "react";
import getProductDetails from "@/lib/utils/server/get-product-details";
import LocationCard from "@/app/(product)/_components/location-card";
import ProductDescription from "@/app/(product)/_components/product-description";
import ProductHighlights from "@/app/(product)/_components/product-highlights";
import ImpactCard from "@/app/(product)/_components/impact-card";
import ProductTypeCard from "../../_components/product-type-card";
import ProductItinerary from "../../_components/product-itinerary";
import IconList from "../../_components/icon-list";
import HowToGetHere from "../../_components/how-to-get-here";
import BookingForms from "../../_components/booking/booking-forms";
import BookingFormsMobile from "../../_components/booking/booking-forms-mobile";
import { notFound } from "next/navigation";

interface Props {
  params: {
    productType: string;
    slug: string;
  };
}

async function ProductDetail({ params }: Props) {
  const product = await getProductDetails(params.slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 mt-5">
      <div className="flex flex-col gap-10">
        <section className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 items-center gap-5 md:w-fit *:h-full">
          <LocationCard
            title={product.location}
            sideImage={product.files.locationCover}
            latitude={product.latitude}
            longitude={product.longitude}
          />
          <ProductTypeCard type={product.type} />
        </section>
        <section className="flex flex-col gap-10">
          <IconList
            title="What's Included"
            data={product.included}
            maxItems={{
              desktop: 4,
              mobile: 4,
            }}
          />
          <ProductItinerary
            data={
              product.itinerary?.map((i) => ({
                id: i.id,
                timeWindow: i.time_window,
                activity: i.activity,
              })) ?? []
            }
          />
          <ProductDescription
            title={product.tagline}
            shortDescription={product.short_description}
            longDescription={product.description}
          />
          <ProductHighlights title="Package Highlights" highlights={product.highlights} />
          <IconList
            className="md:[&_.items-container]:grid-cols-2"
            title="Property Amenities"
            hideDescription
            data={product.amenities}
            maxItems={{
              desktop: 8,
              mobile: 4,
            }}
          />
          <ImpactCard content={product.impact} />
          <HowToGetHere content={product.how_to_get} sideImage={product.files.howToGet} />
        </section>
      </div>
      <aside className="hidden md:block sticky top-5 self-start">
        <BookingForms dateType="single" />
      </aside>
      <BookingFormsMobile dateType="single" />
    </div>
  );
}

export default ProductDetail;
export const dynamic = "force-static";
