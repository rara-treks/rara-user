"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { Mountain } from "lucide-react";
import { cn } from "@/lib/utils";

interface AboutPageLayoutProps {
    children: ReactNode;
    heroImage?: string;
    heroTitle: string;
    heroHighlight?: string;
    heroDescription?: string;
    showStats?: boolean;
}

const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "100+", label: "Happy Trekkers" },
    { value: "10+", label: "Destinations" },
];

const AboutPageLayout = ({
    children,
    heroImage = "/assets/2.png",
    heroTitle,
    heroHighlight,
    heroDescription,
    showStats = false,
}: AboutPageLayoutProps) => {
    return (
        <div className="w-full bg-white">
            {/* Hero Section */}
            <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={heroImage}
                        alt={heroTitle}
                        fill
                        priority
                        className="object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <div className="container mx-auto px-6 pb-12">
                        <div className="max-w-2xl space-y-4">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                                <Mountain className="w-4 h-4 text-[#086032]" />
                                <span className="text-white/90 text-sm">
                                    Nepal&apos;s Trusted Trekking Company
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                {heroTitle}{" "}
                                {heroHighlight && (
                                    <span className="text-[#086032]">{heroHighlight}</span>
                                )}
                            </h1>

                            {/* Description */}
                            {heroDescription && (
                                <p className="text-white/85 text-lg leading-relaxed max-w-lg">
                                    {heroDescription}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            {showStats && (
                <div className="bg-white py-10 border-b border-gray-100">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <p className="text-3xl font-bold text-[#086032]">
                                        {stat.value}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Navigation */}
            <div className="bg-slate-50 border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-6 py-4 overflow-x-auto scrollbar-hide">
                        <QuickNavLink href="/about" label="About Us" />
                        <QuickNavLink href="/about/why-travel-with-us" label="Why Travel With Us" />
                        <QuickNavLink href="/about/safety-responsibility" label="Safety & Responsibility" />
                        <QuickNavLink href="/about/team" label="Meet Our Team" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
};

// Quick Navigation Link Component
interface QuickNavLinkProps {
    href: string;
    label: string;
}

const QuickNavLink = ({ href, label }: QuickNavLinkProps) => {
    return (
        <a
            href={href}
            className={cn(
                "whitespace-nowrap text-sm font-medium text-gray-600",
                "hover:text-[#086032] transition-colors duration-200",
                "relative py-2",
                "after:absolute after:bottom-0 after:left-0 after:right-0",
                "after:h-0.5 after:bg-[#086032] after:scale-x-0",
                "hover:after:scale-x-100 after:transition-transform after:duration-200"
            )}
        >
            {label}
        </a>
    );
};

export default AboutPageLayout;
