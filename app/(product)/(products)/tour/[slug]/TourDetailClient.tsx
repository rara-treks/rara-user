"use client";

import { useEffect, useState } from "react";
import { RootInterface } from "@/components/ProductDetail/type";
import Product_Detail from "../../details/ProductDetail";
import DetailedSkeleton from "@/components/DetailedSkeleton";

interface ProductDetailResponse {
    code: number;
    message: string;
    data: RootInterface["data"] | null;
}

interface TourDetailClientProps {
    slug: string;
}

const TourDetailClient = ({ slug }: TourDetailClientProps) => {
    const [productData, setProductData] = useState<RootInterface["data"] | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            if (!slug) {
                setError("No product slug provided");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/product/${slug}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch product");
                }

                const data: ProductDetailResponse = await response.json();

                if (data.code === 0 && data.data) {
                    setProductData(data.data);
                } else {
                    throw new Error(data.message || "Invalid response format");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full">
                <DetailedSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Error Loading Product
                    </h2>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!productData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Product Not Found
                    </h2>
                    <p className="text-gray-600">
                        The requested product could not be found.
                    </p>
                </div>
            </div>
        );
    }

    return <Product_Detail productData={productData} />;
};

export default TourDetailClient;
