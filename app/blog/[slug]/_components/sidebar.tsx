import ProductCard from "@/components/product/product-card";
import ShareIcons from "@/components/share-icons";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/lib/utils/server/get-blog-details";
import React from "react";

interface Props {
  data: Blog;
}

function Sidebar({ data }: Props) {
  return (
    <aside className="flex flex-col gap-4 md:gap-8 py-5">
      <div>
        <h4 className="font-bebas-neue text-2xl mb-2">Share</h4>
        <ShareIcons
          size={30}
          shareData={{
            title: data.title,
            text: data.short_description,
            fileUrl: data.featured_image ?? undefined,
          }}
        />
      </div>
      {data.meta.keywords.length > 0 && (
        <div>
          <h4 className="font-bebas-neue text-2xl mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {data.meta.keywords.map((keyword, index) => (
              <Badge key={index} className="font-medium text-base">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {data.related_products.length > 0 && (
        <div>
          <h4 className="font-bebas-neue text-2xl mb-2">Must visit</h4>
          <div className="flex flex-wrap gap-5">
            {data.related_products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.name}
                tagline={product.tagline}
                href={`/${product.type}s/${product.slug}`}
                images={[product.featuredImage]}
                location={product.location}
                prices={product.prices}
                rating={product.average_rating}
              />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
