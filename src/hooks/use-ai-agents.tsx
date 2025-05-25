import { Grid } from 'honeycomb-grid';
import { useEffect, useRef } from 'react';
import { Tile } from '../components/renderer/tile';
import { useGameState } from '../providers/game-state.provider';
import { useGrid } from './use-grid';

// We describe a simple rules engine, that based on the board state,
// deceides whats the best tile for the ai to pick is.
const getAiTile = (grid: Grid<Tile>): Tile => {
    // First run. Get a random, free, discovered tile
    return grid.toArray().find((tile) => tile.discovered && tile.playerId === null) as Tile;
};

export const useAiAgents = () => {
    const { hostPlayer, currentActivePlayer, localPlayerId } = useGameState();
    const grid = useGrid();
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // Cleanup on unmount or host/player change
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (hostPlayer !== localPlayerId || !currentActivePlayer?.startsWith('[ai]') || !grid) {
            return;
        }

        // Prevent stacking if effect runs again before timeout is cleared
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(
            () => {
                const next = getAiTile(grid);
                if (next) {
                    Rune.actions.claimTile([currentActivePlayer, { q: next.q, r: next.r }]);
                }
                timeoutRef.current = null;
            },
            Math.random() * 500 + 1000
        ); // 1500–1000ms delay
    }, [hostPlayer, localPlayerId, currentActivePlayer, grid]);
};
