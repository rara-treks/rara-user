"use client";

import { useState, useEffect } from "react";
import AboutPageLayout from "@/components/about/AboutPageLayout";
import GoldenCTA from "@/components/about/GoldenCTA";
import { Linkedin } from "lucide-react";

interface TeamMember {
    name: string;
    position: string;
    bio: string;
    linkedin_link: string;
    whyUsImage: string;
}

interface ApiResponse {
    code: number;
    message: string;
    data: TeamMember[];
}

export default function TeamPage() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/product/page/team");

                if (!response.ok) {
                    throw new Error("Failed to fetch team data");
                }

                const result: ApiResponse = await response.json();

                if (result.code === 0 && result.data) {
                    setTeamMembers(result.data);
                } else {
                    throw new Error(result.message || "Failed to load team data");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    return (
        <AboutPageLayout
            heroTitle="Meet Our"
            heroHighlight="Team"
            heroDescription="Behind every successful journey is a dedicated team working together."
        >
            {/* Intro Section */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-xl lg:text-2xl font-satisfy text-gray-600 mb-2">
                            The People Behind Your Adventures
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our <span className="text-[#086032]">Team</span>
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Our team includes experienced leaders, operational staff, travel
                            planners, and support members who work closely to ensure every
                            journey runs smoothly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Grid Section */}
            <section className="py-10 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {[...Array(10)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="bg-gray-200 rounded-2xl aspect-square mb-2" />
                                    <div className="bg-gray-200 h-3 w-20 mx-auto rounded mb-1" />
                                    <div className="bg-gray-200 h-2 w-14 mx-auto rounded" />
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-[#086032] text-white rounded-full hover:bg-[#5a8c35] transition-colors text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className="group"
                                    onMouseEnter={() => setHoveredId(index)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Card */}
                                    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100">
                                        {/* Image Container - Square aspect ratio */}
                                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                                            <img
                                                src={member.whyUsImage}
                                                alt={member.name}
                                                className={`w-full h-full object-cover object-top transition-transform duration-300 ${hoveredId === index ? "scale-105" : "scale-100"
                                                    }`}
                                            />

                                            {/* Overlay on hover */}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${hoveredId === index ? "opacity-100" : "opacity-0"
                                                    }`}
                                            />

                                            {/* Bio on hover */}
                                            <div
                                                className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${hoveredId === index
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-2"
                                                    }`}
                                            >
                                                <p className="text-white text-[10px] leading-tight line-clamp-2">
                                                    {member.bio}
                                                </p>
                                            </div>

                                            {/* LinkedIn Icon - Top right on hover */}
                                            {member.linkedin_link && (
                                                <a
                                                    href={member.linkedin_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-gray-700 hover:bg-[#086032] hover:text-white transition-all duration-300 flex items-center justify-center ${hoveredId === index ? "opacity-100 scale-100" : "opacity-0 scale-75"
                                                        }`}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Linkedin size={12} />
                                                </a>
                                            )}
                                        </div>

                                        {/* Info - Compact */}
                                        <div className="p-2 text-center">
                                            <h3 className="text-xs font-semibold text-gray-900 group-hover:text-[#086032] transition-colors truncate">
                                                {member.name}
                                            </h3>
                                            <p className="text-[10px] text-gray-500 truncate">
                                                {member.position}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            Ready to Trek with Our Team?
                        </h2>
                        <p className="text-gray-600 mb-5 text-sm">
                            Let our experienced guides lead you through Nepal&apos;s spectacular landscapes.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <GoldenCTA href="/trek">Explore Our Treks</GoldenCTA>
                            <GoldenCTA href="/contact" variant="outline">Get in Touch</GoldenCTA>
                        </div>
                    </div>
                </div>
            </section>
        </AboutPageLayout>
    );
}
