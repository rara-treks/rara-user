
// Individual departure information
export interface Departure {
  id: number;
  product_id: number;
  departure_from: string;
  departure_to: string;
  departure_per_price: string;
  max_team_members: number | null;
}

// Tag information (from API but not used in simplified data)
export interface Tag {
  id: number;
  name: string;
  slug: string;
  pivot: {
    product_id: number;
    tag_id: number;
  };
}

// Price information (from API but not used in simplified data)
export interface Price {
  product_id: number;
  number_of_people: number;
  original_price_usd: string;
  discounted_price_usd: string;
}

// Full product data from API
export interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  max_occupant: string;
  wishlist: number;
  tags: Tag[];
  prices: Price[];
  departures: Departure[];
}

// Complete API response structure
export interface DepartureResponse {
  code: number;
  message: string;
  data: {
    tour: Product[];
    activities: Product[];
  };
}

// Simplified product with only needed fields
export interface SimplifiedProduct {
  id: number;
  name: string;
  departures: Departure[];
}

// Simplified departure data structure
export interface SimplifiedDepartureData {
  tours: SimplifiedProduct[];
  activities: SimplifiedProduct[];
}

// Props for DepartureTable component
export interface DepartureTableProps {
  title: string;
  message: string;
  data?: SimplifiedProduct[];
}

// Props for Breadcrumbs component
export interface BreadcrumbData {
  type: string;
  title: string;
}

export interface BreadcrumbsProps {
  data: BreadcrumbData;
}
