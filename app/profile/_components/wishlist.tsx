"use client";
import ProductCard from "@/components/product/product-card";
import useWishlist from "@/lib/hooks/use-wishlist";
import React from "react";

function Wishlist() {
  const { wishlist, isPending } = useWishlist();

  return (
    <section className="bg-white">
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {isPending && Array.from({ length: 3 }).map((_, index) => <ProductCard key={`loading-${index}`} loading />)}
        {wishlist?.map((product) => (
          <ProductCard
            className="shadow-sm h-full"
            key={product.id}
            id={product.id}
            title={product.name}
            tagline={product.tagline}
            images={[product.featuredImage]}
            location={product.location}
            prices={product.prices}
            rating={product.average_rating}
            href={`/${product.type}s/${product.slug}`}
          />
        ))}
      </div>
      {wishlist?.length === 0 && (
        <div className="w-full h-full flex justify-center items-center py-5">No Products Found</div>
      )}
    </section>
  );
}

export default Wishlist;
