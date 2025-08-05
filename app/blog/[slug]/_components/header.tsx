import { Badge } from "@/components/ui/badge";
import { Blog } from "@/lib/utils/server/get-blog-details";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: Blog;
}

function Header({ data }: Props) {
  return (
    <header className="flex flex-col gap-4">
      <h1 className="font-bebas-neue text-3xl md:text-4xl">{data.title}</h1>
      <div
        className="font-medium"
        dangerouslySetInnerHTML={{
          __html: data.short_description,
        }}
      ></div>
      <div className="flex gap-2 flex-wrap mb-1">
        <p>
          By <span className="text-primary font-medium">{data.author.name}</span>
        </p>
        <p>({format(data.publish_date, "MMMM d, yyyy")})</p> |
        <Link
          href={{
            pathname: "/blog",
            query: {
              category: data.category.id,
            },
          }}
        >
          <Badge>{data.category.name}</Badge>
        </Link>
      </div>
      {data.featured_image && (
        <Image
          className="w-full h-[250px] md:h-[400px] object-cover rounded-2xl border bg-white"
          src={data.featured_image}
          width={1000}
          height={1000}
          alt={data.title}
        />
      )}
    </header>
  );
}

export default Header;
