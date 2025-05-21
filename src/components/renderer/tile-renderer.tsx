import { Line } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { TileData } from '../../backend/board/tile';
import { useHexPoints } from '../../hooks/use-hex-points';
import { useIsInteractive } from '../../hooks/use-is-interactive';
import { useModel } from '../../hooks/use-model';
import { usePulse } from '../../hooks/use-pulse';
import { useRandomRotation } from '../../scenes/use-random-rotation';
import { useTileControllerStore } from '../../stores/tile-controller.store';
import { useTileOverviewStore } from '../../stores/tile-overview.store';
import { useTileSelectorStore } from '../../stores/tile-selector.store';
import { HengeStones } from './game-pieces/henge-stones';
import { PlayerMarker } from './game-pieces/player-marker';

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

type TileProps = {
    tile: TileData;
    onClick: (ev: ThreeEvent<MouseEvent>) => void;
    model: THREE.Group<THREE.Object3DEventMap>;
};

const MissionGiverTile = ({ tile, onClick, model }: TileProps) => {
    const { selectedTile } = useTileSelectorStore();
    const { type, position, discovered, ...props } = tile;
    const orientation = useRandomRotation(props.id);

    return (
        <group onClick={onClick} position={[position.x, 0, position.y]}>
            <primitive object={model} rotation={[0, orientation, 0]} />
            {isSelected(selectedTile?.id ?? null, props.id) && <HexTopOutline color={'white'} />}
            {tile.shared.length > 0 && <HengeStones tile={tile} />}
        </group>
    );
};

const AncientShrineTile = ({ tile, onClick, model }: TileProps) => {
    const { selectedTile } = useTileSelectorStore();
    const { type, position, discovered, ...props } = tile;
    const orientation = useRandomRotation(props.id);

    return (
        <group onClick={onClick} position={[position.x, 0, position.y]}>
            <primitive object={model} rotation={[0, orientation, 0]} />
            {isSelected(selectedTile?.id ?? null, props.id) && <HexTopOutline color={'white'} />}
        </group>
    );
};

const StandardTile = ({ tile, onClick, model }: TileProps) => {
    const isInteractive = useIsInteractive(tile);
    const { selectedTile } = useTileSelectorStore();
    const { type, position, discovered, ...props } = tile;
    const orientation = useRandomRotation(props.id);

    return (
        <group onClick={onClick} position={[position.x, 0, position.y]}>
            <primitive object={model} rotation={[0, orientation, 0]} />
            {isSelected(selectedTile?.id ?? null, props.id) && <HexTopOutline color={'white'} />}
            {isInteractive && <HexTopOutline color="green" />}
            {tile.playerId && <PlayerMarker playerId={tile.playerId} />}
        </group>
    );
};

export const TileRenderer = React.memo((tile: TileData) => {
    const { type, discovered } = tile;
    const model = useModel(discovered ? type : 'undiscovered');

    const { selectTile } = useTileSelectorStore();
    const { focusTile } = useTileControllerStore();
    const { showOverview } = useTileOverviewStore();

    // Randomized but deterministic rotation (based on tile ID hash)
    // which gives the board a more random board game like look.

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

    switch (tile.type) {
        // Void tiles are not rendered at all
        case 'void':
            return null;
        case 'hollow-henge':
            return <MissionGiverTile tile={tile} onClick={handleClick} model={model} />;
        case 'ancient-shrines':
            return <AncientShrineTile tile={tile} onClick={handleClick} model={model} />;
        default:
            return <StandardTile tile={tile} onClick={handleClick} model={model} />;
    }
});
