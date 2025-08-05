import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useProductSearchTags from "@/lib/hooks/use-product-search-tags";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import TagChip from "./tag-chip";

interface Props {
  className?: string;
}

function ProductTagsScrollView({ className }: Props) {
  const { tags, isPending, selectTag, filter } = useProductSearchTags();
  if (tags?.length === 0) return null;

  return (
    <ScrollArea className={cn("whitespace-nowrap", className)}>
      <div className="flex gap-2 pr-8">
        {isPending
          ? Array.from({ length: 8 }).map((tag, index) => <Skeleton key={index} className="rounded-full w-20 h-9" />)
          : tags?.map((tag) => (
              <TagChip key={tag.id} tag={tag} selected={filter.tags.includes(tag.id)} selectTag={selectTag} />
            ))}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
}

export default ProductTagsScrollView;
