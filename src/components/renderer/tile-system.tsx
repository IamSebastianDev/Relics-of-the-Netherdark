import { useEffect, useMemo } from 'react';

import { useGrid } from '../../hooks/use-grid';
import { useGameState } from '../../providers/game-state.provider';
import { useTileControllerStore } from '../../stores/tile-controller.store';
import { ContextMenu } from '../ui/context-menu';
import { TileRenderer } from './tile-renderer';

export const Grid = () => {
    const { localPlayerId } = useGameState();
    const grid = useGrid();
    const tiles = useMemo(() => grid.toArray(), [grid]);
    const { focusTile } = useTileControllerStore();

    // biome-ignore lint: We want to focus the tile only once, then never again.
    useEffect(() => {
        focusTile(tiles.find((tile) => tile.playerId === localPlayerId && tile.type === 'entrance') ?? null);
    }, []);

    return (
        <>
            <ContextMenu />
            {tiles.map((tile) => (
                <TileRenderer
                    key={tile.id}
                    {...{
                        ...tile,
                        // Explicitly call the getters, to extract the
                        // data from the class instance and pass it as
                        // props to the renderer.
                        position: tile.position,
                        translationConfig: tile.translationConfig,
                    }}
                />
            ))}
        </>
    );
};
