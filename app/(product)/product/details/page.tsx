"use client";
import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/ProductDetail/Breadcrumbs";
import AltitudeChart from "@/components/ProductDetail/Details/Altitude_chart";
import CostDetail from "@/components/ProductDetail/Details/Cost_detail";
import Departure from "@/components/ProductDetail/Details/Departure";
import Faq from "@/components/ProductDetail/Details/Faq";
import Inquiry from "@/components/ProductDetail/Details/Inquiry";
import Itinerary from "@/components/ProductDetail/Details/Itinerary";
import Location from "@/components/ProductDetail/Details/Location";
import Trip_Overview from "@/components/ProductDetail/Details/Trip_Overview";
import GalleryGrid from "@/components/ProductDetail/GalleryGrid";
import Header from "@/components/ProductDetail/Header";
import HeaderBtm from "@/components/ProductDetail/Headerbtm";
import Intro from "@/components/ProductDetail/Intro";
import Review from "@/components/ProductDetail/Review";
import {
  ProductDetailProps,
  HeaderData,
  Gallery,
  IntroData,
  TripOverview,
  AltitudeChart as AltitudeChartType,
  TransformedItineraryDay,
  CostDetail as CostDetailType,
  trip_location,
  DepartureData,
  TransformedDepartureItem,
  InquiryData,
  FAQ,
  ReviewsData,
  RelatedCircuit,
} from "@/components/ProductDetail/type";
import RelatedProductCover from "@/components/home/RelatedProductCover";

