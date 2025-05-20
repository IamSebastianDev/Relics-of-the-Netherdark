import { Grid } from 'honeycomb-grid';
import { useMemo } from 'react';
import { Tile } from '../backend/board/tile';
import { useGameState } from '../providers/game-state.provider';

export const useGrid = () => {
    const { board } = useGameState();
    return useMemo(() => Grid.fromJSON(board, ({ q, r, ...ctor }) => Tile.create({ q, r }, ctor)), [board]);
};
