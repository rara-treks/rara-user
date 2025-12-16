import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Rara Treks & Tours | Nepal Trekking & Travel Company",
    description:
        "Learn about Rara Treks & Tours, a Nepal-based trekking and tour operator offering luxury, family, solo, and budget travel experiences across Nepal.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
