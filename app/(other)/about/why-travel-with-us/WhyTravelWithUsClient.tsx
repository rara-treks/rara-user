"use client";

import { useEffect, useState } from "react";
import AboutPageLayout from "@/components/about/AboutPageLayout";
import GoldenCTA from "@/components/about/GoldenCTA";
import TestimonialCard from "@/components/home/Testimonial/TestimonialCard";
import {
    MapPin,
    Users,
    Settings,
    Shield,
    Leaf,
    DollarSign,
} from "lucide-react";

interface TestimonialData {
    id: number;
    user_name: string;
    product_name: string;
    overall_rating: number;
    public_review: string;
}

interface ApiResponse {
    code: number;
    message: string;
    data: {
        id: number;
        user_name: string;
        product_name: string;
        overall_rating: string;
        public_review: string;
    }[];
}

const features = [
    {
        icon: MapPin,
        title: "Local Expertise",
        description:
            "We are a Nepal-based company with firsthand knowledge of routes, conditions, and communities.",
    },
    {
        icon: Users,
        title: "Experienced Team",
        description:
            "Our staff and guides bring real mountain experience, not just sales promises.",
    },
    {
        icon: Settings,
        title: "Customized Trips",
        description:
            "We offer flexible itineraries tailored to your interests, pace, and experience level.",
    },
    {
        icon: Shield,
        title: "Safety First",
        description:
            "Clear safety protocols, trained guides, and careful planning are central to every trip.",
    },
    {
        icon: Leaf,
        title: "Responsible Travel",
        description:
            "We support local communities, fair staff treatment, and environmentally conscious practices.",
    },
    {
        icon: DollarSign,
        title: "Honest Pricing",
        description: "Transparent costs with no hidden charges.",
    },
];

export default function WhyTravelWithUsClient() {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/api/product/homepage/review");

                if (!response.ok) {
                    throw new Error("Failed to fetch testimonials");
                }

                const result: ApiResponse = await response.json();

                if (result.code === 0 && result.data) {
                    const transformedData: TestimonialData[] = result.data.map((item) => ({
                        id: item.id,
                        user_name: item.user_name,
                        product_name: item.product_name,
                        overall_rating: parseFloat(item.overall_rating),
                        public_review: item.public_review,
                    }));

                    setTestimonials(transformedData.slice(0, 3));
                }
            } catch (err) {
                console.error("Failed to fetch testimonials:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <AboutPageLayout
            heroTitle="Why Travel"
            heroHighlight="With Us"
            heroDescription="Choosing the right trekking company matters. Here's why travelers trust RARA Treks."
        >
            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <p className="text-xl lg:text-2xl font-satisfy text-gray-600 mb-2">
                            What Sets Us Apart
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Why Travelers <span className="text-[#086032]">Choose Us</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#086032]/30 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-[#086032]/10 rounded-xl flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-[#086032]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex w-full items-end justify-between mb-8">
                        <div className="flex flex-col gap-1">
                            <p className="text-xl lg:text-2xl font-satisfy">
                                Stories of unforgettable adventures
                            </p>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                                Happy <span className="text-[#086032]">Explorers</span>
                            </h2>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-48" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.map((testimonial) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    name={testimonial.user_name}
                                    trek={testimonial.product_name}
                                    rating={testimonial.overall_rating}
                                    review={testimonial.public_review}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Have Questions About Your Trip?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Let us design your perfect Himalayan journey.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <GoldenCTA href="/contact">Get Expert Advice</GoldenCTA>
                            <GoldenCTA href="/trek" variant="outline">View Our Treks</GoldenCTA>
                        </div>
                    </div>
                </div>
            </section>
        </AboutPageLayout>
    );
}
