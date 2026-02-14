import fs from 'fs';
import path from 'path';

export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    badge?: string;
    type: string;
    gender: string;
    sizes: string[];
    description?: string;
}

const NAME_MAPPING: Record<string, string> = {
    // DRAGON / CARTOON
    "173fe2130757c55ee0ebcbc045f484e2": "Toothless – Night Fury Edition",
    "832a3ba479e6e1c1390b71c887febdff": "Toothless – Isle of Berk Edition",
    "a2fdad57e9d1deaf74242af6bb15d7be": "Monstrous Nightmare – Fire Storm Edition",
    "c3c0e9da1a5332567be1ed68ed48bd00": "Skrill – Thunder Strike Edition",
    "8774c6cd79ee56b5f1053e0518ff26eb": "Pikachu – Thunderbolt Edition",
    "c075fa561fb888e6fe02fbf4a83f7c7d": "SpongeBob – Hoops Edition",
    "06fa6da171e2b2ac8d187dcfe8ac3f3e": "Doraemon – Future Gadget Edition",
    "0d8397d7db9effe75208a78e9b0361c8": "Light Fury – Sky Spirit Edition",

    // PORTRAIT / STREET
    "3202201f5d5f571d211e4571da7fc194": "Tupac – Urban Legend Edition",
    "0f31fe57e5b87c749c0823cfcf3c81ce": "IGOR – Tyler Creator Custom",
    "2c708019ba5fa6e0aaa01e47a5f6f646": "Travis Scott – Look Mom I Can Fly",
    "8d320b9ece2e776fd63b0c9e98f7da1b": "Bloodline – Drip Custom",
    "unnamed (1)": "Japanese Traditional",
    "unnamed": "Sri Lanka – Traditional",

    // ADDITIONAL ABSTRACT / MINIMAL
    "4283aac5bb9377dfbed3b1860603ef24": "Ocean Marble – Fluid Art Edition",
    "4bd7217ce506d98b7f0134b11424ead4": "Abstract Splash – Blue & Black",
    "9d6bfa5368c8d29b3517f63d4947b74b": "Street Doodle – Vibrant Pop",
    "c08e63d6d788a7f6506677ea11b4c6a4": "Pastel Drip – Soft Graffiti",
    "ced1aa508a08888fc3e193ee92e668d4": "Sketchbook – Blue Outline",
    "ecd8824cf1ba9b134e9275aa3c70021d": "Blue Splatter – Minimalist Art",
    "3618b1a41b465437c69335dd8d61ebdb": "Urban Script – Street Culture Edition",
    "88389730e12a095d48b6b505137c27f0": "Soft Blue – Minimal Flow Edition",
    "96a101eae1364f236789dd0741843dcd": "Galaxy Swoosh – Star Night Edition",
    "cc0b451582b2ca3548249f392737f4a9": "Peach Line – Soft Minimal Edition",

    // ANIME COLLECTION
    "7c8f89abf9553dc466f90f0188cb78c9": "Toji – Silent Assassin Edition",
    "7e578609682fef81d475ed76aacd3b05": "Gojo – Hollow Purple Edition",
    "851303c04f813eb1011c16e878b5bd02": "Nanami – Overtime Mode Edition",
    "8ddedd7454f5773c8517ebcf964e468a": "Todo – Boogie Woogie Edition",
    "96d9a1ae4a7142cb56f4c82111e43624": "Geto – Fallen Sorcerer Edition",
    "97ebd8fa43f757025c96e16d620d9359": "Choso – Blood Manipulation Edition",
    "ae91eff8a26116deae3565988ce10206": "Nanami – Calm Strike Edition",
    "b2de5ee4a6da3b8ebfd4d6d8aa757620": "Gojo – Limitless Aura Edition",
    "c3c9eaff768fe0aabfa06329a857559b": "Gojo – Blue Eye Edition",
    "ca4cde2eb2f183b537da3dd4529683e8": "Fushiguro – Divine Shadow Edition",
    "20501972f97afce0856a7957a3185e6e": "Sukuna – King of Curses Edition",
    "21ca61f6a56530df797b0d093b2931af": "Toge – Silent Curse Edition",
    "2929f3a13ea8b9352096d1c5a97aa581": "Toge – Whisper Edition",
    "156b20909eb4d8e37c0e931a56a1f1b0": "Mahito – Phantom Soul Edition",
    "0d83974df9bfe7520a78e9b0361c8": "Yuta – Shadow Surge Edition",
    "7942b5ecab0473734d68c139624b11db": "Itadori – Yuji Style",

    // MINIMAL / ABSTRACT / STREET
    "Cc8b451852bca35482493727374a9": "Peach Line – Soft Minimal Edition",
    "4bd7217ce506968f70134b1424ea4": "Paint Splash – Abstract Edition",
    "9d6bf5368cd82b351763d4947b74b": "Color Riot – Street Pop Edition",
    "C0e63d6d788a716506677ea11b4c64": "Urban Candy – Pop Art Edition",
    "Ced1a50a88883fc391ec29e668d4": "Blue Sketch – Abstract Outline Edition",
    "8cd824cfb9013492753a3c70021d": "Ice Drip – Abstract Edition"
};

