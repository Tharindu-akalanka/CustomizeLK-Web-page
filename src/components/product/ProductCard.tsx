"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    badge?: string;
}

export default function ProductCard({ id, title, price, image, category, badge }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            id,
            title,
            price,
            image,
            size: "US 9", // Default size for now
            quantity: 1,
        });
    };

    return (
        <Link href={`/shop/${id}`}>
            <motion.div
                className="group relative flex flex-col gap-2 overflow-hidden rounded-md bg-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
            >
                <div className="aspect-square relative overflow-hidden bg-muted rounded-md border border-transparent group-hover:border-border transition-colors">
                    {badge && (
                        <div className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                            {badge}
                        </div>
                    )}
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-4xl font-light">
                        {/* Placeholder for Image if not provided or error */}
                        <span className="opacity-20">CustomizeLK</span>
                    </div>
                    {/* In a real app, use next/image here. Using a placeholder div above for now as requested or if image fails. 
               However, I should try to use the image prop.
           */}
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                    />

                    <div className="absolute bottom-0 w-full p-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Button className="w-full" size="sm" onClick={handleAddToCart}>
                            <Plus className="mr-2 h-4 w-4" /> Add to Cart
                        </Button>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground capitalize">{category}</p>
                    <h3 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">{title}</h3>
                    <p className="font-bold text-sm">Rs. {price.toLocaleString()}</p>
                </div>
            </motion.div>
        </Link>
    );
}
