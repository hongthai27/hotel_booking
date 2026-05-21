import { create } from 'zustand';
import type { RoomType } from '../types/hotel.types';

interface CompareStore {
  items: RoomType[];
  add: (room: RoomType) => void;
  remove: (id: number) => void;
  clear: () => void;
  isSelected: (id: number) => boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  items: [],

  add: (room) => {
    const { items } = get();
    if (items.find((r) => r.id === room.id)) return;
    if (items.length >= 2) {
      // Thay thế cái cũ nhất
      set({ items: [items[1], room] });
    } else {
      set({ items: [...items, room] });
    }
  },

  remove: (id) =>
    set((s) => ({ items: s.items.filter((r) => r.id !== id) })),

  clear: () => set({ items: [] }),

  isSelected: (id) => get().items.some((r) => r.id === id),
}));