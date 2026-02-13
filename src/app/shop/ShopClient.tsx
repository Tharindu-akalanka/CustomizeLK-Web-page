"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Product } from "@/lib/shop-data";

interface ShopClientProps {
    initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const categoryParam = searchParams.get("category");
    const typeParam = searchParams.get("type");
    const sortParam = searchParams.get("sort");

    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [sortLabel, setSortLabel] = useState("Best Selling");

    // Get unique categories for the filters
    const categories = Array.from(new Set(initialProducts.map(p => p.category)));

    useEffect(() => {
        let filtered = [...initialProducts];

        if (categoryParam) {
            if (categoryParam === "deals") {
                filtered = filtered.filter(p => p.badge === "Sale" || p.price < 20000);
            } else {
                // Determine if categoryParam is one of our Folder categories OR a gender
                // The existing header links use ?category=men and ?category=women
                // But our dynamic products have specific art categories too.
                // Let's check both fields.
                filtered = filtered.filter((p) =>
                    p.category.toLowerCase() === categoryParam.toLowerCase() ||
                    p.gender.toLowerCase() === categoryParam.toLowerCase()
                );
            }
        }

        if (typeParam) {
            filtered = filtered.filter((p) => p.type === typeParam);
        }

        // Sorting logic
        if (sortParam === "price-low-high") {
            filtered.sort((a, b) => a.price - b.price);
            setSortLabel("Price: Low to High");
        } else if (sortParam === "price-high-low") {
            filtered.sort((a, b) => b.price - a.price);
            setSortLabel("Price: High to Low");
        } else if (sortParam === "new") {
            filtered = filtered.filter(p => p.badge === "New").concat(filtered.filter(p => p.badge !== "New"));
            setSortLabel("Newest");
        } else {
            setSortLabel("Best Selling");
        }

        setFilteredProducts(filtered);
    }, [categoryParam, typeParam, sortParam, initialProducts]);

    const updateFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/shop?${params.toString()}`);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight capitalize">
                                {categoryParam === 'deals' ? 'Deals' : categoryParam || "All Products"}
                            </h1>
                            <p className="text-muted-foreground text-sm mt-1">
                                {filteredProducts.length} results
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Category Filter Dropdown (New) */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="hidden md:flex">
                                        <SlidersHorizontal className="mr-2 h-4 w-4" /> Categories
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => updateFilter("category", null)}>
                                        All
                                    </DropdownMenuItem>
                                    {categories.map(cat => (
                                        <DropdownMenuItem key={cat} onClick={() => updateFilter("category", cat)} className="capitalize">
                                            {cat}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-[180px] justify-between">
                                        {sortLabel}
                                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => updateFilter("sort", "best-selling")}>
                                        Best Selling
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateFilter("sort", "new")}>
                                        Newest
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateFilter("sort", "price-low-high")}>
                                        Price: Low to High
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateFilter("sort", "price-high-low")}>
                                        Price: High to Low
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No products found for this category.</p>
                            <Button variant="link" onClick={() => updateFilter("category", null)} className="mt-4">
                                View all products
                            </Button>
                        </div>
                    )}

                    {filteredProducts.length > 0 && (
                        <div className="flex justify-center mt-12">
                            <Button variant="outline" disabled>Load More</Button>
                        </div>
                    )}

                </div>
            </main>
            <Footer />
        </div>
    );
}
