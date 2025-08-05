// "use client";
// import { Button } from "@/components/ui/button";
// import useBlogs from "@/lib/hooks/use-blogs";
// import { Blog } from "@/lib/utils/server/get-blogs";
// import { PaginatedResponse } from "@/types/index.types";
// import PressCard from "./press-card";

// interface Props {
//   coverage: PaginatedResponse<Blog>;
// }

// function AllCoverage({ coverage }: Props) {
//   const { data, hasNextPage, isPending, fetchNextPage, isFetchingNextPage } = useBlogs({
//     type: "mediaCoverage",
//     initialData: coverage,
//     perPage: 12,
//   });

//   return (
//     <div className="py-8 flex flex-col gap-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {data.map((coverage) => (
//           <PressCard
//             key={coverage.id}
//             title={coverage.title}
//             featuredImage={coverage.featured_image}
//             description={coverage.short_description}
//             mediaName={coverage.mediaName}
//             link={coverage.slug}
//             date={coverage.publish_date}
//           />
//         ))}
//       </div>
//       {hasNextPage && (
//         <Button
//           className="w-fit mx-auto bg-primary-mustard text-white border-none"
//           variant="outline"
//           loading={isPending || isFetchingNextPage}
//           onClick={() => fetchNextPage()}
//         >
//           Load more
//         </Button>
//       )}
//     </div>
//   );
// }

// export default AllCoverage;
"use client";

import { useState, useRef, useEffect } from "react";
import { MediaCoverage as MediaCoverageType } from "@/lib/utils/server/get-home-media-coverage";
import MediaCoverageCard from "@/components/blog/media-coverage-card";
import { Button } from "@/components/ui/button";

interface Props {
  data?: MediaCoverageType[];
}

function AllCoverage({ data = [] }: Props) {
  if (!data || data.length === 0) return null;

  const [itemsToShow, setItemsToShow] = useState(12);
  const [animatingItems, setAnimatingItems] = useState<MediaCoverageType[]>([]);
  const visibleData = data.slice(0, itemsToShow - animatingItems.length);
  const hasMoreItems = itemsToShow < data.length;

  useEffect(() => {
    if (animatingItems.length > 0) {
      const timer = setTimeout(() => {
        setAnimatingItems([]);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [animatingItems]);

  const handleLoadMore = () => {
    const nextBatch = data.slice(itemsToShow, itemsToShow + 12);
    setAnimatingItems(nextBatch);
    setItemsToShow((prevCount) => prevCount + 12);
  };

  return (
    <div className="py-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {visibleData.map((coverage, index) => (
          <div key={`visible-${index}`}>
            <MediaCoverageCard
              title={coverage.title}
              mediaImage={coverage.media_image}
              mediaName={coverage.media_name}
              featuredImage={coverage.featured_image}
              link={coverage.link}
            />
          </div>
        ))}

        {animatingItems.map((coverage, index) => (
          <div
            key={`animating-${index}`}
            className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out"
            style={{
              animation: `fadeInUp 500ms ease-out forwards ${index * 100}ms`,
            }}
          >
            <MediaCoverageCard
              title={coverage.title}
              mediaImage={coverage.media_image}
              mediaName={coverage.media_name}
              featuredImage={coverage.featured_image}
              link={coverage.link}
            />
          </div>
        ))}
      </div>

      {hasMoreItems && (
        <div className="flex justify-center mt-8">
          <Button
            className="w-fit mx-auto bg-primary-mustard text-white border-none"
            onClick={handleLoadMore}
            disabled={animatingItems.length > 0}
          >
            {animatingItems.length > 0 ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

    </div>
  );
}

export default AllCoverage;