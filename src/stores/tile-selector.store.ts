import { create } from 'zustand';
import { TileCtor } from '../components/renderer/tile';

type TileSelectorState = {
    selectedTileId: string | null;
    selectTile: (tile: TileCtor | null) => void;
};

export const useTileSelectorStore = create<TileSelectorState>()((set) => {
    return {
        selectedTileId: null,
        selectTile: (tile: TileCtor | null) => set({ selectedTileId: tile?.id ?? null }),
    };
});
