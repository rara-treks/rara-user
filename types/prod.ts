export interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  short_description: string;
  average_rating: number;
  featuredImage: {
    id: number;
    url: string;
  };
  featuredImages: Array<{
    id: number;
    url: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
    pivot: {
      product_id: number;
      tag_id: number;
    };
  }>;
  prices: Array<{
    product_id: number;
    number_of_people: number;
    original_price_usd: string;
    discounted_price_usd: string;
  }>;
  overview: {
    id: number;
    product_id: number;
    duration: string;
    trip_grade: string;
    max_altitude: string;
    group_size: number;
    best_time: string;
    starts: string;
  };
}

export interface ApiResponse {
  code: number;
  message: string;
  data: Product[];
}

export 
interface TourCarouselProps {
  title1?: string;
  title?: string;
  id?: string;
  data: Product[];
}