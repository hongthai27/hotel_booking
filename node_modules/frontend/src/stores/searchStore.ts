import { create } from 'zustand';

interface SearchState {
  checkIn: string;
  checkOut: string;
  guests: number;
  setSearchData: (data: { checkIn?: string; checkOut?: string; guests?: number }) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  checkIn: '',
  checkOut: '',
  guests: 1,
  setSearchData: (data) => set((state) => ({ ...state, ...data })),
}));