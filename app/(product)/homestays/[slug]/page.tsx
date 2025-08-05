import React from "react";
import getProductDetails from "@/lib/utils/server/get-product-details";
import LocationCard from "@/app/(product)/_components/location-card";
import MeetTheHostCard from "@/app/(product)/_components/meet-the-host-card";
import ProductDescription from "@/app/(product)/_components/product-description";
import ProductHighlights from "@/app/(product)/_components/product-highlights";
import ImpactCard from "@/app/(product)/_components/impact-card";
import BookingForms from "../../_components/booking/booking-forms";
import RelatedProducts from "../../_components/related-products";
import IconList from "../../_components/icon-list";
import HowToGetHere from "../../_components/how-to-get-here";
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
  const relatedExperiences = product.related_experiences.map((experience) => ({
    id: experience.id,
    title: experience.name,
    featuredImage: experience.featuredImage,
    tagline: experience.tagline,
    price: experience.prices[0]?.discounted_price_usd ?? experience.prices[0]?.original_price_usd,
    prices: experience.prices,
  }));

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[70%_1fr] gap-5 mt-5"
    >
      <div className="flex flex-col gap-10">
        <section className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 items-center gap-5 md:w-fit *:h-full">
          <LocationCard
            title={product.location}
            sideImage={product.files.locationCover}
            latitude={product.latitude}
            longitude={product.longitude}
          />
          <MeetTheHostCard
            sideImage={product.files.hostCover}
            hosts={product.hosts}
          />
        </section>
        <section className="flex flex-col gap-10">
          <IconList
            className="md:[&_.icon-list-item]:ml-5"
            title="What's Included"
            data={product.included}
            maxItems={{
              desktop: 4,
              mobile: 4,
            }}
          />
          <ProductDescription
            title={product.tagline}
            shortDescription={product.short_description}
            longDescription={product.description}
          />
          <ProductHighlights
            title="Homestay Highlights"
            highlights={product.highlights}
          />
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
          <RelatedProducts
            id="activities"
            title="Things to do and celebrations near this homestay"
            products={relatedExperiences}
          />
          <ImpactCard content={product.impact} />
          <HowToGetHere
            content={product.how_to_get}
            sideImage={product.files.howToGet}
          />
        </section>
      </div>
      <aside className="hidden md:block sticky top-5 self-start">
        <BookingForms />
      </aside>
      <BookingFormsMobile />
    </div>
  );
}

export default ProductDetail;
export const dynamic = "force-static";
