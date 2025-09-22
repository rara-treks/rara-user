
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface RelatedBlog {
  id: number;
  title: string;
  slug: string;
  type: string;
  publish_date: string;
  featuredImage: any; // null in the response
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Price {
  number_of_people: number;
  original_price_usd: string;
  discounted_price_usd: string;
}

export interface WhatToBring {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface ItineraryItem {
  id: number;
  time_window: string;
  activity: string;
  order: number;
  duration: string;
  location: string;
  max_altitude: string;
  activities: string;
  accommodation: string;
  meal: string;
}

export interface IncludedItem {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface ExcludedItem {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface Overview {
  id: number;
  name: string;
  description: string;
  duration: string;
  overview_location: string;
  trip_grade: string;
  max_altitude: string;
  group_size: number;
  activities: string;
  best_time: string;
  starts: string;
}

export interface Dossier {
  id: number;
  content: any; // null in the response
  pdf_file: string;
}

export interface Departure {
  id: number;
  departure_from: string;
  departure_to: string;
  departure_per_price: string;
}

export interface FileImage {
  id: number;
  url: string;
}

export interface Files {
  featuredImage: FileImage;
  featuredImages: FileImage[];
  galleryImages: FileImage[];
  altitudeChart: FileImage;
  hostCover: any; // null in the response
  location: any; // null in the response
  faqImages: FileImage[];
}

export interface RelatedCircuitPrice {
  number_of_people: number;
  original_price_usd: string;
  discounted_price_usd: string;
}

export interface RelatedCircuitTag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface RelatedCircuit {
  id: number;
  name: string;
  featuredImage: FileImage;
  featuredImages: FileImage[];
  prices: RelatedCircuitPrice[];
  location: string;
  slug: string;
  type: string;
  category_details: string;
  total_rating: any; // null in the response
  average_rating: any; // null in the response
  tagline: string;
  tags: RelatedCircuitTag[];
}

export interface Meta {
  metaTitle: string;
  keywords: string[];
  metaDescription: string;
}

export interface ProductDetailData {
  id: number;
  name: string;
  slug: string;
  short_code: string;
  type: string;
  tagline: string;
  manager_id: any; // null in the response
  short_description: string;
  description: string;
  display_order: string;
  youtube_link: any; // null in the response
  latitude: number;
  longitude: number;
  location: string;
  average_rating: any; // null in the response
  total_rating: any; // null in the response
  total_comment: any; // null in the response
  status: string;
  cancellation_policy: any; // null in the response
  how_to_get: string;
  cornerstone: boolean;
  region: any; // null in the response
  is_occupied: boolean;
  max_occupant: string;
  display_homepage: boolean;
  impact: string;
  category_details: string;
  created_at: string;
  updated_at: string;
  night: string;
  faqs: FAQ[];
  highlights: any[]; // empty array in the response
  nearby_homestays: any[]; // empty array in the response
  related_blogs: RelatedBlog[];
  tags: Tag[];
  prices: Price[];
  what_to_bring: WhatToBring[];
  itinerary: ItineraryItem[];
  included: IncludedItem[];
  excluded: ExcludedItem[];
  overview: Overview;
  dossiers: Dossier[];
  departures: Departure[];
  hosts: any[]; // empty array in the response
  files: Files;
  amenities: any[]; // empty array in the response
  related_circuit: RelatedCircuit[];
  related_package: any[]; // empty array in the response
  meta: Meta;
}

export interface ProductDetailResponse {
  code: number;
  message: string;
  data: ProductDetailData;
}

// Legacy interface for backward compatibility (if needed)
export interface ProductDetail extends ProductDetailData {}

// Root interface matching your provided interface
export interface RootInterface {
  code: number;
  message: string;
  data: ProductDetailData;
}

// Component prop types for better type safety
export interface HeaderData {
  type: string;
  title: string;
  location: string;
  rating: number;
  total_rating: number;
  tagline: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  isFeatured: boolean;
}

export interface GalleryData {
  images: GalleryImage[];
}

export interface IntroData {
  intro: string;
  description: string;
}

export interface OverviewDetails {
  duration: string;
  location: string;
  tripGrade: string;
  maximumAltitude: string;
  groupSize: string;
  activities: string;
  bestTime: string;
  starts: string;
}

export interface OverviewData {
  description: string;
  details: OverviewDetails;
  highlights: any[];
}

export interface AltitudeChartData {
  src: string;
  alt: string;
}

export interface TransformedItineraryItem {
  day: number;
  title: string;
  description: string;
  altitude: string;
  duration: string;
  distance: string;
  accommodation: string;
  meals: string;
}

export interface CostDetailData {
  includes: IncludedItem[];
  excludes: ExcludedItem[];
}

export interface LocationData {
  latitude: number;
  longitude: number;
  location: string;
  how_to_get: string;
}

export interface DepartureData {
  id: number;
  title: string;
  departures: Departure[];
}

export interface InquiryData {
  id: number;
  title: string;
  prices: Price[];
  what_to_bring?: WhatToBring[];
}

export interface ReviewsData {
  title: string;
  average_rating: number;
  total_rating: number;
  total_comment: number;
}
