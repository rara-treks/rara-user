// Base interfaces for file structures
export interface FileImage {
  id: number;
  url: string;
  alt?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  isFeatured?: boolean;
}

export interface Gallery {
  images: GalleryImage[];
}

// Location interfaces
export interface Location {
  region?: string;
  district?: string;
}

// Rating interfaces
export interface Rating {
  score: number;
  maxScore: number;
  reviewText?: string;
}

// Overview related interfaces
export interface Overview {
  duration?: number;
  overview_location?: string;
  trip_grade?: string;
  max_altitude?: number;
  group_size?: number;
  activities?: string;
  best_time?: string;
  starts?: string;
}

export interface TripDetails {
  duration: string;
  location: string;
  tripGrade: string;
  maximumAltitude: string;
  groupSize: string;
  activities: string;
  bestTime: string;
  starts: string;
}

export interface WhatToBringItem {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface TripOverview {
  intro: string;
  description: string;
  details: TripDetails;
  highlights: string[];
  what_to_bring: WhatToBringItem[];
}

// Altitude Chart interfaces
export interface AltitudeChart {
  src: string;
  alt: string;
}

// Dossier interfaces - NEW
export interface Dossier {
  id: number;
  content?: string | null;
  pdf_file: string;
}

// Share Data interfaces - NEW
export interface ShareData {
  slug: string;
  dossiers: Dossier[];
}

// Files structure from API
export interface Files {
  featuredImage?: FileImage;
  featuredImages?: FileImage[];
  galleryImages?: FileImage[];
  altitudeChart?: FileImage;
  locationCover?: FileImage;
  faqImages?: FAQImage;
}

// Cost related interfaces
export interface CostItem {
  id: number;
  name: string;
  icon?: string;
  description?: string;
}

export interface CostDetail {
  includes: CostItem[];
  excludes: CostItem[];
}

// Itinerary interfaces
export interface ItineraryItem {
  id?: number;
  order?: number;
  time_window: string;
  activity: string;
  max_altitude?: number;
  duration?: number;
  location?: string;
  accommodation?: string;
  meal?: string;
  activities?: string;
}

export interface TransformedItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude: string;
  duration: string;
  location: string;
  accommodation: string;
  meals: string;
  activities: string;
}

// Location interfaces
export interface trip_location_image {
  id: number;
  src: string;
  alt: string;
}

export interface trip_location {
  image: trip_location_image;
  how_to_get: string;
  latitude?: number;
  longitude?: number;
}

// Departure interfaces
export interface DepartureItem {
  id: number;
  departure_from: string;
  departure_to: string;
  departure_per_price: number;
}

export interface TransformedDepartureItem {
  id: number;
  dateRange: string;
  price: string;
  availability: string;
  departure_from: string;
  departure_to: string;
  departure_per_price: number;
}

export interface DepartureData {
  [month: string]: TransformedDepartureItem[];
}

export interface DepartureProps {
  data: {
    id: number;
    title: string;
    departureData: DepartureData;
  };
}

// Price interfaces
export interface Price {
  number_of_people: number;
  original_price_usd: string;
  discounted_price_usd: string;
}

export interface TransformedPrice {
  number_of_people: number;
  original_price_usd: number;
  discounted_price_usd: number;
}

// Inquiry interfaces
export interface InquiryData {
  id: number;
  title: string;
  prices: TransformedPrice[];
  impact: string;
  what_to_bring: WhatToBringItem[];
}

// FAQ interfaces
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  order?: number;
}

export interface FAQImage {
  id: number;
  src: string;
  alt: string;
}

export interface FAQData {
  images?: FAQImage[];
  questions?: FAQ[];
}

// Review interfaces
export interface Review {
  id: string | number;
  name: string;
  trek: string;
  rating: number;
  review: string;
  avatar: string;
  marginTop?: string;
}

export interface ReviewsData {
  id: number;
  slug: string;
  title: string;
  average_rating: number;
  total_rating: number;
  total_comment: number;
}

