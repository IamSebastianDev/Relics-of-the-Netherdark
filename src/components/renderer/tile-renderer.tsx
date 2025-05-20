import { Line } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import React from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';
import { TileData } from '../../backend/board/tile';
import { useHexPoints } from '../../hooks/use-hex-points';
import { useIsInteractive } from '../../hooks/use-is-interactive';
import { useModel } from '../../hooks/use-model';
import { usePlayerColor } from '../../hooks/use-player-color';
import { usePulse } from '../../hooks/use-pulse';
import { useRandomRotation } from '../../scenes/use-random-rotation';
import { useTileControllerStore } from '../../stores/tile-controller.store';
import { useTileOverviewStore } from '../../stores/tile-overview.store';
import { useTileSelectorStore } from '../../stores/tile-selector.store';

/** @todo -> Make better (And probably rather a circle) */
export const HexTopOutline = ({ color = 'white' }) => {
    const points = useHexPoints({ radius: 1 });
    const pulse = usePulse();

    return (
        <group {...pulse} rotation={[0, degToRad(30), 0]} position={[0, 0.275, 0]} scale={0.8}>
            <Line points={points} transparent depthWrite={false} opacity={0.15} color={color} lineWidth={4} />
            <Line points={points} transparent depthWrite={false} opacity={0.5} color={color} lineWidth={2} />
        </group>
    );
};

const isSelected = (key: string | null, id: string) => {
    return key === id;
};

export const TileRenderer = React.memo((tile: TileData) => {
    const { type, position, discovered, ...props } = tile;
    const model = useModel(discovered ? type : 'undiscovered');
    const isInteractive = useIsInteractive(tile);
    const { selectTile, selectedTile } = useTileSelectorStore();
    const { focusTile } = useTileControllerStore();
    const { showOverview } = useTileOverviewStore();
    const playerColor = usePlayerColor(props.playerId);

    // Randomized but deterministic rotation (based on tile ID hash)
    // which gives the board a more random board game like look.
    const pulseY = useRandomRotation(props.id);

    const handleClick = (ev: ThreeEvent<MouseEvent>) => {
        ev.stopPropagation();

        // On click, we select and focus the tile. We can
        // delegate all further actions to the corresponding
        // tile action rendered for the selected tile.
        // This enables us to show info for every tile, not just
        // tiles the player can interact with.
        showOverview(false);
        selectTile(tile);
        focusTile(tile);
    };

    if (type === 'void') {
        return null;
    }

    return (
        <group onClick={handleClick} position={[position.x, 0, position.y]}>
            <primitive object={model} rotation={[0, pulseY, 0]} />
            {isSelected(selectedTile?.id ?? null, props.id) && <HexTopOutline color={'white'} />}
            {isInteractive && <HexTopOutline color="green" />}
            {playerColor && (
                <mesh position={[0, 0.25, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 1.5, 20, 1]} />
                    <meshStandardMaterial color={playerColor} />
                </mesh>
            )}
        </group>
    );
});
