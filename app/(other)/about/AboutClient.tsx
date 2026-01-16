"use client";

import { useEffect, useState } from "react";
import AboutPageLayout from "@/components/about/AboutPageLayout";
import GoldenCTA from "@/components/about/GoldenCTA";
import { MapPin, Users, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PageData {
    type: string;
    title: string;
    slug: string;
    header: string;
    content1: string;
    content2: string;
    content3: string;
    featuredImage: string;
    meta: {
        metaTitle: string;
        keywords: string[];
        metaDescription: string;
    };
}

const quickLinks = [
    {
        icon: Users,
        title: "Why Travel With Us",
        description: "Discover what sets us apart.",
        href: "/about/why-travel-with-us",
    },
    {
        icon: Shield,
        title: "Safety & Responsibility",
        description: "Learn about our commitment to safety.",
        href: "/about/safety-responsibility",
    },
    {
        icon: MapPin,
        title: "Meet Our Team",
        description: "Get to know our team.",
        href: "/about/team",
    },
];

const AboutClient = () => {
    const [pageData, setPageData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/product/page/detail/about");

                if (!response.ok) {
                    throw new Error("Failed to fetch page data");
                }

                const result = await response.json();

                if (result.code === 0 && result.data) {
                    setPageData(result.data);
                } else {
                    throw new Error(result.message || "Failed to load page data");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, []);

    if (error) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <p className="text-red-600 font-semibold">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-[#086032] text-white rounded-full hover:bg-[#5a8c35] transition text-sm"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AboutPageLayout
            heroImage={pageData?.featuredImage}
            heroTitle="About Our"
            heroHighlight="Journey"
            heroDescription="Crafting extraordinary adventures in the Himalayas for over a decade."
        // showStats={true}
        >
            {/* Quick Navigation Cards */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {quickLinks.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="group bg-slate-50 rounded-xl p-5 hover:bg-[#086032]/5 border border-transparent hover:border-[#086032]/20 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#086032]/10 rounded-lg flex items-center justify-center group-hover:bg-[#086032]/20 transition-colors">
                                            <Icon className="w-5 h-5 text-[#086032]" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#086032] transition-colors">
                                                {link.title}
                                            </h3>
                                            <p className="text-xs text-gray-500">{link.description}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#086032] group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    {loading ? (
                        <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
                            <div className="h-6 bg-gray-200 rounded w-1/3" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                            <div className="h-4 bg-gray-200 rounded w-4/5" />
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            {/* Who We Are */}
                            <div className="mb-12">
                                <div className="flex flex-col gap-1 mb-6">
                                    <p className="text-xl lg:text-2xl font-satisfy text-gray-600">
                                        Our Story
                                    </p>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                                        Who We <span className="text-[#086032]">Are</span>
                                    </h2>
                                </div>
                                <div
                                    className="prose prose-gray max-w-none text-gray-600 [&>p]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-4"
                                    dangerouslySetInnerHTML={{ __html: pageData?.content1 || "" }}
                                />
                            </div>

                            {/* Journey Section */}
                            {pageData?.content2 && (
                                <div className="mb-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                                    <div
                                        className="prose prose-gray max-w-none text-gray-600 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900"
                                        dangerouslySetInnerHTML={{ __html: pageData.content2 }}
                                    />
                                </div>
                            )}

                            {/* Mission & Values */}
                            {pageData?.content3 && (
                                <div>
                                    <div
                                        className="prose prose-gray max-w-none text-gray-600 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-4 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-800"
                                        dangerouslySetInnerHTML={{ __html: pageData.content3 }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Explore More Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-10">
                        <p className="text-xl lg:text-2xl font-satisfy text-gray-600 mb-2">
                            Learn More
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Explore <span className="text-[#086032]">More</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-green-50 rounded-xl p-6 text-center">
                            <Users className="w-10 h-10 text-[#086032] mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                                Why Choose Us
                            </h3>
                            <p className="text-gray-600 text-xs mb-4">
                                Learn about our local expertise and safety standards.
                            </p>
                            <GoldenCTA href="/about/why-travel-with-us" size="sm">
                                Learn More
                            </GoldenCTA>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6 text-center">
                            <Shield className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                                Safety First
                            </h3>
                            <p className="text-gray-600 text-xs mb-4">
                                Our comprehensive safety protocols.
                            </p>
                            <GoldenCTA href="/about/safety-responsibility" size="sm">
                                Learn More
                            </GoldenCTA>
                        </div>

                        <div className="bg-amber-50 rounded-xl p-6 text-center">
                            <MapPin className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                                Our Team
                            </h3>
                            <p className="text-gray-600 text-xs mb-4">
                                Meet the people behind your adventures.
                            </p>
                            <GoldenCTA href="/about/team" size="sm">
                                Meet Team
                            </GoldenCTA>
                        </div>
                    </div>
                </div>
            </section>
        </AboutPageLayout>
    );
};

export default AboutClient;
