import { IconProps } from "@tabler/icons-react";
import { SEOFields } from "./index.types";

export interface Product {
  id: number;
  name: string;
  tagline: string;
  slug: string;
  type: string;
  display_order: number | null;
  latitude: number;
  longitude: number;
  location: string;
  average_rating: string | null;
  total_rating: string | null;
  wishlist: number;
  featuredImage: string;
  featuredImages: string[];
  tags: {
    id: number;
    name: string;
    description: string;
    display_order: string;
    zoom_level: string;
    slug: string;
    north: string;
    south: string;
    east: string;
    west: string;
    pivot: {
      product_id: number;
      tag_id: number;
    };
  }[];
  prices: ProductPrice[];
}

export interface ProductTag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface ProductFAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface ProductHighlight {
  id: number;
  title: string;
  description: string;
  order: string;
  highlightImage: string;
}

export interface ProductOverview {
  id: number;
  name: string;
  description: string;
}

export interface ProductItinerary {
  id: number;
  time_window: string;
  activity: string;
  order: number;
}

export interface ProductIncluded {
  id: number;
  name: string;
  icon: React.FC<IconProps>;
  description: string;
}

export interface ProductRelatedBlog {
  id: number;
  title: string;
  slug: string;
  publish_date: string;
  featuredImage: string;
}

export interface ProductHost {
  id: number;
  profileImage: string;
  fullname: string;
  description: string;
}

export interface ProductAmenities {
  id: number;
  name: string;
  icon: React.FC<IconProps>;
  description: string;
}

export interface NearbyHomestay {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  featuredImage: string;
  featuredImages: string[];
  prices: ProductPrice[];
  location: string;
  tags: ProductTag[];
}

export interface ProductWhatToBring {
  id: number;
  name: string;
  icon: React.FC<IconProps>;
  description: string;
}

export interface RelatedExperience {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  featuredImage: string;
  featuredImages: string[];
  prices: ProductPrice[];
  location: string;
  tags: ProductTag[];
}

export interface RelatedCircuit {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  featuredImage: string;
  featuredImages: string[];
  prices: ProductPrice[];
  location: string;
  tags: ProductTag[];
  total_rating: string | null;
  average_rating: string | null;
}

export interface RelatedPackage {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  featuredImage: string;
  featuredImages: string[];
  prices: ProductPrice[];
  location: string;
  tags: ProductTag[];
  total_rating: string | null;
  average_rating: string | null;
}

export interface RelatedHomestay {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  featuredImage: string;
  featuredImages: string[];
  prices: ProductPrice[];
  location: string;
  tags: ProductTag[];
  total_rating: string | null;
  average_rating: string | null;
}

export interface ProductPrice {
  number_of_people: number;
  original_price_usd: string;
  discounted_price_usd: string | null;
}

export interface ProductTag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  short_code: string;
  type: string;
  tagline: string;
  manager_id: number;
  short_description: string;
  description: string;
  display_order: string;
  youtube_link: string | null;
  latitude: number;
  longitude: number;
  location: string;
  average_rating: string | null;
  total_comment: string | null;
  status: string;
  cancellation_policy: string | null;
  how_to_get: string;
  cornerstone: boolean;
  region: string;
  is_occupied: boolean;
  max_occupant: string;
  display_homepage: boolean;
  created_at: string;
  updated_at: string;
  night: string;
  impact: string;
  total_rating: string | null;
  wishlist: string | null;
  faqs: ProductFAQ[];
  highlights: ProductHighlight[];
  included: ProductIncluded[];
  nearby_homestays: NearbyHomestay[];
  related_blogs: ProductRelatedBlog[];
  tags: ProductTag[];
  prices: ProductPrice[];
  hosts: ProductHost[];
  files: {
    featuredImage: string;
    featuredImages: string[];
    galleryImages: string[];
    locationCover: string;
    hostCover: string;
    howToGet: string;
  };
  amenities: ProductAmenities[];
  meta: SEOFields;
  related_experiences: RelatedExperience[];
  related_homestays: RelatedHomestay[];
  related_circuit: [];
  related_package: [];
  overview?: ProductOverview[];
  itinerary?: ProductItinerary[];
  what_to_bring?: ProductWhatToBring[];
}

export interface ProductReview {
  id: number;
  public_review: string;
  overall_rating: string;
  created_at: string;
  product_name: string;
  user_name: string;
  user_country: string;
}