const Product_Detail = ({ productData }: ProductDetailProps) => {
  const [activeTab, setActiveTab] = useState<string>("Trip_Overview");

  // Tab configuration
  const tabs = [
    { id: "Trip_Overview", label: "Overview" },
    { id: "Altitude_Chart", label: "Altitude Chart" },
    { id: "Itinerary", label: "Itinerary" },
    { id: "Cost_Detail", label: "Cost Detail" },
    { id: "Tour_Location", label: "Location" },
    { id: "Departure_Date", label: "Departure" },
    { id: "FAQs", label: "FAQs" },
    { id: "Review", label: "Reviews" },
  ];

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTab(sectionId);
    }
  };

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((tab) => document.getElementById(tab.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(tabs[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);

  // Header data mapping
  const headerData: HeaderData = {
    type: productData.type,
    title: productData.name,
    location: productData.location,
    rating: productData.average_rating || 0,
    total_rating: productData.total_rating || 0,
    tagline: productData.tagline,
  };

  // Gallery data mapping - correctly handle the file structure
  const galleryData: Gallery = {
    images: [
      // Featured image
      ...(productData.files?.featuredImage
        ? [
            {
              id: productData.files.featuredImage.id.toString(),
              src: productData.files.featuredImage.url,
              alt: productData.name,
              isFeatured: true,
            },
          ]
        : []),
      // Featured images array
      ...(productData.files?.featuredImages || []).map((img, index) => ({
        id: `featured-${img.id}`,
        src: img.url,
        alt: `${productData.name} - Featured Image ${index + 1}`,
        isFeatured: false,
      })),
      // Gallery images array
      ...(productData.files?.galleryImages || []).map((img, index) => ({
        id: `gallery-${img.id}`,
        src: img.url,
        alt: `${productData.name} - Gallery Image ${index + 1}`,
        isFeatured: false,
      })),
    ],
  };

  // Intro data mapping
  const introData: IntroData = {
    intro: productData.short_description,
    description: productData.description,
  };

  // Overview data mapping with proper structure
  const overviewData: TripOverview = {
    description: productData.description,
    details: {
      duration: productData.overview?.duration
        ? `${productData.overview.duration} days`
        : "N/A",
      location:
        productData.overview?.overview_location ||
        productData.location ||
        "N/A",
      tripGrade: productData.overview?.trip_grade || "N/A",
      maximumAltitude: productData.overview?.max_altitude
        ? `${productData.overview.max_altitude}m`
        : "N/A",
      groupSize: productData.overview?.group_size
        ? productData.overview.group_size.toString()
        : "N/A",
      activities: productData.overview?.activities || "Trekking",
      bestTime: productData.overview?.best_time || "N/A",
      starts: productData.overview?.starts || "N/A",
    },
    highlights: productData.highlights || [],
  };

  // Altitude chart data mapping
  const altitudeChartData: AltitudeChartType | undefined = productData.files
    ?.altitudeChart
    ? {
        src: productData.files.altitudeChart.url,
        alt: `${productData.name} - Altitude Chart`,
      }
    : undefined;

  // Transform itinerary data correctly
  const transformedItineraryData: TransformedItineraryDay[] =
    productData.itinerary?.map((item, index) => ({
      day: item.order || index + 1,
      title: item.time_window,
      description: item.activity,
      altitude: item.max_altitude ? `${item.max_altitude}m` : "N/A",
      duration: item.duration ? `${item.duration} hours` : "N/A",
      location: item.location || "N/A",
      accommodation: item.accommodation || "N/A",
      meals: item.meal || "N/A",
      activities: item.activities || "N/A",
    })) || [];

  // Cost detail data mapping
  const costDetailData: CostDetailType = {
    includes:
      productData.included?.map((item) => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
        description: item.description,
      })) || [],
    excludes:
      productData.excluded?.map((item) => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
        description: item.description,
      })) || [],
  };

  // Location data mapping
  const locationData: trip_location = {
    how_to_get: productData.how_to_get || "",
    image: productData.files?.locationCover
      ? {
          id: productData.files.locationCover.id,
          src: productData.files.locationCover.url,
          alt: `${productData.name} - Location`,
        }
      : {
          id: 0,
          src: "/placeholder.jpg",
          alt: "No location image available",
        },
  };

  // Helper function to get month name from date string
  const getMonthFromDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "long" });
  };

  // Helper function to format date range
  const formatDateRange = (fromDate: string, toDate: string): string => {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    };

    return `${formatDate(from)} - ${formatDate(to)}`;
  };

  // Transform departure data by grouping by months
  const transformDepartureData = (): DepartureData => {
    if (!productData.departures || productData.departures.length === 0) {
      return {};
    }

    const departuresByMonth: DepartureData = {};

    productData.departures.forEach((departure) => {
      const month = getMonthFromDate(departure.departure_from);

      if (!departuresByMonth[month]) {
        departuresByMonth[month] = [];
      }

      const transformedDeparture: TransformedDepartureItem = {
        id: departure.id,
        dateRange: formatDateRange(
          departure.departure_from,
          departure.departure_to
        ),
        price: `$${departure.departure_per_price}`,
        availability: "Available", // Since this info isn't in API, using default
        departure_from: departure.departure_from,
        departure_to: departure.departure_to,
        departure_per_price: departure.departure_per_price,
      };

      departuresByMonth[month].push(transformedDeparture);
    });

    // Sort departures within each month by date
    Object.keys(departuresByMonth).forEach((month) => {
      departuresByMonth[month].sort(
        (a, b) =>
          new Date(a.departure_from).getTime() -
          new Date(b.departure_from).getTime()
      );
    });

    return departuresByMonth;
  };

  // Departure data mapping with month-based grouping
  const departureData = {
    id: productData.id,
    title: productData.name,
    departureData: transformDepartureData(),
  };

  // Inquiry data mapping with proper price structure
  const inquiryData: InquiryData = {
    id: productData.id,
    title: productData.name,
    prices:
      productData.prices?.map((price) => ({
        number_of_people: price.number_of_people,
        original_price_usd: parseFloat(price.original_price_usd),
        discounted_price_usd: parseFloat(price.discounted_price_usd),
      })) || [],
    impact: productData.impact,
    what_to_bring: productData.what_to_bring || [],
  };

  // FAQ data mapping
  const faqData: FAQ[] =
    productData.faqs?.map((faq) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
    })) || [];

  // Reviews data mapping
  const reviewsData: ReviewsData = {
    title: productData.name,
    average_rating: productData.average_rating || 0,
    total_rating: productData.total_rating || 0,
    total_comment: productData.total_comment || 0,
  };

  // Related packages data mapping
  const relatedPackagesData: RelatedCircuit[] =
    productData.related_circuit?.map((circuit) => ({
      id: circuit.id,
      name: circuit.name,
      slug: circuit.slug,
      type: circuit.type,
      location: circuit.location,
      category_details: circuit.category_details,
      tagline: circuit.tagline,
      featuredImage: circuit.featuredImage
        ? {
            id: circuit.featuredImage.id,
            url: circuit.featuredImage.url,
            alt: circuit.name,
          }
        : undefined,
      featuredImages: circuit.featuredImages || [],
      prices: circuit.prices || [],
      tags: circuit.tags || [],
      average_rating: circuit.average_rating || 0,
      total_rating: circuit.total_rating || 0,
      short_description: circuit.tagline || "",
      duration: circuit.overview?.duration || undefined,
    })) || [];

  return (
    <div className="w-full flex flex-col gap-4 bg-[#F2F5F0]">
      <div className="w-full flex flex-col gap-4 container mt-8">
        <Breadcrumbs data={headerData} />
        <Header data={headerData} />
      </div>

      <div className="w-full md:container">
        <GalleryGrid data={galleryData} />
      </div>

      <div className="container w-full flex md:hidden">
        <HeaderBtm data={headerData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 container mb-6">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Intro data={introData} />

          {/* Sticky Tab Navigation */}
          <div className="sticky top-0 z-40 bg-[#F2F5F0] p-4 mb-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              <div className="flex space-x-1 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-[#71B344] text-white shadow-sm rounded-full"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-12">
            <div id="Trip_Overview">
              <Trip_Overview data={overviewData} />
            </div>

            {altitudeChartData && (
              <div id="Altitude_Chart">
                <AltitudeChart
                  itineraryData={transformedItineraryData}
                  altitudeChartData={altitudeChartData}
                />
              </div>
            )}

            <div id="Itinerary">
              <Itinerary data={transformedItineraryData} />
            </div>

            <div id="Cost_Detail">
              <CostDetail data={costDetailData} />
            </div>

            <div id="Tour_Location">
              <Location data={locationData} />
            </div>

            <div id="Departure_Date">
              <Departure data={departureData} />
            </div>

            {faqData.length > 0 && (
              <div id="FAQs">
                <Faq data={faqData} />
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-16 h-fit">
            <Inquiry data={inquiryData} />
          </div>
        </div>
      </div>

      <div id="Review" className="w-full container">
        <Review data={reviewsData} />
      </div>

      {relatedPackagesData.length > 0 && (
        <div className="container">
          <RelatedProductCover
            title="Related Treks"
            data={relatedPackagesData}
          />
        </div>
      )}
    </div>
  );
};

export default Product_Detail;
