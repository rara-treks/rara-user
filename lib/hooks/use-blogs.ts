import { PaginatedResponse } from "@/types/index.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Blog } from "../utils/server/get-blogs";

interface Props {
  initialData: PaginatedResponse<Blog>;
  type?: "blog" | "mediaCoverage";
  categoryId?: string | null;
  query?: string | null;
  perPage?: number;
  keys?: string[];
}

function useBlogs({ initialData, categoryId, query, perPage, keys, type = "blog" }: Props) {
  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["blogs", categoryId, query, ...(keys || []), type],
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.post(
        "/api/blog/paginate",
        {
          filters: {
            type,
            categoryId: categoryId,
            search: query,
          },
        },
        {
          params: {
            page: pageParam,
            per_page: perPage,
          },
        }
      );
      return data;
    },
    initialData: {
      pageParams: [1],
      pages: [initialData],
    },
    getNextPageParam: (lastPage) => (lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined),
    getPreviousPageParam: (lastPage) => (lastPage.data.prev_page_url ? lastPage.data.current_page - 1 : undefined),
    initialPageParam: 1,
  });

  const allPages = data?.pages.flatMap((page) => page.data.data);

  return {
    data: allPages,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

export default useBlogs;
