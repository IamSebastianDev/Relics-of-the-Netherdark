import { create } from 'zustand';

type JournalState = {
    isOpen: boolean;
    toggle: (state: boolean) => void;
};

export const useJournalStore = create<JournalState>()((set) => ({
    isOpen: false,
    toggle: (state: boolean) => set({ isOpen: state }),
}));
