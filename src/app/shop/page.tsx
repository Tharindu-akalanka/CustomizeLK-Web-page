import { getShopProducts } from "@/lib/shop-data";
import ShopClient from "./ShopClient";

// export const dynamic = "force-dynamic"; // Removed for static export compatibility

import { Suspense } from "react";

export default function ShopPage() {
    const products = getShopProducts();

    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading products...</div>}>
            <ShopClient initialProducts={products} />
        </Suspense>
    );
}
