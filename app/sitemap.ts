import server from "@/lib/server";
import type { MetadataRoute } from "next";

interface Blogs {
  data: {
    slug: string;
    updatedAt: string;
  }[];
}

interface Products {
  data: {
    slug: string;
    updatedAt: string;
    type: string;
  }[];
}

const pages = [
  {
    url: `${process.env.SITE_ORIGIN}/`,
    priority: 1,
  },
  {
    url: `${process.env.SITE_ORIGIN}/search`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/homestays`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/experiences`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/circuits`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/packages`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/blog`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/about`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/contact`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/impact`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/partner-with-us`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/safety`,
    priority: 0.8,
  },
  {
    url: `${process.env.SITE_ORIGIN}/media-coverage`,
    priority: 0.8,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await server.get<Blogs>("/blog/slug-list");
  const products = await server.get<Products>("/product/slug-list");

  return [
    ...pages.map((page) => ({
      url: page.url,
      priority: page.priority,
    })),
    ...blogs.data.data.map((blog) => ({
      url: `${process.env.SITE_ORIGIN}/blog/${blog.slug}`,
      lastModified: blog.updatedAt,
      priority: 0.5,
    })),
    ...products.data.data.map((product) => ({
      url: `${process.env.SITE_ORIGIN}/${product.type}s/${product.slug}`,
      lastModified: product.updatedAt,
      priority: 0.5,
    })),
  ];
}

export const revalidate = 86400;
