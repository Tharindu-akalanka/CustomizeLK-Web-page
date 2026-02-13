import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hammer, Sparkles } from "lucide-react";

export default function CustomizePage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-8 bg-muted/20 text-center relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

                <div className="max-w-2xl mx-auto space-y-8 relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <Hammer className="h-16 w-16 text-primary animate-pulse" />
                            <Sparkles className="h-8 w-8 text-yellow-500 absolute -top-2 -right-4 animate-bounce" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Something Amazing <br />
                        <span className="text-primary">Is Being Crafted</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                        Our new 3D Customization Studio is currently under construction.
                        We're working hard to bring you a revolutionary way to design your custom footwear.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" asChild className="w-full sm:w-auto text-lg px-8">
                            <Link href="/shop">
                                Explore Shop
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-lg px-8">
                            <Link href="/contact">
                                Contact Us
                            </Link>
                        </Button>
                    </div>

                    <p className="text-sm text-muted-foreground pt-8">
                        Stay tuned for updates!
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
