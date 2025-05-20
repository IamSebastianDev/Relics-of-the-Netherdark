import { create } from 'zustand';

type TileOverviewState = {
    overviewEnabled: boolean;
    showOverview: (state: boolean) => void;
};

export const useTileOverviewStore = create<TileOverviewState>()((set) => {
    return {
        overviewEnabled: false,
        showOverview: (state: boolean) => set({ overviewEnabled: state }),
    };
});
