import { Line } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import React from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';
import { TileInfo } from '../../backend/board/tile';
import { useHexPoints } from '../../hooks/use-hex-points';
import { useIsInteractive } from '../../hooks/use-is-interactive';
import { useModel } from '../../hooks/use-model';
import { usePlayerColor } from '../../hooks/use-player-color';
import { usePulse } from '../../hooks/use-pulse';
import { useRandomRotation } from '../../scenes/use-random-rotation';
import { useTileStore } from '../../stores/tile.store';

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

export const TileRenderer = React.memo(({ type, position, ...props }: TileInfo) => {
    const model = useModel(props.discovered ? type : 'undiscovered');
    const isInteractive = useIsInteractive({ type, ...props });
    const { selectedTile, selectTile } = useTileStore();
    const playerColor = usePlayerColor(props.playerId);

    // Randomized but deterministic rotation (based on tile ID hash)
    // which gives the board a more random board game like look.
    const pulseY = useRandomRotation(props.id);

    const handleClick = (ev: ThreeEvent<MouseEvent>) => {
        ev.stopPropagation();

        // Bail early if the tile is not interactive
        if (!isInteractive) return;

        // Otherwise, we just select the tile.
        // This will open the context menu and allow
        // for actions to be taken
        selectTile({ ...props, position, type });
    };

    if (type === 'void') {
        return null;
    }

    return (
        <group onClick={handleClick} position={[position.x, 0, position.y]}>
            <primitive object={model} rotation={[0, pulseY, 0]} />
            {isInteractive && <HexTopOutline color={isSelected(selectedTile, props.id) ? 'red' : 'white'} />}
            {playerColor && (
                <mesh position={[0, 0.25, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 1.5, 20, 1]} />
                    <meshStandardMaterial color={playerColor} />
                </mesh>
            )}
        </group>
    );
});
