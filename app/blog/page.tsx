import BlogGrid from "@/components/blog/blog-grid";
import getBlogCategories from "@/lib/utils/server/get-blog-categories";
import getBlogs from "@/lib/utils/server/get-blogs";
import getHomeBlogs from "@/lib/utils/server/get-home-blogs";
import { Metadata } from "next";
import React, { Suspense } from "react";
import AllBlogs from "./_components/all-blogs";
import MediaCoverage from "@/components/blog/media-coverage";
import TextWithBrandmark from "@/components/text-with-brandmark";
import getHomeMediaCoverage from "@/lib/utils/server/get-home-media-coverage";
import MobileFloatingMenu from "@/components/mobile-floating-menu";

interface Props {
  searchParams: {
    category?: string;
    q?: string;
  };
}

export const metadata: Metadata = {
  title: "Community Homestay Network - Blogs",
  description: "Browse blog posts on Community Homestay Network",
  keywords: ["blog", "community", "homestay", "chn community", "chn", "community homestay network"],
};

async function Blogs({ searchParams }: Props) {
  const blogs = await getBlogs({
    filters: {
      type: "blog",
      categoryId: searchParams?.category!,
      search: searchParams?.q,
    },
  });
  const homeBlogs = await getHomeBlogs();
  const categories = await getBlogCategories();
  const mediaCoverage = await getHomeMediaCoverage();

  return (
    <main>
      <div className="py-8 container">
        <BlogGrid data={homeBlogs ?? []} />
        <Suspense>{blogs && <AllBlogs blogs={blogs} categories={categories ?? []} />}</Suspense>
        <section>
          {/* <TextWithBrandmark size={60} className="justify-center mb-6">
            Mentions
          </TextWithBrandmark> */}
          <MediaCoverage data={mediaCoverage?.slice(0, 5) ?? []} />
        </section>
      </div>
      <MobileFloatingMenu />
    </main>
  );
}

export default Blogs;
