import { PRODUCTS } from "@/lib/data";
import ProductDetails from "@/components/product/ProductDetails";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Required for static export
export async function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">Product not found</div>
                <Footer />
            </div>
        );
    }

    return <ProductDetails product={product} />;
}
