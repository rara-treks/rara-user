import { cn } from "@/lib/utils";
import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  featuredImage: string;
  publishDate: string;
  slug: string;
  className?: string;
}

function BlogCard2({ title, featuredImage, publishDate, slug, className }: Props) {
  return (
    <article className={cn("flex flex-col gap-4", className)}>
      <Link href={`/blog/${slug}`}>
        <Image
          className="aspect-[4/2.5] object-cover rounded-2xl bg-white"
          width={800}
          height={800}
          src={featuredImage}
          alt={title}
        />
      </Link>
      <div>
        <Link href={`/blog/${slug}`}>
          <h3 className="md:text-lg font-semibold">{title}</h3>
        </Link>
        <div className="flex gap-2 items-center text-gray-500">
          <IconCalendar size={20} />
          <p>{format(publishDate, "MMM dd, yyyy")}</p>
        </div>
      </div>
    </article>
  );
}

export default BlogCard2;
