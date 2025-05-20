import { create } from 'zustand';
import { TileData } from '../backend/board/tile';

type TileControllerState = {
    focusedTile: TileData | null;
    focusTile: (tile: TileData | null) => void;
};

export const useTileControllerStore = create<TileControllerState>()((set) => {
    return {
        focusedTile: null,
        focusTile: (tile: TileData | null) => set({ focusedTile: tile }),
    };
});
