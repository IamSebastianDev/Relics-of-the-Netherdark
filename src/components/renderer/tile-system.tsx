import { Html } from '@react-three/drei';
import { useMemo } from 'react';
import claim from '../../assets/icons/claim-icon.png';
import details from '../../assets/icons/details-icon.png';
import { useGrid } from '../../hooks/use-grid';
import { useTileStore } from '../../stores/tile.store';
import { TileRenderer } from './tile-renderer';

type Action = { id: string; action: () => void; disabled: boolean; icon: string };

export const ContextAction = ({ action, disabled, icon }: Action) => {
    return (
        <button onClick={action} disabled={disabled} className="context-action">
            <img src={icon} />
        </button>
    );
};

const ContextMenu = () => {
    const { selectedTile, tileData, selectTile } = useTileStore();

    if (!selectedTile || !tileData) return null;

    const actions: Action[] = [
        {
            id: 'details',
            action: () => {
                console.log({ selectedTile, tileData });
            },
            disabled: false,
            icon: details,
        },
        {
            id: 'claim',
            action: () => {
                Rune.actions.claimTile([tileData.id, tileData.position]);
                selectTile(null);
            },
            disabled: false,
            icon: claim,
        },
    ];

    return (
        <Html pointerEvents={'none'} position={[tileData.position.x, 0, tileData.position.y]}>
            <div className="context-shell">
                {actions.map((action) => (
                    <ContextAction key={action.id} {...action} />
                ))}
            </div>
        </Html>
    );
};

export const Grid = () => {
    const grid = useGrid();
    const tiles = useMemo(() => grid.toArray(), [grid]);

    return (
        <>
            <ContextMenu />
            {tiles.map((tile) => (
                <TileRenderer key={tile.id} {...{ ...tile, position: tile.position }} />
            ))}
        </>
    );
};
