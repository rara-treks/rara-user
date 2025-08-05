import { Wishlist } from "@/types/wishlist.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "../context/user-context";

function useWishlist() {
  const { user } = useUser();
  const { data, isPending } = useQuery<Wishlist[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await axios.get("/api/product/wishlist");
      return data.data as Wishlist[];
    },
    enabled: !!user,
  });

  return { wishlist: data, isPending };
}

export default useWishlist;
