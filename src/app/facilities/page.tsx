import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Placeholder Card component as we don't have shadcn card installed yet or I missed it.
// Checking previous steps... I only installed button, sheet, scroll-area, badge, input, dropdown-menu.
// I need card. 
// Actually, I can just use div with tailwind classes to save a tool call or install it.
// Let's stick to consistent UI and install card or mock it.
// Spec said "use shadcn/ui". I should probably install it or just build it here since it's simple.
// I'll build it inline or use a simple version to be efficient.

export default function FacilitiesPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">Our Facilities</h1>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
                    At CustomizeLK, we combine traditional craftsmanship with modern technology to deliver premium quality custom footwear.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                        <div className="relative h-48 bg-muted">
                            <Image
                                src="/images/324b4e1732fc4bd9d3e298ecaf0fc5b8.jpg"
                                alt="Surface Preparation"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">Surface Preparation</h3>
                            <p className="text-sm text-muted-foreground">
                                Every shoe undergoes a rigorous cleaning and preparation process. We use specialized deglazers to ensure the surface is perfectly primed for adhesion.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                        <div className="relative h-48 bg-muted">
                            <Image
                                src="/images/a538e33ba86c2b58433fc4e2e924a002.jpg"
                                alt="Artistic Precision"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">Artistic Precision</h3>
                            <p className="text-sm text-muted-foreground">
                                Our artists use premium leather paints mixed with 2-Soft medium for fabric adhesion. Every stroke is applied by hand with meticulous attention to detail.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                        <div className="relative h-48 bg-muted">
                            <Image
                                src="/images/846c8709c2020b5e14f2317b242238aa.jpg"
                                alt="Sealing & Protection"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">Sealing & Protection</h3>
                            <p className="text-sm text-muted-foreground">
                                The final step involves applying a matte or gloss finisher. This seals the paint, making it water-resistant, crack-resistant, and scratch-proof for daily wear.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
