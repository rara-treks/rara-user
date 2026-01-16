"use client";

import FAQSection from "./Components/FAQSection";
import FeaturesSection from "./Components/FeaturesSection";
import SpecialServicesSection from "./Components/SpecialServicesSection";
import StatsSection from "./Components/StatsSection";
import HeroSection from "./Components/HeroSection";
import Why from "@/components/home/Why";


const RentalClient = () => {

    return (
        <div className="min-h-screen ">
            <HeroSection />
            <div id="learn-more">
                <FeaturesSection />
            </div>
            <StatsSection />
            <SpecialServicesSection />
            <Why />
            <FAQSection />
        </div>
    );
};

export default RentalClient;