// 1-based index from user mapped to 0-based array
// 33 is marked remove, so we use -1
const PRICE_LIST = [
    12000, 12500, 8000, 12500, 10500, 12500, 8000, 12500, 15000, 12500,
    12500, 15000, 11000, 18000, 15000, 13000, 15000, 12000, 12500, 8000,
    12000, 12000, 15000, 8000, 15000, 11000, 8000, 13000, 13000, 8000,
    15000, 6500, -1, 6000, 5000, 7500, 15000, 15500, 9000, 13500,
    8000, 6000
];

export function getShopProducts(): Product[] {
    try {
        const artsDir = path.join(process.cwd(), 'public', 'images', 'arts');
        const products: Product[] = [];

        // Categories map to folder names
        // We can iterate through the subdirectories in 'arts'
        if (!fs.existsSync(artsDir)) {
            console.warn('Arts directory not found:', artsDir);
            return [];
        }

        const categories = fs.readdirSync(artsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .sort(); // Ensure alphabetical order for consistency

        let globalIdRequest = 1;
        let priceIndex = 0;

        categories.forEach(category => {
            const categoryDir = path.join(artsDir, category);
            // Verify categoryDir is actually a directory before reading
            if (!fs.statSync(categoryDir).isDirectory()) return;

            const files = fs.readdirSync(categoryDir)
                .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
                .sort(); // Ensure alphabetical order for consistency

            files.forEach(file => {
                // Check if this item should be skipped (removed)
                // Use designated price from list
                const designatedPrice = (priceIndex < PRICE_LIST.length) ? PRICE_LIST[priceIndex] : 25000;
                priceIndex++;

                if (designatedPrice === -1) {
                    return; // Skip this product
                }

                // Generate a readable title from filename
                // e.g. "my-image.jpg" -> "My Image"
                const nameWithoutExt = file.replace(/\.[^/.]+$/, "");

                // Try to find a match in NAME_MAPPING
                // We strip non-alphanumeric chars to make matching more robust (handling typos/truncation)
                // The mapping keys seem to be mostly 32-char hashes, but might be slightly off.
                // Let's try exact match on the key lowercased first, or partial match.

                let title = nameWithoutExt
                    .replace(/[-_]/g, ' ')
                    .replace(/\b\w/g, c => c.toUpperCase()); // Default title

                const fileHash = nameWithoutExt.toLowerCase();

                // Check keys
                for (const [key, val] of Object.entries(NAME_MAPPING)) {
                    // Determine match - user keys might be slightly different than actual filenames
                    // Simple strategy: check if filename starts with the key, or key matches loosely
                    // Given the discrepancy in the user provided list (e.g. slight char diffs), 
                    // we'll try to match the first 10-15 chars which are likely stable?
                    // Or just normalized comparison.

                    const normalizedKey = key.toLowerCase();
                    // Check if the filename basically *is* this key (allowing for some typo tolerance or length diff)
                    // If the key is contained in the filename or vice versa
                    if (fileHash.includes(normalizedKey) || normalizedKey.includes(fileHash)) {
                        title = val;
                        break;
                    }

                    // Fallback: simple Levenshtein distance or just diff check? 
                    // Let's rely on overlap for now. The hashes are long enough that accidental overlap is rare.
                    // If > 80% of the characters match, it's probably the one.
                }

                // Special handling for duplicate filenames across categories if necessary
                if (category.toLowerCase() === 'cartoon' && fileHash.includes('0d8397')) {
                    title = "Light Fury – Sky Spirit Edition";
                } else if (category.toLowerCase() === 'aime theme' && fileHash.includes('0d8397')) {
                    title = "Yuta – Shadow Surge Edition";
                }

                // Assign price from list
                const price = designatedPrice;

                // Using a simple hash for consistency across reloads
                const hash = nameWithoutExt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

                // Assign random gender/type for filtering demo purposes
                const types = ['sneakers', 'casual', 'flats'];
                const genders = ['men', 'women', 'unisex'];
                const type = types[hash % types.length];
                const gender = genders[hash % genders.length];

                // Normalize category name for URL param matching (if needed) or keep strictly as folder name
                // The folder names are "abstract", "cartoon", etc. which is fine.

                products.push({
                    id: `art-${globalIdRequest++}`,
                    title: title,
                    price: price,
                    image: `/images/arts/${category}/${file}`,
                    category: category.toLowerCase(), // Use folder name as category
                    type: type,
                    gender: gender,
                    badge: (hash % 5 === 0) ? "New" : (hash % 7 === 0) ? "Best Seller" : undefined,
                    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
                    description: "Custom handcrafted footwear by CustomizeLK."
                });
            });
        });

        // Shuffle the products to randomize the display order
        // Fisher-Yates shuffle
        for (let i = products.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [products[i], products[j]] = [products[j], products[i]];
        }

        return products;
    } catch (error) {
        console.error("Error generating shop products:", error);
        return [];
    }
}
