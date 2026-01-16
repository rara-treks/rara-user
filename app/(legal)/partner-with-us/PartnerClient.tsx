"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface PrivacyData {
    type: string;
    title: string;
    slug: string;
    header: string;
    content1: string;
    content2: string;
    content3: string;
    featuredImage: string;
}

const PartnerClient = () => {
    const [data, setData] = useState<PrivacyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrivacyPolicy = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "/api/product/page/detail/partner-with-us"
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }

                const result = await response.json();

                if (result.code === 0 && result.data) {
                    setData(result.data);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchPrivacyPolicy();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-600">Error: {error}</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">No data available</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            {data.featuredImage && (
                <div className="flex flex-col gap-6 w-full mb-4 overflow-hidden ">
                    <div className="w-full h-full h-64 md:h-80">
                        <Image
                            src={data.featuredImage}
                            alt={data.title}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="text-center text-black">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                {data.header}
                            </h1>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 pb-12 md:pb-10">
                <article className="bg-white rounded-lg shadow-sm p-8 md:p-4">
                    {/* Content 1 */}
                    <div
                        className="prose prose-sm md:prose-base max-w-none mb-8"
                        dangerouslySetInnerHTML={{ __html: data.content1 }}
                    />

                    {/* Content 2 */}
                    <div
                        className="prose prose-sm md:prose-base max-w-none mb-8"
                        dangerouslySetInnerHTML={{ __html: data.content2 }}
                    />

                    {/* Content 3 */}
                    <div
                        className="prose prose-sm md:prose-base max-w-none"
                        dangerouslySetInnerHTML={{ __html: data.content3 }}
                    />
                </article>
            </div>
        </div>
    );
};

export default PartnerClient;
