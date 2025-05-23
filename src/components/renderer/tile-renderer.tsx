import { Line } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
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
import { Shrine } from './game-pieces/shrine';
import { TileCtor } from './tile';

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
    tile: TileCtor;
    onClick: (ev: ThreeEvent<MouseEvent>) => void;
    model: THREE.Group<THREE.Object3DEventMap>;
};

const MissionGiverTile = ({ tile, onClick, model, x, y }: TileProps & { x: number; y: number }) => {
    const { selectedTile } = useTileSelectorStore();
    const { type, discovered, ...props } = tile;
    const orientation = useRandomRotation(props.id);

    return (
        <group onClick={onClick} position={[x, 0, y]}>
            <primitive object={model} rotation={[0, orientation, 0]} />
            {isSelected(selectedTile?.id ?? null, props.id) && <HexTopOutline color={'white'} />}
            {tile.shared.length > 0 && <HengeStones tile={tile} />}
        </group>
    );
};

const AncientShrineTile = ({ tile, onClick, model, x, y }: TileProps & { x: number; y: number }) => {
    const { selectedTile } = useTileSelectorStore();
    const { type, discovered, ...props } = tile;
    const orientation = useRandomRotation(props.id);

    return (
        <group onClick={onClick} position={[x, 0, y]}>
            <primitive object={model} rotation={[0, orientation, 0]} />
            {isSelected(selectedTile?.id ?? null, props.id) && <HexTopOutline color={'white'} />}
            {tile.playerId && <Shrine playerId={tile.playerId} />}
        </group>
    );
};

const StandardTile = ({ tile, onClick, model, x, y }: TileProps & { x: number; y: number }) => {
    const isInteractive = useIsInteractive(tile);
    const { selectedTile } = useTileSelectorStore();
    const { type, discovered, ...props } = tile;
    const orientation = useRandomRotation(props.id);

    return (
        <group onClick={onClick} position={[x, 0, y]}>
            <primitive object={model} rotation={[0, orientation, 0]} />
            {isSelected(selectedTile?.id ?? null, props.id) && <HexTopOutline color={'white'} />}
            {isInteractive && <HexTopOutline color="green" />}
            {tile.playerId && <PlayerMarker playerId={tile.playerId} />}
        </group>
    );
};

export const TileRenderer = React.memo((tile: TileCtor & { x: number; y: number }) => {
    const { type, discovered, x, y } = tile;
    const model = useModel(discovered ? type : 'undiscovered');

    const { selectTile } = useTileSelectorStore();
    const { focusTile } = useTileControllerStore();
    const { showOverview } = useTileOverviewStore();

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

    switch (tile.type) {
        // Void tiles are not rendered at all
        case 'void':
            return null;
        case 'hollow-henge':
            return <MissionGiverTile tile={tile} onClick={handleClick} model={model} x={x} y={y} />;
        case 'ancient-shrines':
            return <AncientShrineTile tile={tile} onClick={handleClick} model={model} x={x} y={y} />;
        default:
            return <StandardTile tile={tile} onClick={handleClick} model={model} x={x} y={y} />;
    }
});
