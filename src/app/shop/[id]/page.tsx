import { Metadata } from "next";
import { getShopProducts } from "@/lib/shop-data";
import ProductDetails from "@/components/product/ProductDetails";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Required for static export
export async function generateStaticParams() {
    const products = getShopProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const products = getShopProducts();
    const product = products.find((p) => p.id === resolvedParams.id);

    if (!product) {
        return {
            title: "Product Not Found | CustomizeLK",
            description: "The product you are looking for does not exist.",
        };
    }

    return {
        title: `${product.title} | CustomizeLK`,
        description: product.description || `Buy ${product.title} - Custom handcrafted footwear by CustomizeLK.`,
        openGraph: {
            title: product.title,
            description: product.description || `Buy ${product.title} - Custom handcrafted footwear by CustomizeLK.`,
            images: [product.image],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const products = getShopProducts();
    const product = products.find((p) => p.id === resolvedParams.id);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col font-sans">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <h1 className="text-4xl font-bold">Product Not Found</h1>
                    <p className="text-muted-foreground">The product you are looking for does not exist.</p>
                </main>
                <Footer />
            </div>
        );
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        image: product.image,
        description: product.description || `Custom design: ${product.title}`,
        offers: {
            "@type": "Offer",
            priceCurrency: "LKR",
            price: product.price,
            availability: "https://schema.org/InStock",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetails product={product} />
        </>
    );
}
