import { ProductTag } from "@/types/product.types";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  tags: ProductTag[];
}

function ProductTags({ tags }: Props) {
  return (
    <div className="flex gap-3 flex-wrap">
      {tags.map((tag) => (
        <Link key={tag.id} href={`/search?tags=${tag.id}`}>
          <Badge className="text-sm">{tag.name}</Badge>
        </Link>
      ))}
    </div>
  );
}

export default ProductTags;
