import { useMemo } from 'react';
import { TileData } from '../backend/board/tile';

export type TileAction = {
    id: string;
    icon: string;
    label: string;
    disabled: boolean;
    action: () => void;
};

// const actions: Action[] = [
//     {
//         id: 'details',
//         action: () => {
//             console.log({ selectedTile });
//             showOverview(true);
//         },
//         disabled: false,
//         icon: details,
//     },
//     {
//         id: 'claim',
//         action: () => {
//             Rune.actions.claimTile([selectedTile.id, selectedTile.position]);
//             selectTile(null);
//             showOverview(false);
//         },
//         disabled: false,
//         icon: claim,
//     },
// ];

export const useTileActions = (tile: TileData | null): TileAction[] => {
    return useMemo(() => {
        return [];
    }, [tile]);
};
