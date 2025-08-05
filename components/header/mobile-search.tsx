import useProductSearch from "@/lib/hooks/use-product-search";
import { useRouter } from "next/router";
import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SEARCH_PATHS = ["/search", "/homestays", "/experiences", "/circuits", "/packages"];

function MobileSearch() {
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
    <Drawer>
      <DrawerTrigger>
        <IconSearch />
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <form className="flex flex-col gap-4" onSubmit={handleSearch}>
          <Input key={filter.search} name="search" defaultValue={filter.search} placeholder="Search" />
          <Button className="w-full">Search</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileSearch;
