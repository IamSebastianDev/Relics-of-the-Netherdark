import { create } from 'zustand';
import { TileInfo } from '../backend/board/tile';

type TileState = {
    selectedTile: string | null;
    tileData: TileInfo | null;
    selectTile: (props: TileInfo | null) => void;
};

export const useTileStore = create<TileState>()((set) => ({
    selectedTile: null,
    tileData: null,
    selectTile: (props: TileInfo | null) => set({ selectedTile: props?.id ?? null, tileData: props ?? null }),
}));
