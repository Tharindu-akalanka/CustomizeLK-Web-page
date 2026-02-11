import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Palette, Ruler, Hammer } from "lucide-react";

export default function CustomizePage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-muted/20">
                <div className="max-w-2xl space-y-8">
                    <div className="flex justify-center gap-4 mb-8 text-muted-foreground/50">
                        <Palette className="h-12 w-12" />
                        <Hammer className="h-12 w-12" />
                        <Ruler className="h-12 w-12" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                        Customizer Coming Soon
                    </h1>

                    <p className="text-xl text-muted-foreground">
                        We are building a state-of-the-art 3D customization studio.
                        Soon you'll be able to design your dream footwear from scratch.
                    </p>

                    <div className="pt-8">
                        <Button size="lg" asChild>
                            <Link href="/shop">Explore Current Collection</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
