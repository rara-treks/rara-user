"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/ProductDetail/Breadcrumbs";
import DepartureHero from "./Components/HeroSection";
import DepartureTable from "./Components/DepartureTable";
import type { SimplifiedProduct, DepartureResponse } from "@/types/departure";
import Why from "@/components/home/Why";


interface DepartureState {
    trek: SimplifiedProduct[];
    tour: SimplifiedProduct[];
    activities: SimplifiedProduct[];
}

const DeparturesClient = () => {
    const [departureData, setDepartureData] = useState<DepartureState>({
        trek: [],
        tour: [],
        activities: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDepartures = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/product/product/departure/lists");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: DepartureResponse = await response.json();

                setDepartureData({
                    trek: (data.data.trek || []).map((product: any) => ({
                        id: product.id,
                        name: product.name,
                        departures: product.departures,
                    })),
                    tour: (data.data.tour || []).map((product: any) => ({
                        id: product.id,
                        name: product.name,
                        departures: product.departures,
                    })),
                    activities: (data.data.activities || []).map((product: any) => ({
                        id: product.id,
                        name: product.name,
                        departures: product.departures,
                    })),
                });
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Failed to fetch departures";
                setError(errorMessage);
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartures();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-3 w-full">
                <div className="w-full flex flex-col container mx-auto">
                    <Breadcrumbs data={{ type: "Departures", title: "Departures" }} />
                </div>

                {/* Hero Skeleton */}
                <div className="w-full bg-slate-100 animate-pulse h-48 md:h-64" />

                {/* Content Skeleton */}
                <div className="w-full flex flex-col gap-12 md:container mx-auto px-4 py-8">
                    {/* Section 1 */}
                    <div className="space-y-6">
                        {/* Title skeleton */}
                        <div className="space-y-2">
                            <div className="h-8 bg-gray-200 rounded-lg w-64 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-80 animate-pulse" />
                        </div>

                        {/* Table skeleton */}
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            {/* Table header */}
                            <div className="bg-slate-50 p-4 flex gap-4">
                                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-28 animate-pulse" />
                            </div>

                            {/* Table rows */}
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="p-4 border-t border-gray-100 flex gap-4 items-center">
                                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                                    <div className="h-8 bg-gray-200 rounded-full w-24 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="h-8 bg-gray-200 rounded-lg w-56 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-72 animate-pulse" />
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            <div className="bg-slate-50 p-4 flex gap-4">
                                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-28 animate-pulse" />
                            </div>

                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="p-4 border-t border-gray-100 flex gap-4 items-center">
                                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                                    <div className="h-8 bg-gray-200 rounded-full w-24 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col gap-3 w-full">
                <div className="w-full flex flex-col container mx-auto">
                    <Breadcrumbs data={{ type: "Departures", title: "Departures" }} />
                </div>
                <div className="container mx-auto py-12 text-center text-red-600">
                    <p className="text-lg font-semibold">Error loading departures</p>
                    <p className="text-sm mt-2">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="w-full flex flex-col container mx-auto">
                <Breadcrumbs data={{ type: "Departures", title: "Departures" }} />
            </div>
            <DepartureHero />

            <div className="w-full flex flex-col gap-12 md:container mx-auto">
                {departureData.trek.length > 0 && (
                    <DepartureTable
                        title="Trek Departure Dates"
                        message="Choose your preferred departure month and trek"
                        products={departureData.trek}
                    />
                )}

                {departureData.tour.length > 0 && (
                    <DepartureTable
                        title="Tour Departure Dates"
                        message="Choose your preferred departure month and tour"
                        products={departureData.tour}
                    />
                )}

                {departureData.activities.length > 0 && (
                    <DepartureTable
                        title="Activities Departure Dates"
                        message="Choose your preferred departure month and activities"
                        products={departureData.activities}
                    />
                )}
            </div>
            <Why />
        </div>
    );
};

export default DeparturesClient;
