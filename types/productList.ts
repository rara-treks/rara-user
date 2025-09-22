export interface ProductTag {
  id: number;
  name: string;
  description: string;
  display_order: string;
  zoom_level: string;
  slug: string;
  latitude: string;
  longitude: string;
  pivot: {
    product_id: number;
    tag_id: number;
  };
}

export interface ProductPrice {
  product_id: number;
  number_of_people: number;
  original_price_usd: string;
  discounted_price_usd: string;
}

export interface Product {
  id: number;
  name: string;
  tagline: string;
  slug: string;
  type: string;
  display_order: string;
  latitude: number;
  longitude: number;
  location: string;
  average_rating: number | null;
  total_rating: number | null;
  wishlist: number;
  featuredImage: string;
  featuredImages: string[];
  tags: ProductTag[];
  prices: ProductPrice[];
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ProductListData {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ApiResponse {
  code: number;
  message: string;
  data: ProductListData;
}

export interface ProductFilters {
  type?: string;
  page?: number;
  per_page?: number;
  location?: string;
  min_price?: number;
  max_price?: number;
  tags?: string[];
  search?: string;
}

export interface FilterRequest {
  filters: ProductFilters;
}