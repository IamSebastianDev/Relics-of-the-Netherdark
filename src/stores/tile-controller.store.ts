import { create } from 'zustand';

type TileControllerState = {
    focusedTile: { x: number; y: number } | null;
    focusTile: (tile: { x: number; y: number } | null) => void;
};

export const useTileControllerStore = create<TileControllerState>()((set) => {
    return {
        focusedTile: null,
        focusTile: (tile: { x: number; y: number } | null) => set({ focusedTile: tile }),
    };
});
