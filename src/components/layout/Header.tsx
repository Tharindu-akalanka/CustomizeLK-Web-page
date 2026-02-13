"use client";

import Link from "next/link";
import { Search, User, Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import CartSheet from "@/components/cart/CartSheet";
import { Input } from "@/components/ui/input";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full bg-background transition-shadow duration-300",
                scrolled ? "shadow-md" : "border-b"
            )}
        >
            <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4">
                    <div className="md:hidden">
                        <MobileMenu />
                    </div>

                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/pre logo.png"
                            alt="CustomizeLK Brand Icon"
                            width={50}
                            height={50}
                            className="h-10 md:h-12 w-auto object-contain"
                            priority
                        />
                        <Image
                            src="/logo.png"
                            alt="CustomizeLK Logo"
                            width={150}
                            height={40}
                            className="h-8 md:h-10 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Home
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-sm font-medium hover:text-primary transition-colors focus:outline-none flex items-center gap-1">
                            Shop
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem asChild>
                                <Link href="/shop" className="w-full">All Products</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/shop?sort=new" className="w-full">New Arrivals</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-sm font-medium hover:text-primary transition-colors focus:outline-none">Men</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild><Link href="/shop?category=men" className="w-full">All Men</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/shop?category=men&type=casual" className="w-full">Casual</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/shop?category=men&type=formal" className="w-full">Formal</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-sm font-medium hover:text-primary transition-colors focus:outline-none">Women</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild><Link href="/shop?category=women" className="w-full">All Women</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/shop?category=women&type=heels" className="w-full">Heels</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/shop?category=women&type=sneakers" className="w-full">Sneakers</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <Link href="/customize" className="text-sm font-medium hover:text-primary transition-colors">
                        Customize
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                        Contact
                    </Link>
                </nav>

                {/* Right Icons */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                    </Button>
                    <CartSheet />
                </div>
            </div>
        </header>
    );
}
