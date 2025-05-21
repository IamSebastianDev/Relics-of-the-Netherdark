import { useMemo } from 'react';
import { PlayerId } from 'rune-sdk';
import { degToRad } from 'three/src/math/MathUtils.js';
import { TileData } from '../../../backend/board/tile';
import { useModel } from '../../../hooks/use-model';
import { PlayerMarker } from './player-marker';

const HengeStone = ({ playerId, rotation }: { playerId: PlayerId; rotation: number }) => {
    const stone = useModel('henge-stone');

    // Use polar coordinates to calculate position
    const position = useMemo(() => {
        const radius = 0.6; // Distance from center
        const angleRad = degToRad(rotation);
        return [Math.cos(angleRad) * radius, 0, Math.sin(angleRad) * radius] as const;
    }, [rotation]);

    return (
        <group scale={[0.7, 0.9, 0.7]} position={position} rotation={[0, degToRad(rotation), 0]}>
            <group position={[0, -0.25, 0]} scale={1.1}>
                <PlayerMarker playerId={playerId} />
            </group>
            <primitive object={stone} />
        </group>
    );
};

export const HengeStones = ({ tile }: { tile: TileData }) => {
    return (
        <group position={[0, 0.25, 0]}>
            {tile.shared.length > 0 &&
                tile.shared.map((playerId, idx) => (
                    <HengeStone key={playerId} playerId={playerId} rotation={idx * 60} />
                ))}
        </group>
    );
};
