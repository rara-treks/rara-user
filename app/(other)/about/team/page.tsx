import { Metadata } from "next";
import TeamPageClient from "./TeamPageClient";

export const metadata: Metadata = {
    title: "Our Team | Meet the RARA Treks Guides & Staff",
    description:
        "Meet the dedicated team behind RARA Treks. Experienced guides, travel planners, and support staff committed to making your Nepal adventure unforgettable.",
    alternates: {
        canonical: "/about/team",
    },
    openGraph: {
        title: "Our Team | RARA Treks",
        description:
            "Meet the dedicated team behind RARA Treks - experienced guides and travel planners.",
        url: "/about/team",
        type: "website",
    },
};

export default function TeamPage() {
    return <TeamPageClient />;
}
