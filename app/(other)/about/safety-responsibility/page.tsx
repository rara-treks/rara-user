"use client";

import AboutPageLayout from "@/components/about/AboutPageLayout";
import GoldenCTA from "@/components/about/GoldenCTA";
import {
    Shield,
    Mountain,
    Heart,
    CheckCircle,
} from "lucide-react";

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

export default function SafetyResponsibilityPage() {
    return (
        <AboutPageLayout
            heroTitle="Safety &"
            heroHighlight="Responsibility"
            heroDescription="Your safety and well-being are our top priorities."
        >
            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <p className="text-xl lg:text-2xl font-satisfy text-gray-600 mb-2">
                            Your Safety Matters
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Our <span className="text-[#086032]">Commitment</span>
                        </h2>
                    </div>

                    {/* Three Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Safety Standards */}
                        <div className="bg-blue-50 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Safety Standards
                            </h3>
                            <ul className="space-y-3">
                                {safetyStandards.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* High-Altitude Care */}
                        <div className="bg-green-50 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                <Mountain className="w-6 h-6 text-[#086032]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                High-Altitude Care
                            </h3>
                            <ul className="space-y-3">
                                {highAltitudeCare.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#086032] flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Responsible Tourism */}
                        <div className="bg-amber-50 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                <Heart className="w-6 h-6 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Responsible Tourism
                            </h3>
                            <ul className="space-y-3">
                                {responsibleTourism.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Message */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-gray-600 text-lg mb-8">
                            We believe responsible travel protects both travelers and
                            destinations, ensuring that tourism benefits mountain communities
                            for generations to come.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <GoldenCTA href="/about/team">Meet Our Certified Guides</GoldenCTA>
                            <GoldenCTA href="/contact" variant="outline">Contact Us</GoldenCTA>
                        </div>
                    </div>
                </div>
            </section>
        </AboutPageLayout>
    );
}
