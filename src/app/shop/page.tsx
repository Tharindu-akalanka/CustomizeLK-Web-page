import { getShopProducts } from "@/lib/shop-data";
import ShopClient from "./ShopClient";

// export const dynamic = "force-dynamic"; // Removed for static export compatibility

export default function ShopPage() {
    const products = getShopProducts();

    return (
        <ShopClient initialProducts={products} />
    );
}
