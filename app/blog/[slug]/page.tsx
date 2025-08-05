import getBlogDetails from "@/lib/utils/server/get-blog-details";
import React from "react";
import "./social-media-section.css";

interface Props {
  params: {
    slug: string;
  };
}

async function Page({ params }: Props) {
  const blog = await getBlogDetails(params.slug);

  return (
    <article
      className="prose max-w-full py-2 md:py-5 prose-img:bg-white overflow-hidden"
      dangerouslySetInnerHTML={{
        __html: blog?.description!,
      }}
    ></article>
  );
}

export default Page;
export const dynamic = "force-static";
