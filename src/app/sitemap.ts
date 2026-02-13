import { MetadataRoute } from "next";
import { getShopProducts } from "@/lib/shop-data";

export default function sitemap(): MetadataRoute.Sitemap {
    const products = getShopProducts();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://customizelk.com";

    const staticRoutes = [
        "",
        "/shop",
        "/customize",
        "/contact",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/shop/${product.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes];
}
