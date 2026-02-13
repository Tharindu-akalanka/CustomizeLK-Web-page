"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export default function CartSheet() {
    const { items, removeItem, count, clearCart, updateItemSize } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (!name || !address || !phone) {
            alert("Please fill in all details");
            return;
        }

        const orderSummary = items
            .map(
                (item) =>
                    `- ${item.title} (Size: ${item.size}) x${item.quantity} - Rs. ${(
                        item.price * item.quantity
                    ).toLocaleString()}`
            )
            .join("\n");

        const message = `*New Order Request*

*Customer Details:*
Name: ${name}
Address: ${address}
Phone: ${phone}

*Order Summary:*
${orderSummary}

*Total Amount: Rs. ${total.toLocaleString()}*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/94784770089?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {mounted && count() > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                        >
                            {count()}
                        </Badge>
                    )}
                    <span className="sr-only">Cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle>Your Cart ({count()})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 flex flex-col overflow-hidden mt-4">
                    {items.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground">
                            Your cart is empty
                        </div>
                    ) : (
                        <>
                            <ScrollArea className="flex-1 pr-4">
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b pb-4">
                                            <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-muted-foreground">Size:</span>
                                                    <select
                                                        value={item.size}
                                                        onChange={(e) => updateItemSize(item.id, item.size, e.target.value)}
                                                        className="h-6 text-xs border rounded bg-background px-1"
                                                    >
                                                        {["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"].map((size) => (
                                                            <option key={size} value={size}>
                                                                {size}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <p className="text-sm font-bold">
                                                        Rs. {item.price.toLocaleString()} x {item.quantity}
                                                    </p>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive"
                                                        onClick={() => removeItem(item.id, item.size)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <div className="border-t pt-4 mt-4 space-y-4">
                                <div className="space-y-1.5">
                                    <h4 className="font-medium">Customer Details</h4>
                                    <Input
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-9"
                                    />
                                    <Input
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="h-9"
                                    />
                                    <Input
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-9"
                                    />
                                </div>

                                <div className="flex items-center justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>Rs. {total.toLocaleString()}</span>
                                </div>

                                <Button
                                    className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
                                    onClick={handleCheckout}
                                    disabled={!name || !address || !phone}
                                >
                                    <MessageCircle className="h-5 w-5" /> Checkout on WhatsApp
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
