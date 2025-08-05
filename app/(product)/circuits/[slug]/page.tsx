import React from "react";
import getProductDetails from "@/lib/utils/server/get-product-details";
import LocationCard from "@/app/(product)/_components/location-card";
import ProductDescription from "@/app/(product)/_components/product-description";
import ImpactCard from "@/app/(product)/_components/impact-card";
import ProductTypeCard from "../../_components/product-type-card";
import ProductOverview from "../../_components/product-overview";
import IconList from "../../_components/icon-list";
import ProductItineraryWithImage from "../../_components/product-itinerary-with-image";
import BookingForms from "../../_components/booking/booking-forms";
import BookingFormsMobile from "../../_components/booking/booking-forms-mobile";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

async function ProductDetail({ params }: Props) {
  const product = await getProductDetails(params.slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-5">
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
            <ProductDescription
              title={product.tagline}
              shortDescription={product.short_description}
              longDescription={product.description}
            />
            <ProductOverview data={product?.overview ?? []} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              <IconList
                title="What's Included"
                data={product.included}
                hideDescription
                maxItems={{
                  desktop: 4,
                  mobile: 4,
                }}
              />
              <IconList
                title="What To Bring"
                data={product?.what_to_bring ?? []}
                hideDescription
                maxItems={{
                  desktop: 4,
                  mobile: 4,
                }}
              />
            </div>
            <ImpactCard content={product.impact} />
          </section>
        </div>
        <aside className="hidden md:block sticky top-5 self-start">
          <BookingForms dateType="single" />
        </aside>
      </div>
      <ProductItineraryWithImage
        slug={params.slug}
        image={product.files.howToGet}
        data={
          product.itinerary?.map((i) => ({
            id: i.id,
            timeWindow: i.time_window,
            activity: i.activity,
          })) ?? []
        }
        dossier={product}
        updated_at={product.updated_at}
      />
      <BookingFormsMobile dateType="single" />
    </div>
  );
}

export default ProductDetail;
export const dynamic = "force-static";
