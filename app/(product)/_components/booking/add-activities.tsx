import React, { useMemo } from "react";
import RelatedProducts from "../related-products";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import { IconArrowDown } from "@tabler/icons-react";
import { useProduct } from "../_hooks/product-provider";

function AddActivities() {
  const product = useProduct();
  const relatedHomestays = useMemo(() => {
    return product.related_experiences.map((homestay) => ({
      id: homestay.id,
      title: homestay.name,
      featuredImage: homestay.featuredImage,
      tagline: homestay.tagline,
      prices: homestay.prices,
    }));
  }, []);
  if (product.type !== "homestay") return null;

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <button className="mb-3 w-fit block">
          <Link
            className="flex gap-1 items-center text-left pointer-events-none md:pointer-events-auto"
            href="#activities"
          >
            Add Activities <IconArrowDown size={16} />
          </Link>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="md:hidden py-2">
        <RelatedProducts className="[&_.header]:hidden !mx-0" title="Recommended to stay" products={relatedHomestays} />
      </CollapsibleContent>
    </Collapsible>
  );
}

export default AddActivities;
