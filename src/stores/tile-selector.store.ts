import { create } from 'zustand';
import { TileData } from '../backend/board/tile';

type TileSelectorState = {
    selectedTile: (TileData & { x: number; y: number }) | null;
    selectTile: (tile: (TileData & { x: number; y: number }) | null) => void;
};

export const useTileSelectorStore = create<TileSelectorState>()((set) => {
    return {
        selectedTile: null,
        selectTile: (tile: (TileData & { x: number; y: number }) | null) => set({ selectedTile: tile }),
    };
});
