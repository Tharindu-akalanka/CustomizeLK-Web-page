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
    updateItemSize: (id: string, oldSize: string, newSize: string) => void;
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
            updateItemSize: (id, oldSize, newSize) =>
                set((state) => {
                    // 1. Find the item being updated
                    const itemToUpdate = state.items.find(
                        (item) => item.id === id && item.size === oldSize
                    );
                    if (!itemToUpdate) return state; // Should not happen

                    // 2. Check if an item with the NEW size already exists
                    const existingTargetItem = state.items.find(
                        (item) => item.id === id && item.size === newSize
                    );

                    if (existingTargetItem) {
                        // Merge strategies: remove the old one, update the new one's quantity
                        return {
                            items: state.items
                                .filter((item) => !(item.id === id && item.size === oldSize)) // Remove old
                                .map((item) =>
                                    item.id === id && item.size === newSize
                                        ? { ...item, quantity: item.quantity + itemToUpdate.quantity } // Update new
                                        : item
                                ),
                        };
                    } else {
                        // Just update the size of the existing item
                        return {
                            items: state.items.map((item) =>
                                item.id === id && item.size === oldSize
                                    ? { ...item, size: newSize }
                                    : item
                            ),
                        };
                    }
                }),
            clearCart: () => set({ items: [] }),
            count: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
        }),
        {
            name: 'cart-storage',
        }
    )
);
