"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { Minus, Plus, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// We need the product type definition
interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    badge?: string;
    type?: string;
    gender?: string;
    description?: string;
    sizes?: string[];
    images?: string[];
}

export default function ProductDetails({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            size: selectedSize,
            quantity,
        });
        alert("Added to cart!");
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted border">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Small thumbnails */}
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {product.images?.map((img, i) => (
                                <div key={i} className="relative h-20 w-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border hover:border-primary">
                                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            {product.badge && <Badge variant="destructive" className="mb-2">{product.badge}</Badge>}
                            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
                            <p className="text-2xl font-bold mt-2">Rs. {product.price.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground mt-1">Tax included. Shipping calculated at checkout.</p>
                        </div>

                        <div className="border-t border-b py-4 space-y-4">
                            <div>
                                <h3 className="text-sm font-medium mb-2">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes?.map((size) => (
                                        <Button
                                            key={size}
                                            variant={selectedSize === size ? "default" : "outline"}
                                            onClick={() => setSelectedSize(size)}
                                            className="w-16"
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        disabled={quantity <= 1}
                                        onClick={() => setQuantity(q => q - 1)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(q => q + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pb-8 border-b">
                            <Button size="lg" className="w-full" onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                            <Button size="lg" variant="secondary" className="w-full">
                                Buy It Now
                            </Button>
                        </div>

                        <div className="space-y-4 text-sm text-foreground/80">
                            <p>{product.description}</p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><Truck className="h-4 w-4" /> Free delivery over Rs. 10,000</li>
                                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> 1 Year Quality Guarantee</li>
                                <li className="flex items-center gap-2"><RefreshCcw className="h-4 w-4" /> 7 Day Exchange Policy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
