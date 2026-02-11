import { Truck, ShieldCheck, Phone, CheckCircle } from "lucide-react";

export default function ServicesStrip() {
    return (
        <section className="bg-secondary/20 py-12 border-y">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <Truck className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-semibold">Island-wide Delivery</h3>
                        <p className="text-xs text-muted-foreground max-w-[150px]">Fast delivery to your doorstep anywhere in Sri Lanka.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                        <ShieldCheck className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-semibold">Quality Guarantee</h3>
                        <p className="text-xs text-muted-foreground max-w-[150px]">Premium paints and sealants for lasting durability.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                        <Phone className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-semibold">Expert Support</h3>
                        <p className="text-xs text-muted-foreground max-w-[150px]">Need help? Our design team is here to assist.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                        <CheckCircle className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-semibold">Cash On Delivery</h3>
                        <p className="text-xs text-muted-foreground max-w-[150px]">Pay when you receive your custom creation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
