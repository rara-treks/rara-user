"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

function BlogSearch() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = new URL(location.href);
    url.pathname = "/blog";
    const query = e.currentTarget.search.value ?? "";
    url.searchParams.set("q", query);
    router.push(String(url), {
      scroll: false,
    });
  }

  return (
    <form className="relative w-full max-w-96 mx-auto" onSubmit={handleSearch}>
      <Input
        key={query}
        placeholder="Search"
        name="search"
        className="rounded-full border border-black"
        defaultValue={query}
      />
      <button className="absolute top-1/2 right-4 -translate-y-1/2">
        <IconSearch />
      </button>
    </form>
  );
}

export default BlogSearch;
