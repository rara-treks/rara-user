import React from "react";
import Layout from "../../_components/layout";
import getProductDetails from "@/lib/utils/server/get-product-details";
import { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductDetails(params.slug);

  return {
    title: product?.meta.metaTitle,
    description: product?.meta.metaDescription,
    keywords: product?.meta.keywords,
    openGraph: {
      images: product?.files.featuredImage ? [{ url: product?.files.featuredImage }] : [],
    },
  };
}

function ProductLayout({ children, params }: Props) {
  return (
    <Layout
      params={{
        productType: "package",
        slug: params.slug,
      }}
    >
      {children}
    </Layout>
  );
}

export default ProductLayout;
export const dynamic = "force-static";
