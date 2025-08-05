import { BlogCategory } from "@/lib/utils/server/get-blog-categories";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import TextWithBrandmark from "../text-with-brandmark";
import { cn } from "@/lib/utils";

interface Props {
  data: BlogCategory[];
  activeCategoryId?: number;
  className?: string;
}

function BlogCategoriesTabs({ data, activeCategoryId, className }: Props) {
  return (
    <section className={className}>
      <div className="flex flex-col gap-4">
        <TextWithBrandmark className="justify-center" size={60}>
          Categories
        </TextWithBrandmark>
        <div>
          <ul className="flex gap-3 flex-wrap justify-center">
            <li>
              <Link href="/blog" scroll={false} shallow>
                <Badge
                  className={cn("text-base", activeCategoryId ? "bg-primary-light border-black" : "border-primary")}
                  variant={!activeCategoryId ? "default" : "outline"}
                >
                  All
                </Badge>
              </Link>
            </li>
            {data.map((category) => {
              return <Category category={category} activeCategoryId={activeCategoryId} key={category.id} />;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BlogCategoriesTabs;

function Category({ category, activeCategoryId }: { category: BlogCategory; activeCategoryId: number | undefined }) {
  return (
    <li key={category.id}>
      <Link
        href={{
          pathname: "/blog",
          query: {
            category: category.id,
          },
        }}
        scroll={false}
      >
        <Badge
          className={cn(
            "text-base",
            activeCategoryId === category.id ? "border-primary" : "bg-primary-light border-black"
          )}
          variant={activeCategoryId === category.id ? "default" : "outline"}
        >
          {category.name}
        </Badge>
      </Link>
    </li>
  );
}
