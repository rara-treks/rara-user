import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  featured_image: string;
  slug: string;
  className?: string;
}

function BlogListCard({ title, featured_image, slug, className }: Props) {
  return (
    <Link href={`/blog/${slug}`} className={cn(className)}>
      <article className="flex gap-4 items-start justify-start">
        <Image
          className="w-32 h-32 rounded-2xl object-cover bg-white"
          src={featured_image}
          alt={title}
          width={500}
          height={500}
        />
        <div>
          <h2 className="font-semibold mt-2">{title}</h2>
        </div>
      </article>
    </Link>
  );
}

export default BlogListCard;
