import Link from "next/link";
import Image from "next/image";

export default function CategoryGrid() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <Link href="/shop?category=men" className="group relative h-[300px] overflow-hidden rounded-lg bg-muted">
                        {/* Placeholder replacement */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                        <Image
                            src="/images/1a0e7ef467bafaf6cc8bfd3f7fd99811.jpg"
                            alt="Men"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2">Men</h3>
                            <span className="text-white text-sm font-medium border-b-2 border-transparent group-hover:border-white transition-all">Shop Collection</span>
                        </div>
                    </Link>

                    <Link href="/shop?category=women" className="group relative h-[300px] overflow-hidden rounded-lg bg-muted">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                        <Image
                            src="/images/6d6d133b8f1df654fd2dbb3e972b7358.jpg"
                            alt="Women"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2">Women</h3>
                            <span className="text-white text-sm font-medium border-b-2 border-transparent group-hover:border-white transition-all">Shop Collection</span>
                        </div>
                    </Link>

                    <Link href="/customize" className="group relative h-[300px] overflow-hidden rounded-lg bg-muted md:col-span-2 lg:col-span-1">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                        <Image
                            src="/images/41416ce6d1cdd566fdcd4e7bf30bbb03.jpg"
                            alt="Custom Studio"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2 justify-between flex items-center w-full">
                                Custom Studio
                            </h3>
                            <span className="text-white text-sm font-medium border-b-2 border-transparent group-hover:border-white transition-all">Start Designing</span>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
