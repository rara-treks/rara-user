import React from "react";
import getProductDetails from "@/lib/utils/server/get-product-details";
import Breadcrumbs from "@/app/(product)/_components/breadcrumbs";
import ProductTags from "@/components/product/product-tags";
import RatingPreview from "@/components/product/rating-preview";
import ProductImagesMobile from "@/components/product/product-images-mobile";
import WishlistIcon from "@/components/product/wishlist-icon";
import FAQGrid from "@/components/product/faqs/faq-grid";
import BlogsGridCard from "@/components/blog/blogs-grid-card";
import getProductReviews from "@/lib/utils/server/get-product-reviews";
import CancellationPolicy from "@/app/(product)/_components/cancellation-policy";
import ProductImages from "@/components/product/product-images";
import ProductProvider from "./_hooks/product-provider";
import { notFound } from "next/navigation";
import ProductActionsButtons, { ShareIcon } from "./product-action-buttons";
import ProductsSlider from "@/components/product/products-slider";
import { NearbyHomestay, RelatedCircuit, RelatedExperience, RelatedPackage } from "@/types/product.types";
import ReviewsAndRatings from "./reviews-and-ratings";

interface Props {
  params: {
    productType: string;
    slug: string;
  };
  children: React.ReactNode;
}

function getRelatedProducts(
  products: NearbyHomestay[] | RelatedExperience[] | RelatedCircuit[] | RelatedPackage[],
  type: string
) {
  return products.map((product) => ({
    id: product.id,
    type,
    slug: product.slug,
    title: product.name,
    images: [product.featuredImage],
    location: product.location,
    prices: product.prices,
    rating: null,
    tagline: product.tagline,
  }));
}

async function Layout({ params, children }: Props) {
  const product = await getProductDetails(params.slug);
  if (!product) {
    notFound();
  }
  const reviewsData = await getProductReviews({
    slug: product.slug,
    perPage: 5,
  });
  const nearbyHomestays = getRelatedProducts(product.nearby_homestays, "homestay");
  const relatedExperiences = getRelatedProducts(product.related_experiences, "experience");
  const relatedCircuits = getRelatedProducts(product.related_circuit, "circuit");
  const relatedPackages = getRelatedProducts(product.related_package, "package");

  const relatedBlogs = product.related_blogs.map((blog) => ({
    slug: blog.slug,
    title: blog.title,
    featuredImage: blog.featuredImage,
    publishDate: blog.publish_date,
  }));

  return (
    <ProductProvider
      value={{
        ...product,
        included: [],
        amenities: [],
        what_to_bring: [],
      }}
    >
      <main className="text-black">
        <div className="relative md:hidden">
          <ProductImagesMobile
            gridImages={[product.files.featuredImage, ...product.files.featuredImages]}
            galleryImages={product.files.galleryImages}
          />
          <button className="absolute bottom-3 left-3 bg-white rounded-full p-1">
            <WishlistIcon productId={product.id} stroke={1.5} />
          </button>
          <ShareIcon
            id={product.id}
            title={product.name}
            tagline={product.tagline}
            image={product.files.featuredImage}
            className="absolute bottom-3 left-14"
          />
        </div>
        <div className="container max-w-7xl pt-4">
          <Breadcrumbs title={product.name} productType={params.productType} />
          <h1 className="text-3xl md:text-5xl mt-3 mb-1 font-bebas-neue">{product.name}</h1>
          <div className="flex flex-wrap gap-5 justify-between items-center mb-5">
            <div className="flex flex-wrap gap-5 items-center">
              <ProductTags tags={product.tags} />
              <RatingPreview
                averageRating={Number(product.average_rating)}
                totalRatings={Number(product.total_rating)}
              />
            </div>
            <ProductActionsButtons
              id={product.id}
              title={product.name}
              tagline={product.tagline}
              image={product.files.featuredImage}
            />
          </div>
          <ProductImages
            gridImages={[product.files.featuredImage, ...product.files.featuredImages]}
            galleryImages={product.files.galleryImages}
          />
          {children}
          <div className="flex flex-col gap-10 my-10">
            {/* <CancellationPolicy content={product.cancellation_policy ?? ""} /> */}
            {reviewsData && (
              <ReviewsAndRatings
                initialData={reviewsData}
                product={{
                  id: product.id,
                  slug: product.slug,
                }}
              />
            )}
            {params.productType === "homestay" && nearbyHomestays.length > 0 && (
              <ProductsSlider title="Nearby homestays" products={nearbyHomestays} />
            )}
            {params.productType === "experience" && relatedExperiences.length > 0 && (
              <ProductsSlider title="Related Experiences" products={relatedExperiences} />
            )}
            {params.productType === "circuit" && relatedCircuits.length > 0 && (
              <ProductsSlider title="Related Circuits" products={relatedCircuits} />
            )}
            {params.productType === "package" && relatedPackages.length > 0 && (
              <ProductsSlider title="Related Packages" products={relatedPackages} />
            )}
            {product.faqs.length > 0 && <FAQGrid title="Frequently Asked Questions" faqs={product.faqs} />}
          </div>
        </div>
        <div className="container pb-8">
          {product.related_blogs.length > 0 && (
            <BlogsGridCard
              title="Related Blogs"
              blogs={relatedBlogs}
              className="[&_h2]:font-bebas-neue [&_h2]:font-normal [&_h2]:text-2xl md:[&_h2]:text-3xl"
            />
          )}
        </div>
      </main>
    </ProductProvider>
  );
}

export default Layout;
