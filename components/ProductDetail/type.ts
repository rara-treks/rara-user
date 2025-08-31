export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface Gallery {
  images: GalleryImage[];
}

export interface Location {
  region: string;
  district: string;
}

export interface Rating {
  score: number;
  maxScore: number;
  reviewText: string;
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

export interface TripOverview {
  description: string;
  details: TripDetails;
  highlights: string[];
}

export interface AltitudeChart {
  id: number;
  src: string;
  alt: string;
}

export interface CostItem {
  id: number;
  text: string;
}

export interface trip_location_image {
  id: number;
  src: string;
  alt: string;
}

export interface trip_location {
  image: trip_location_image;
  description: string;
}

export interface CostDetail {
  includes: CostItem[];
  excludes: CostItem[];
}

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

export interface FAQImage {
  id: number;
  src: string;
  alt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQData {
  images: FAQImage[];
  questions: FAQ[];
}

export interface Review {
  id: string | number;
  name: string;
  trek: string;
  rating: number;
  review: string;
  avatar: string;
  marginTop?: string;
}

export interface DepartureItem {
  id: number;
  dateRange: string;
  price: string;
  statusSubtext?: string;
}

export interface DepartureData {
  [month: string]: DepartureItem[];
}

export interface Itinerary {
  [key: `day${number}`]: ItineraryDay;
}

export interface FlexibleItinerary {
  [key: string]: ItineraryDay;
}

// Updated TrekData interface to include FAQ and Review data
export interface TrekData {
  type: string;
  title: string;
  location: Location;
  rating: Rating;
  gallery: Gallery;
  intro: string;
  overview: TripOverview;
  altitude_chart: AltitudeChart;
  itinerary: Itinerary;
  cost_detail: CostDetail;
  trip_location: trip_location;
  departureData: DepartureData;
  faqData: FAQData;
  reviewsData: Review[];
}

// Full API response type
export interface TrekApiResponse {
  success: boolean;
  message: string;
  data: TrekData;
}

export interface HeaderProps {
  data?: {
    title?: string;
    location?: Location;
    rating?: Rating;
  };
}

export interface GalleryGridProps {
  data?: Gallery;
}

export interface IntroProps {
  data?: {
    intro?: string;
  };
}

export interface BreadcrumbsProps {
  data?: {
    title?: string;
    type?: string;
    location?: Location;
  };
}

export interface TrekPageProps {
  trekData?: TrekData;
}

export interface GalleryComponentProps {
  data: Gallery;
}

export interface GalleryDialogProps {
  images: GalleryImage[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

export interface TripOverviewProps {
  data?: TripOverview;
}

export interface ItineraryProps {
  data?: Itinerary;
}

export interface ItineraryDayProps {
  dayNumber: number;
  dayData: ItineraryDay;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export interface ItineraryCardProps {
  day: string;
  dayData: ItineraryDay;
  dayNumber: number;
}

export interface CostDetailProps {
  data?: CostDetail;
}

export interface DepartureProps {
  data?: {
    id: string;
    title: string;
    departureData: DepartureData;
  };
}

export interface TripLocationProps {
  data?: trip_location;
}

export interface FaqProps {
  data?: FAQData;
}

export interface ReviewProps {
  data: Review[] | {
    reviews: Review[];
    title: string;
    [key: string]: any; 
  };
}

export interface CostItemProps {
  item: CostItem;
  type: "include" | "exclude";
}

export interface AltitudeChartProps {
  itineraryData?: Itinerary;
  altitudeChartData?: AltitudeChart;
}

export type DayKey = keyof Itinerary;

export type ItineraryDayWithKey = {
  key: string;
  dayNumber: number;
  data: ItineraryDay;
};

export interface ItineraryUtils {
  getDayNumber: (dayKey: string) => number;
  getItineraryAsArray: (itinerary: Itinerary) => ItineraryDayWithKey[];
  getTotalDays: (itinerary: Itinerary) => number;
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
