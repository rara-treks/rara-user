import getProductDetails from "@/lib/utils/server/get-product-details";
import Details from "./details";
import { notFound } from "next/navigation";

interface Dossier {
  id: number;
  content: string;
  pdf_file: string | null;  
}

interface ProductWithDossier {
  slug: string;
  name: string;
  dossiers: Dossier[];
  updated_at: string;
}

const DossierPage = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductDetails(params.slug);

  // If product is null or dossiers missing, show 404
  if (!product || !("dossiers" in product)) {
    notFound();
  }

  const { slug, name, dossiers } = product as ProductWithDossier;

  return (
    <Details
      dossier={{
        slug,
        name,
        dossiers,
        updated_at: product.updated_at,
      }}
    />
  );
};

export default DossierPage;
