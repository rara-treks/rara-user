"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { format } from "date-fns";

interface Props {
  data: {
    title: string;
    slug: string;
    category: string;
    featured_image: string;
    publish_date: string;
  }[];
}

function MaosnryBlogGrid({ data }: Props) {
  return (
    <section>
      <ResponsiveMasonry columnsCountBreakPoints={{ 200: 1, 450: 2, 768: 3, 1024: 4, 1280: 5 }}>
        <Masonry gutter={"20px"}>
          {data.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`}>
              <article>
                <Image
                  className="w-full h-full object-cover rounded-2xl mb-2 border bg-white"
                  src={blog.featured_image}
                  alt={blog.title}
                  width={800}
                  height={800}
                />
                <div className="px-2">
                  <h3 className="font-semibold">{blog.title}</h3>
                  <p className="flex gap-2 items-center text-gray-600">{format(blog.publish_date, "MMMM d, yyyy")}</p>
                </div>
              </article>
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {data.length === 0 && <div className="text-center font-medium py-5">No Blogs Found</div>}
    </section>
  );
}

export default MaosnryBlogGrid;
