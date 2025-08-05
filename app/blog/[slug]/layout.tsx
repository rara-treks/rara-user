import React from "react";
import Header from "./_components/header";
import getBlogDetails from "@/lib/utils/server/get-blog-details";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Sidebar from "./_components/sidebar";
import VerticalDivider from "./_components/vertical-divider";
import getBlogs from "@/lib/utils/server/get-blogs";
import BlogsGridCardWithLoadMore from "@/components/blog/blogs-grid-card-with-load-more";
import MobileFloatingMenu from "@/components/mobile-floating-menu";

interface Props {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogDetails(params.slug);

  return {
    title: blog?.meta.metaTitle,
    description: blog?.meta.metaDescription,
    keywords: blog?.meta.keywords,
    openGraph: {
      images: blog?.featured_image ? [{ url: blog?.featured_image }] : [],
    },
  };
}

async function Layout({ params, children }: Props) {
  const blog = await getBlogDetails(params.slug);
  if (!blog) {
    notFound();
  }
  const relatedBlogs = await getBlogs({
    filters: {
      type: "blog",
      categoryId: String(blog.category.id),
    },
    perPage: 4,
  });

  return (
    <main>
      <div className="container py-8">
        <Header data={blog} />
        <div className="grid lg:grid-cols-[2fr_50px_300px] gap-4 py-5 lg:px-3">
          {children}
          <VerticalDivider />
          <Sidebar data={blog} />
        </div>
        {relatedBlogs && (
          <BlogsGridCardWithLoadMore
            title="Checkout More Blogs From Us"
            blogs={relatedBlogs}
            categoryId={String(blog.category.id)}
            keys={[blog.slug]}
          />
        )}
        <MobileFloatingMenu />
      </div>
    </main>
  );
}

export default Layout;
export const dynamic = "force-static";
