"use client";

import {
    Shield,
    Mountain,
    Heart,
    CheckCircle,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

const safetyStandards = [
    "Certified and trained guides",
    "Regular safety briefings",
    "Emergency response planning",
    "Access to medical assistance and evacuation support",
];

const highAltitudeCare = [
    "Gradual acclimatization itineraries",
    "Guide monitoring for symptoms of altitude sickness",
    "Flexible plans when health comes first",
];

const responsibleTourism = [
    "Fair wages and proper equipment for guides and porters",
    "Minimal environmental impact practices",
    "Respect for local culture and traditions",
];

const SafetyResponsibility = () => {
    return (
        <section id="safety" className="py-20 bg-white scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Safety & Responsibility
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your safety and well-being are our top priorities.
                    </p>
                </div>

                {/* Three Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Safety Standards */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                            <Shield className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Safety Standards
                        </h3>
                        <ul className="space-y-3">
                            {safetyStandards.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* High-Altitude Care */}
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-8">
                        <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                            <Mountain className="w-7 h-7 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            High-Altitude Care
                        </h3>
                        <ul className="space-y-3">
                            {highAltitudeCare.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Responsible Tourism */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-8">
                        <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                            <Heart className="w-7 h-7 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Responsible Tourism
                        </h3>
                        <ul className="space-y-3">
                            {responsibleTourism.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Message */}
                <div className="text-center mb-12">
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                        We believe responsible travel protects both travelers and
                        destinations, ensuring that tourism benefits mountain communities
                        for generations to come.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center bg-gray-900 rounded-3xl p-10 md:p-16">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Travel safely and responsibly with a trusted local company.
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-center mt-8">
                        <Link
                            href="/about#our-team"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 group"
                        >
                            Meet Our Certified Guides
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 border border-white/30"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SafetyResponsibility;
