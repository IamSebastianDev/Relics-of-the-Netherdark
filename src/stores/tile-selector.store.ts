import { create } from 'zustand';
import { TileCtor } from '../components/renderer/tile';

type TileSelectorState = {
    selectedTile: TileCtor | null;
    selectTile: (tile: TileCtor | null) => void;
};

export const useTileSelectorStore = create<TileSelectorState>()((set) => {
    return {
        selectedTile: null,
        selectTile: (tile: TileCtor | null) => set({ selectedTile: tile }),
    };
});
