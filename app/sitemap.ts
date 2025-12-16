import { MetadataRoute } from "next";

interface Product {
    slug: string;
    updated_at?: string;
    type: string;
}

interface Blog {
    slug: string;
    updated_at?: string;
}

interface ProductApiResponse {
    code: number;
    data: {
        data: Product[];
    };
}

interface BlogApiResponse {
    code: number;
    data: Blog[];
}

async function fetchProducts(type: string): Promise<Product[]> {
    try {
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) return [];

        const response = await fetch(`${baseUrl}/product/list?page=1&per_page=100`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filters: { type },
            }),
            next: { revalidate: 86400 }, // Revalidate every day
        });

        if (!response.ok) return [];

        const data: ProductApiResponse = await response.json();
        if (data.code === 0 && data.data?.data) {
            return data.data.data.map((product) => ({
                ...product,
                type,
            }));
        }
        return [];
    } catch (error) {
        console.error(`Error fetching ${type} products for sitemap:`, error);
        return [];
    }
}

async function fetchBlogs(): Promise<Blog[]> {
    try {
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) return [];

        const response = await fetch(`${baseUrl}/blog/paginate?page=1&per_page=100`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filters: { type: "blog" },
            }),
            next: { revalidate: 86400 }, // Revalidate every day
        });

        if (!response.ok) return [];

        const data = await response.json();
        if (data.code === 0 && data.data) {
            // Handle both nested (data.data.data) and direct (data.data) array structures
            const blogs = Array.isArray(data.data) ? data.data : data.data?.data;
            return Array.isArray(blogs) ? blogs : [];
        }
        return [];
    } catch (error) {
        console.error("Error fetching blogs for sitemap:", error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://raratreks.com";

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about/why-travel-with-us`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about/safety-responsibility`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about/team`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/products/trek`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/products/tour`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/products/activities`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/policies/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/policies/terms-and-conditions`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // Fetch dynamic products
    const [treks, tours, activities, blogs] = await Promise.all([
        fetchProducts("trek"),
        fetchProducts("tour"),
        fetchProducts("activities"),
        fetchBlogs(),
    ]);

    // Trek pages
    const trekPages: MetadataRoute.Sitemap = Array.isArray(treks)
        ? treks.map((trek) => ({
            url: `${baseUrl}/trek/${trek.slug}`,
            lastModified: trek.updated_at ? new Date(trek.updated_at) : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        }))
        : [];

    // Tour pages
    const tourPages: MetadataRoute.Sitemap = Array.isArray(tours)
        ? tours.map((tour) => ({
            url: `${baseUrl}/tour/${tour.slug}`,
            lastModified: tour.updated_at ? new Date(tour.updated_at) : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        }))
        : [];

    // Activity pages
    const activityPages: MetadataRoute.Sitemap = Array.isArray(activities)
        ? activities.map((activity) => ({
            url: `${baseUrl}/activities/${activity.slug}`,
            lastModified: activity.updated_at ? new Date(activity.updated_at) : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        }))
        : [];

    // Blog pages
    const blogPages: MetadataRoute.Sitemap = Array.isArray(blogs)
        ? blogs.map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
        }))
        : [];

    return [...staticPages, ...trekPages, ...tourPages, ...activityPages, ...blogPages];
}
