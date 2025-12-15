"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface FooterCTAProps {
    title?: string;
    buttonText?: string;
    buttonLink?: string;
}

const FooterCTA = ({
    title = "Start Planning Your Trip",
    buttonText = "Send an Inquiry",
    buttonLink = "/contact",
}: FooterCTAProps) => {
    return (
        <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        {title}
                    </h2>
                    <p className="text-emerald-100 text-lg mb-8">
                        Let us help you create unforgettable memories in the Himalayas.
                    </p>
                    <Link
                        href={buttonLink}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-emerald-700 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                        {buttonText}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FooterCTA;
