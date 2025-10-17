"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileServices from "./MobileServices";

interface FeaturedImage {
  id: number;
  url: string;
}

interface Service {
  id: number;
  name: string;
  slug: string;
  type: string;
  featuredImage?: FeaturedImage;
  featuredImages?: FeaturedImage[];
}

interface ServiceDisplay {
  title: string;
  image?: string;
  route: string;
  width: "wide" | "narrow";
  type: string;
  slug: string;
}

const Services = () => {
  const [services, setServices] = useState<ServiceDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/product/homepage/explore/list");

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const result = await response.json();

        if (result.code === 0 && result.data) {
          // Map API data to display format
          const mappedServices: ServiceDisplay[] = result.data.map(
            (service: Service, index: number) => {
              const widthPattern = [
                "wide",
                "wide",
                "narrow",
                "narrow",
                "wide",
                "wide",
                "wide",
                "wide",
                "narrow",
              ];
              const width = (widthPattern[index % widthPattern.length] ||
                "wide") as "wide" | "narrow";

              return {
                title: service.name,
                image: service.featuredImage?.url,
                route: `/${service.type}/${service.slug}`,
                width,
                type: service.type,
                slug: service.slug,
              };
            }
          );

          setServices(mappedServices);
        } else {
          throw new Error(result.message || "Invalid response format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Arrange services in the specific layout pattern for desktop
  const rows = [
    services.slice(0, 3), // First 3 services
    services.slice(3, 6), // Next 3 services
    services.slice(6, 9), // Last 3 services
  ];

  // Arrange services in 3x3 grid for mobile
  const mobileGrid = [
    services.slice(0, 3),
    services.slice(3, 6),
    services.slice(6, 9),
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 w-full container mx-auto py-16">
        <div className="flex flex-col w-full items-center justify-center gap-1">
          <p className="text-xl lg:text-2xl font-satisfy text-gray-600">
            We offer diverse services
          </p>
          <h1 className="text-3xl lg:text-4xl flex items-center gap-2 font-bold text-gray-900">
            Explore <span className="text-[#71B344]">Services</span>
          </h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#71B344]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 w-full container mx-auto py-16">
        <div className="flex flex-col w-full items-center justify-center gap-1">
          <p className="text-xl lg:text-2xl font-satisfy text-gray-600">
            We offer diverse services
          </p>
          <h1 className="text-3xl lg:text-4xl flex items-center gap-2 font-bold text-gray-900">
            Explore <span className="text-[#71B344]">Services</span>
          </h1>
        </div>
        <div className="text-red-500 text-center">
          <p>Failed to load services. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full container mx-auto py-16">
      <div className="flex flex-col w-full items-center justify-center gap-1">
        <p className="text-xl lg:text-2xl font-satisfy text-gray-600">
          We offer diverse services
        </p>
        <h1 className="text-3xl lg:text-4xl flex items-center gap-2 font-bold text-gray-900">
          Explore <span className="text-[#71B344]">Services</span>
        </h1>
      </div>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden lg:flex flex-col gap-5 w-full max-w-[1200px]">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-5 h-[213px]">
            {row.map((service, serviceIndex) => (
              <Link
                key={service.title}
                href={service.route}
                className={`relative rounded-[32px] overflow-hidden group cursor-pointer ${
                  service.width === "wide"
                    ? "w-[434px] flex-shrink-0"
                    : "w-[332px] flex-shrink-0"
                }`}
              >
                {service.image ? (
                  <>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition duration-300"
                      sizes="(max-width: 434px) 100vw, 434px"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition duration-300">
                      <h3 className="text-white text-2xl font-semibold text-center px-4 leading-[150%]">
                        {service.title}
                      </h3>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition duration-300">
                    <h3 className="text-gray-700 text-2xl font-semibold text-center px-4 leading-[150%]">
                      {service.title}
                    </h3>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <MobileServices mobileGrid={mobileGrid} />
    </div>
  );
};

export default Services;
