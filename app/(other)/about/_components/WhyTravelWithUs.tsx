"use client";

import {
    MapPin,
    Users,
    Settings,
    Shield,
    Leaf,
    DollarSign,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

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
            "Our staff and guides bring real mountain experience, not just sales promise.",
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

const WhyTravelWithUs = () => {
    return (
        <section id="why-travel" className="py-20 bg-gradient-to-b from-slate-50 to-white scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Why Travel with Us
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choosing the right trekking company matters. Here's why travelers
                        trust RARA Treks:
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200"
                            >
                                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                                    <Icon className="w-7 h-7 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className="text-center bg-emerald-50 rounded-3xl p-10 md:p-16">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Have questions about your trip?
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Let us design your perfect Himalayan journey.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/trek"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 group"
                        >
                            View Our Treks
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg transition-all duration-300 border border-gray-200"
                        >
                            Get Expert Advice
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyTravelWithUs;
