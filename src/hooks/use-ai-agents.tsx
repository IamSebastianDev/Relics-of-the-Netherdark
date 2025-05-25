import { Grid, spiral } from 'honeycomb-grid';
import { useEffect, useRef } from 'react';
import { Tile } from '../components/renderer/tile';
import { useGameState } from '../providers/game-state.provider';
import { useGrid } from './use-grid';

type AiSelectorRule = {
    condition: (tile: Tile, grid: Grid<Tile>) => boolean;
    weight: number;
};

const rules: AiSelectorRule[] = [
    // Tile is empty. If all other rules fail, this one gives the baseline
    {
        condition: (tile) => tile.playerId === null,
        weight: 1,
    },
    // Tile is a bad type
    {
        condition: (tile) => ['bone-hoards', 'twisted-tunnels'].includes(tile.type),
        weight: 0,
    },
    // Tile is a miners enclave or fungal forest
    {
        condition: (tile) => ['miners-enclaves', 'fungal-fields'].includes(tile.type),
        weight: 3,
    },
    // Tile is a gemstone Cavern
    {
        condition: (tile) => tile.type === 'gemstone-caverns',
        weight: 4,
    },
    // Tile is next to a henge
    {
        condition: (tile, grid) => {
            const neighbors = grid.traverse(spiral({ start: tile, radius: 1 }));
            return neighbors
                .toArray()
                .filter((tile) => tile.discovered)
                .some((tile) => tile.type === 'hollow-henge');
        },
        weight: 8,
    },
    // Tile is next to a shrine
    {
        condition: (tile, grid) => {
            const neighbors = grid.traverse(spiral({ start: tile, radius: 1 }));
            return neighbors
                .toArray()
                .filter((tile) => tile.discovered && tile.playerId === null)
                .some((tile) => tile.type === 'ancient-shrines');
        },
        weight: 20,
    },
];

// We describe a simple rules engine, that based on the board state,
// deceides whats the best tile for the ai to pick is.
const getAiTile = (grid: Grid<Tile>): Tile => {
    const tileScores = grid
        .toArray()
        .filter((tile) => tile.discovered && tile.playerId === null && tile.type === 'void')
        .map((tile) => {
            let score = 0;
            for (const rule of rules) {
                if (rule.condition(tile, grid)) {
                    score += rule.weight;
                }
            }
            return { tile, score };
        });

    const maxScore = Math.max(...tileScores.map((t) => t.score));
    const bestTiles = tileScores.filter((t) => t.score === maxScore);

    return bestTiles[Math.floor(Math.random() * bestTiles.length)].tile;
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
