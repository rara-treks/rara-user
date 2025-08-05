import { ProductPrice } from "./product.types";

export interface Wishlist {
  id: number;
  name: string;
  slug: string;
  type: string;
  tagline: string;
  location: string;
  average_rating: string | null;
  total_comment: string | null;
  total_rating: string | null;
  status: string;
  featuredImage: string;
  prices: ProductPrice[];
}
