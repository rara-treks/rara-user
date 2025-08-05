"use client";
import BlogCategoriesTabs from "@/components/blog/blog-categories-tabs";
import BlogSearch from "@/components/blog/blog-search";
import { Button } from "@/components/ui/button";
import useBlogs from "@/lib/hooks/use-blogs";
import { BlogCategory } from "@/lib/utils/server/get-blog-categories";
import { Blog } from "@/lib/utils/server/get-blogs";
import { PaginatedResponse } from "@/types/index.types";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
const MaosnryBlogGrid = dynamic(() => import("@/components/blog/masonry-blog-grid"), { ssr: false });

interface Props {
  blogs: PaginatedResponse<Blog>;
  categories: BlogCategory[];
}

function AllBlogs({ blogs, categories }: Props) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const query = searchParams.get("q");
  const { data, hasNextPage, isPending, fetchNextPage, isFetchingNextPage } = useBlogs({
    initialData: blogs,
    categoryId,
    query,
  });

  return (
    <div className="py-8 flex flex-col gap-6">
      <BlogSearch />
      <BlogCategoriesTabs data={categories} activeCategoryId={categoryId ? Number(categoryId) : undefined} />
      <MaosnryBlogGrid data={data} />
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

export default AllBlogs;
