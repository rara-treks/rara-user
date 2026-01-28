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

// Sanitize date to ensure it's valid and not in the future
function sanitizeDate(dateStr?: string): Date {
    const now = new Date();

    if (!dateStr) return now;

    try {
        const date = new Date(dateStr);
        // Check if date is valid
        if (isNaN(date.getTime())) return now;
        // Don't allow future dates
        if (date > now) return now;
        return date;
    } catch {
        return now;
    }
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

// Generate sitemap index that references all sub-sitemaps
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Use SITE_ORIGIN, ensuring no trailing slash
    const baseUrl = "https://www.raratreks.com";

    // Fixed date for static pages (use a reasonable past date)
    const staticDate = new Date("2025-01-01");

    // ============================================
    // STATIC PAGES
    // ============================================
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: staticDate,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: staticDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about/why-travel-with-us`,
            lastModified: staticDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about/safety-responsibility`,
            lastModified: staticDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about/team`,
            lastModified: staticDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },        
        {
            url: `${baseUrl}/trek`,
            lastModified: staticDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/tour`,
            lastModified: staticDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/activities`,
            lastModified: staticDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: staticDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: staticDate,
            changeFrequency: "monthly",
            priority: 0.6,
        },        
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: staticDate,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms-and-conditions`,
            lastModified: staticDate,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // ============================================
    // DYNAMIC PAGES - Fetch from API
    // ============================================
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
            lastModified: sanitizeDate(trek.updated_at),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }))
        : [];

    // Tour pages
    const tourPages: MetadataRoute.Sitemap = Array.isArray(tours)
        ? tours.map((tour) => ({
            url: `${baseUrl}/tour/${tour.slug}`,
            lastModified: sanitizeDate(tour.updated_at),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }))
        : [];

    // Activity pages
    const activityPages: MetadataRoute.Sitemap = Array.isArray(activities)
        ? activities.map((activity) => ({
            url: `${baseUrl}/activities/${activity.slug}`,
            lastModified: sanitizeDate(activity.updated_at),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }))
        : [];

    // Blog pages
    const blogPages: MetadataRoute.Sitemap = Array.isArray(blogs)
        ? blogs.map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: sanitizeDate(blog.updated_at),
            changeFrequency: "weekly" as const,
            priority: 0.6,
        }))
        : [];

    // Combine all pages
    return [
        ...staticPages,
        ...trekPages,
        ...tourPages,
        ...activityPages,
        ...blogPages,
    ];
}
