"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import useProductSearch from "@/lib/hooks/use-product-search";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const SEARCH_PATHS = ["/search", "/homestays", "/experiences", "/circuits", "/packages"];

function Search({ className }: Props) {
  const { filter } = useProductSearch();
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = new URL(location.href);
    if (!SEARCH_PATHS.includes(url.pathname)) {
      url.pathname = "/search";
    }
    const query = e.currentTarget.search.value ?? "";
    url.searchParams.set("q", query);
    router.push(String(url));
  }

  return (
    <form className={cn("relative", className)} onSubmit={handleSearch}>
      <Input
        key={filter.search}
        name="search"
        className="rounded-full border-black"
        defaultValue={filter.search}
        placeholder="Search"
      />
      <button className="absolute top-1/2 right-4 -translate-y-1/2">
        <IconSearch />
      </button>
    </form>
  );
}

export default Search;
