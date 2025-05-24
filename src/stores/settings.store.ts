import { create } from 'zustand';

type SettingsState = {
    isOpen: boolean;
    toggle: (state: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()((set) => ({
    isOpen: false,
    toggle: (state: boolean) => set({ isOpen: state }),
}));
