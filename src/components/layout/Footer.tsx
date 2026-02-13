"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-secondary/30 pt-16 pb-8 border-t">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo.png"
                                alt="CustomizeLK Logo"
                                width={180}
                                height={50}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Sri Lanka's premier custom footwear studio. We craft unique, personalized shoes that help you express your individual style.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="https://web.facebook.com/profile.php?id=61587498577353" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="https://www.instagram.com/cust_omizelk?igsh=YW5nYXFiNXpvcThu&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            {/* <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link> */}
                            <Link href="https://wa.me/94784770089" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <MessageCircle className="h-5 w-5" />
                                <span className="sr-only">WhatsApp</span>
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
                            <li><Link href="/shop?category=men" className="hover:text-foreground transition-colors">Men</Link></li>
                            <li><Link href="/shop?category=women" className="hover:text-foreground transition-colors">Women</Link></li>
                            <li><Link href="/shop?category=deals" className="hover:text-foreground transition-colors">Deals</Link></li>
                            <li><Link href="/customize" className="hover:text-foreground transition-colors">Custom Studio</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                            <li><Link href="/facilities" className="hover:text-foreground transition-colors">Our Facilities</Link></li>
                            <li><Link href="#" className="hover:text-foreground transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/faqs" className="hover:text-foreground transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold mb-4">Stay in the loop</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to get special offers, free giveaways, and unique deals.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <Input placeholder="Enter your email" type="email" className="max-w-[200px]" />
                            <Button type="submit">Subscribe</Button>
                        </form>
                    </div>
                </div>

                <div className="border-t pt-8 text-center text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} CustomizeLK. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
