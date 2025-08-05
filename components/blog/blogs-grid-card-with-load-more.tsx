"use client";
import BlogCard2 from "@/components/blog/blog-card-2";
import { Button } from "@/components/ui/button";
import useBlogs from "@/lib/hooks/use-blogs";
import { Blog } from "@/lib/utils/server/get-blogs";
import { PaginatedResponse } from "@/types/index.types";
import React from "react";

interface Props {
  title: string;
  blogs: PaginatedResponse<Blog>;
  categoryId?: string;
  keys?: string[];
}

function BlogsGridCardWithLoadMore({ title, blogs, categoryId, keys }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useBlogs({
    initialData: blogs,
    categoryId,
    perPage: 4,
    keys,
  });

  return (
    <section className="p-4 md:p-8 rounded-2xl bg-muted">
      <div className="flex justify-between">
        <h4 className="font-bebas-neue text-2xl md:text-3xl mb-6">{title}</h4>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-5">
        {data.map((blog, index) => (
          <BlogCard2
            key={index}
            title={blog.title}
            featuredImage={blog.featured_image}
            publishDate={blog.publish_date}
            slug={blog.slug}
          />
        ))}
      </div>
      {hasNextPage && (
        <Button
          className="w-fit mx-auto block bg-primary-mustard text-white border-none"
          variant="outline"
          loading={isPending || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </section>
  );
}

export default BlogsGridCardWithLoadMore;
