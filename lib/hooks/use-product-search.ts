import { useParams, useRouter, useSearchParams } from "next/navigation";
import { validProductTypes } from "../data/product";

function useProductSearch() {
  const searchParams = useSearchParams();
  const params = useParams<{
    type?: string;
  }>();
  const type = params.type ?? "all";
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const tags = searchParams.get("tags")?.split(",") ?? [];
  const minPrice = searchParams.get("min_price") ?? undefined;
  const maxPrice = searchParams.get("max_price") ?? undefined;
  const router = useRouter();

  function updateFilter(
    data: { key: "type" | "tags" | "q" | "min_price" | "max_price" | "page"; value: string | number }[]
  ) {
    const url = new URL(location.href);
    data.forEach(({ key, value }) => {
      if (value === "") {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, String(value));
      }
    });

    router.push(String(url));
  }

  return {
    filter: {
      type: validProductTypes.includes(type) ? type : "all",
      search: query,
      page,
      tags: tags.map((t) => Number(t)),
      price: {
        min: Number(minPrice),
        max: Number(maxPrice),
      },
    },
    updateFilter,
  };
}

export default useProductSearch;
