import { create } from 'zustand';
import { TileData } from '../backend/board/tile';

type TileSelectorState = {
    selectedTile: TileData | null;
    selectTile: (tile: TileData | null) => void;
};

export const useTileSelectorStore = create<TileSelectorState>()((set) => {
    return {
        selectedTile: null,
        selectTile: (tile: TileData | null) => set({ selectedTile: tile }),
    };
});
