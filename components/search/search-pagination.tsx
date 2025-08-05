import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useProductSearch from "@/lib/hooks/use-product-search";

interface Props {
  className?: string;
  totalPages: number;
}

function SearchPagination({ className, totalPages }: Props) {
  const { filter, updateFilter } = useProductSearch();

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem
          onClick={() =>
            updateFilter([
              {
                key: "page",
                value: filter.page - 1,
              },
            ])
          }
          aria-disabled={filter.page === 1}
          className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-gray-500"
        >
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem
          onClick={() =>
            updateFilter([
              {
                key: "page",
                value: filter.page + 1,
              },
            ])
          }
          className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-gray-500"
          aria-disabled={filter.page >= totalPages}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default SearchPagination;
