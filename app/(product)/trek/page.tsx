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
import trekDataApiResponse from "@/components/ProductDetail/data";
import TourCarousel from "@/components/home/TourCarousel";
import { trekData } from "@/data/data";

const Product_Detail = () => {
  const { data: trekInfo } = trekDataApiResponse;
  const [activeTab, setActiveTab] = useState("Trip_Overview");

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
  const scrollToSection = (sectionId: any) => {
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

  const headerData = {
    type: trekInfo.type,
    title: trekInfo.title,
    location: trekInfo.location,
    rating: trekInfo.rating,
  };

  const galleryData = trekInfo.gallery;

  const introData = {
    intro: trekInfo.intro,
  };

  const overviewData = trekInfo.overview;
  const altitudeChartData = trekInfo.altitude_chart;
  const itineraryData = trekInfo.itinerary;
  const costDetailData = trekInfo.cost_detail;
  const TripLocationData = trekInfo.trip_location;

  const departureData = {
    id: trekInfo.id,
    title: trekInfo.title,
    departureData: trekInfo.departureData,
  };

  const inquiryData = {
    id: trekInfo.id,
    title: trekInfo.title,
  };
  const faqData = trekInfo.faqData;

  const reviewsData = {
    ...trekInfo.reviewsData,
    title: trekInfo.title,
  };
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

            <div id="Altitude_Chart">
              <AltitudeChart
                itineraryData={itineraryData}
                altitudeChartData={altitudeChartData}
              />
            </div>

            <div id="Itinerary">
              <Itinerary data={itineraryData} />
            </div>

            <div id="Cost_Detail">
              <CostDetail data={costDetailData} />
            </div>

            <div id="Tour_Location">
              <Location data={TripLocationData} />
            </div>

            <div id="Departure_Date">
              <Departure data={departureData} />
            </div>

            <div id="FAQs">
              <Faq data={faqData} />
            </div>
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

      <div className="container">
        <TourCarousel title="Trek" data={trekData} />
      </div>
    </div>
  );
};

export default Product_Detail;
