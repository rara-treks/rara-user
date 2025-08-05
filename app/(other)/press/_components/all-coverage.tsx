"use client";
import { Button } from "@/components/ui/button";
import useBlogs from "@/lib/hooks/use-blogs";
import { Blog } from "@/lib/utils/server/get-blogs";
import { PaginatedResponse } from "@/types/index.types";
import PressCard from "./press-card";

interface Props {
  coverage: PaginatedResponse<Blog>;
}

function AllCoverage({ coverage }: Props) {
  const { data, hasNextPage, isPending, fetchNextPage, isFetchingNextPage } = useBlogs({
    type: "mediaCoverage",
    initialData: coverage,
    perPage: 12,
  });

  return (
    <div className="py-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((coverage) => (
          <PressCard
            key={coverage.id}
            title={coverage.title}
            featuredImage={coverage.featured_image}
            description={coverage.short_description}
            mediaName={coverage.mediaName}
            link={coverage.slug}
            date={coverage.publish_date}
          />
        ))}
      </div>
      {hasNextPage && (
        <Button
          className="w-fit mx-auto bg-primary-mustard text-white border-none"
          variant="outline"
          loading={isPending || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </div>
  );
}

export default AllCoverage;
