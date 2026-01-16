import { Metadata } from "next";
import WhyTravelWithUsClient from "./WhyTravelWithUsClient";

export const metadata: Metadata = {
    title: "Why Travel With Us | Choose RARA Treks Nepal",
    description:
        "Discover why travelers choose RARA Treks for their Nepal adventures. Local expertise, experienced guides, customized trips, and commitment to safety.",
    alternates: {
        canonical: "/about/why-travel-with-us",
    },
    openGraph: {
        title: "Why Travel With Us | RARA Treks",
        description:
            "Discover why travelers choose RARA Treks for their Nepal adventures.",
        url: "/about/why-travel-with-us",
        type: "website",
    },
};

export default function WhyTravelWithUsPage() {
    return <WhyTravelWithUsClient />;
}
