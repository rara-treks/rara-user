import { Button } from "@/components/ui/button";
import { Tag } from "@/lib/hooks/use-product-search-tags";
import { cn } from "@/lib/utils";

function TagChip({ tag, selected, selectTag }: { tag: Tag; selected: boolean; selectTag: (tagId: number) => void }) {
  return (
    <Button
      className={cn("rounded-full h-8", selected ? "border-primary" : "bg-primary-light border-black")}
      variant={selected ? "default" : "outline"}
      size="sm"
      key={tag.id}
      onClick={() => selectTag(tag.id)}
    >
      {tag.name}
    </Button>
  );
}

export default TagChip;
