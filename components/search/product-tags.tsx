import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useProductSearchTags from "@/lib/hooks/use-product-search-tags";
import TagChip from "./tag-chip";

function ProductTags() {
  const { tags, isPending, selectTag, filter } = useProductSearchTags();

  return (
    <div className="flex gap-2 flex-wrap">
      {isPending
        ? Array.from({ length: 3 }).map((tag, index) => <Skeleton key={index} className="rounded-full w-20 h-9" />)
        : tags
            ?.slice(0, 3)
            ?.map((tag) => (
              <TagChip key={tag.id} tag={tag} selected={filter.tags.includes(tag.id)} selectTag={selectTag} />
            ))}
      {(tags?.length ?? 0) > 3 && (
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" className="rounded-full h-8 border-black bg-primary-light" size="sm">
              More
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-2 flex flex-wrap gap-2" align="end" side="bottom" sideOffset={10}>
            {tags?.slice(3)?.map((tag) => (
              <TagChip key={tag.id} tag={tag} selected={filter.tags.includes(tag.id)} selectTag={selectTag} />
            ))}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

export default ProductTags;
