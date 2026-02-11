"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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

// Mock Data (Expanded)
const ALL_PRODUCTS = [
    {
        id: "1",
        title: "Custom Air Force 1 - 'Pink Flowers'",
        price: 35000,
        image: "/images/Pink Flowers Custom Sneakers Air Force 1 - Women's US 10_5_Men's US 9.jpg",
        category: "sneakers",
        badge: "New",
        type: "casual",
        gender: "women"
    },
    {
        id: "2",
        title: "Hand Painted Canvas - 'Butterfly'",
        price: 18500,
        image: "/images/6d6d133b8f1df654fd2dbb3e972b7358.jpg",
        category: "women",
        badge: "Trending",
        type: "flats",
        gender: "women"
    },
    {
        id: "3",
        title: "Custom Vans Old Skool - 'Blue Splash'",
        price: 22000,
        image: "/images/1a0e7ef467bafaf6cc8bfd3f7fd99811.jpg",
        category: "men",
        type: "casual",
        gender: "men"
    },
    {
        id: "4",
        title: "Anime Custom - 'Naruto'",
        price: 45000,
        image: "/images/8aa9ebd39b55303e324e9843f391bd09.jpg",
        category: "men",
        badge: "Best Seller",
        type: "sneakers",
        gender: "men"
    },
    {
        id: "5",
        title: "Floral High Tops",
        price: 28000,
        image: "/images/18d6c6db68398dfbe88d4464135e16e9.jpg",
        category: "women",
        type: "sneakers",
        gender: "women"
    },
    {
        id: "6",
        title: "Abstract Art Kicks",
        price: 15000,
        image: "/images/41416ce6d1cdd566fdcd4e7bf30bbb03.jpg",
        category: "men",
        type: "casual",
        gender: "men"
    },
];

function ShopContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");
    const typeParam = searchParams.get("type");
    const sortParam = searchParams.get("sort");

    const [filteredProducts, setFilteredProducts] = useState(ALL_PRODUCTS);
    const [sortLabel, setSortLabel] = useState("Best Selling");

    useEffect(() => {
        let filtered = [...ALL_PRODUCTS];

        if (categoryParam) {
            if (categoryParam === "deals") {
                filtered = filtered.filter(p => p.badge === "Sale" || p.price < 20000);
            } else {
                filtered = filtered.filter((p) => p.category === categoryParam || p.gender === categoryParam);
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
    }, [categoryParam, typeParam, sortParam]);

    return (
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
                    <Button variant="outline" size="sm" className="hidden md:flex">
                        <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="w-[180px] justify-between">
                                {sortLabel}
                                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.location.href = `?${categoryParam ? `category=${categoryParam}&` : ''}sort=best-selling`}>
                                Best Selling
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `?${categoryParam ? `category=${categoryParam}&` : ''}sort=new`}>
                                Newest
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `?${categoryParam ? `category=${categoryParam}&` : ''}sort=price-low-high`}>
                                Price: Low to High
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `?${categoryParam ? `category=${categoryParam}&` : ''}sort=price-high-low`}>
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
                    <Button variant="link" asChild className="mt-4">
                        <a href="/shop">View all products</a>
                    </Button>
                </div>
            )}

            {filteredProducts.length > 0 && (
                <div className="flex justify-center mt-12">
                    <Button variant="outline" disabled>Load More</Button>
                </div>
            )}

        </div>
    );
}

export default function ShopPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1">
                <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading products...</div>}>
                    <ShopContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
