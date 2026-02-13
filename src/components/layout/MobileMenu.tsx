"use client";

import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, ChevronDown, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const menuItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    {
        label: "Men",
        href: "/shop?category=men",
        children: [
            { label: "Casual", href: "/shop?category=men&type=casual" },
            { label: "Formal", href: "/shop?category=men&type=formal" },
            { label: "Sandals", href: "/shop?category=men&type=sandals" },
        ],
    },
    {
        label: "Women",
        href: "/shop?category=women",
        children: [
            { label: "Heels", href: "/shop?category=women&type=heels" },
            { label: "Flats", href: "/shop?category=women&type=flats" },
            { label: "Sneakers", href: "/shop?category=women&type=sneakers" },
        ],
    },

    { label: "Customize", href: "/customize" },
    { label: "Facilities", href: "/facilities" },
    { label: "Contact", href: "/contact" },
];

export default function MobileMenu() {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (label: string) => {
        setOpenItems((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                    <SheetTitle className="sr-only">CustomizeLK Menu</SheetTitle>
                    <Image
                        src="/logo.png"
                        alt="CustomizeLK Logo"
                        width={120}
                        height={32}
                        className="h-8 w-auto object-contain"
                    />
                </div>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col py-2">
                        {menuItems.map((item) => (
                            <div key={item.label} className="border-b border-border/40 last:border-none">
                                {item.children ? (
                                    <div className="flex flex-col">
                                        <div
                                            className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-accent/50 transition-colors"
                                            onClick={() => toggleItem(item.label)}
                                        >
                                            <span className="font-medium text-base">{item.label}</span>
                                            <ChevronDown
                                                className={cn(
                                                    "h-4 w-4 transition-transform duration-200",
                                                    openItems.includes(item.label) ? "rotate-180" : ""
                                                )}
                                            />
                                        </div>
                                        <div
                                            className={cn(
                                                "overflow-hidden transition-all duration-300 ease-in-out bg-accent/20",
                                                openItems.includes(item.label)
                                                    ? "max-h-[500px] opacity-100"
                                                    : "max-h-0 opacity-0"
                                            )}
                                        >
                                            {item.children.map((child) => (
                                                <SheetClose asChild key={child.label}>
                                                    <Link
                                                        href={child.href}
                                                        className="block px-8 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <SheetClose asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block px-5 py-4 font-medium text-base hover:bg-accent/50 transition-colors",
                                                item.highlight && "text-red-500"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </SheetClose>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-accent/10">
                    <p className="text-xs text-center text-muted-foreground">© 2026 CustomizeLK</p>
                </div>
            </SheetContent>
        </Sheet>
    );
}
