"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full h-[500px] md:h-[600px] bg-muted overflow-hidden flex items-center justify-center">
            {/* Background with placeholder or gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20 z-10" />
                <Image
                    src="/images/Pink Flowers Custom Sneakers Air Force 1 - Women's US 10_5_Men's US 9.jpg"
                    alt="Custom Sneaker Design"
                    fill
                    priority
                    className="object-cover opacity-70 grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                    sizes="100vw"
                />
            </div>

            <div className="container relative z-20 px-4 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl space-y-6"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground drop-shadow-sm">
                        OWN YOUR DESIGN
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-[500px] drop-shadow-sm">
                        Custom artwork on premium footwear. Made to order for the unique you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button size="lg" asChild className="text-base px-8">
                            <Link href="/shop">Shop Now</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="text-base px-8 bg-background/50 backdrop-blur-sm hover:bg-background/80">
                            <Link href="/customize">Start Customizing</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
