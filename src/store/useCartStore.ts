import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string) => void;
    clearCart: () => void;
    count: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (newItem) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.id === newItem.id && item.size === newItem.size
                    );
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === newItem.id && item.size === newItem.size
                                    ? { ...item, quantity: item.quantity + newItem.quantity }
                                    : item
                            ),
                        };
                    }
                    return { items: [...state.items, newItem] };
                }),
            removeItem: (id, size) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => !(item.id === id && item.size === size)
                    ),
                })),
            clearCart: () => set({ items: [] }),
            count: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
        }),
        {
            name: 'cart-storage',
        }
    )
);
