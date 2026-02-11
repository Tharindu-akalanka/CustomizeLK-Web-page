"use client";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data";

export default function FeaturedSection() {
    const featuredProducts = PRODUCTS.slice(0, 4);

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Best Sellers</h2>
                    <Button variant="ghost" asChild className="hidden sm:flex">
                        <Link href="/shop" className="group">
                            View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Button variant="outline" asChild>
                        <Link href="/shop">View All Products</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