// Related circuit interfaces
export interface RelatedCircuit {
  id: number;
  name: string;
  slug: string;
  type: string;
  location: string;
  category_details?: any;
  tagline: string;
  featuredImage?: FileImage;
  featuredImages?: FileImage[];
  prices?: Price[];
  tags?: any[];
  average_rating?: number;
  total_rating?: number;
  short_description: string;
  overview?: Overview;
}

// Main API data structure - UPDATED
export interface RootInterface {
  data: {
    id: number;
    name: string;
    slug: string;
    type: string;
    location: string;
    tagline: string;
    impact: string;
    short_description: string;
    description: string;
    average_rating?: number;
    total_rating?: number;
    total_comment?: number;
    highlights?: string[];
    overview?: Overview;
    files?: Files;
    latitude?: number;
    longitude?: number;
    itinerary?: ItineraryItem[];
    included?: CostItem[];
    excluded?: CostItem[];
    how_to_get?: string;
    departures?: DepartureItem[];
    prices?: Price[];
    what_to_bring?: WhatToBringItem[];
    faqs?: FAQ[];
    related_circuit?: RelatedCircuit[];
    dossiers?: Dossier[]; // NEW
  };
}

// Component prop interfaces
export interface ProductDetailProps {
  productData: RootInterface["data"];
}

export interface HeaderData {
  type: string;
  title: string;
  location: string;
  rating: number;
  total_rating: number;
  tagline: string;
}

export interface IntroData {
  tagline?: string;
  intro: string;
  description: string;
}

export interface HeaderProps {
  data: HeaderData;
}

export interface GalleryGridProps {
  data: Gallery;
}

export interface IntroProps {
  data: IntroData;
}

export interface BreadcrumbsProps {
  data: HeaderData;
}

export interface TripOverviewProps {
  data: TripOverview;
}

export interface ItineraryProps {
  data: TransformedItineraryDay[];
}

export interface AltitudeChartProps {
  itineraryData: TransformedItineraryDay[];
  altitudeChartData: AltitudeChart;
}

export interface CostDetailProps {
  data: CostDetail;
}

export interface LocationProps {
  data: trip_location;
}

export interface FaqProps {
  data: FAQ[];
  images: FAQImage[];
}

export interface ReviewProps {
  data: ReviewsData;
}

export interface InquiryProps {
  data: InquiryData;
  shareData?: ShareData; // NEW - Optional share data
}

// Share Data Props - NEW
export interface ShareDataProps {
  data: ShareData;
}

// Utility types
export type DayKey = keyof any;

export interface ItineraryDayWithKey {
  key: string;
  dayNumber: number;
  data: TransformedItineraryDay;
}

export interface ItineraryUtils {
  getDayNumber: (dayKey: string) => number;
  getItineraryAsArray: (itinerary: any) => ItineraryDayWithKey[];
  getTotalDays: (itinerary: any) => number;
}

export interface ItineraryFilter {
  searchTerm?: string;
  altitudeRange?: {
    min: number;
    max: number;
  };
  activities?: string[];
  accommodationType?: string[];
}

export interface FilteredItineraryResult {
  matchedDays: ItineraryDayWithKey[];
  totalMatches: number;
}

// Legacy interfaces for backward compatibility
export interface ItineraryDay {
  title: string;
  description: string;
  duration: string;
  location: string;
  maxAltitude: string;
  activities: string;
  accommodation: string;
  meal: string;
}

export interface Itinerary {
  [key: `day${number}`]: ItineraryDay;
}

export interface FlexibleItinerary {
  [key: string]: ItineraryDay;
}

export interface TourPageProps {
  tourData: {
    id: number;
    name: string;
    slug: string;
    description: string;
    location: string;
    rating: number;
    total_rating: number;
    tagline?: string;
    images: string[];
    dossiers: Array<{
      id: number;
      pdf_file: string;
      content?: string;
    }>;
  };
}
