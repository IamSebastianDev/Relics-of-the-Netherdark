import { Grid, GridAsJSON } from 'honeycomb-grid';
import { useMemo } from 'react';

import { Tile } from '../components/renderer/tile';
import { useGameState } from '../providers/game-state.provider';

export const useGrid = () => {
    const { board } = useGameState();
    return useMemo(
        () => Grid.fromJSON(board as GridAsJSON<Tile>, ({ q, r, ...ctor }) => Tile.create({ q, r }, ctor)),
        [board]
    );
};
