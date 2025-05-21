import { Line } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import React, { useEffect, useMemo } from 'react';
import { PlayerId } from 'rune-sdk';
import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { TileData } from '../../backend/board/tile';
import { useHexPoints } from '../../hooks/use-hex-points';
import { useIsInteractive } from '../../hooks/use-is-interactive';
import { useModel } from '../../hooks/use-model';
import { usePlayerMarker } from '../../hooks/use-player-marker';
import { usePulse } from '../../hooks/use-pulse';
import { useRandomRotation } from '../../scenes/use-random-rotation';
import { useTileControllerStore } from '../../stores/tile-controller.store';
import { useTileOverviewStore } from '../../stores/tile-overview.store';
import { useTileSelectorStore } from '../../stores/tile-selector.store';

const TowerSegment = ({ playerId, y }: { playerId: PlayerId; y: number }) => {
    const towerSegment = useModel('tower-segment');
    const segment = useMemo(() => towerSegment.clone(true), [towerSegment]);

    const playerAttribute = usePlayerMarker(playerId);

    useEffect(() => {
        segment.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material && 'color' in mesh.material) {
                    mesh.material = (mesh.material as THREE.Material).clone();
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.color.set('#ffffff');
                    mat.color.multiply(new THREE.Color(playerAttribute.color));
                    mat.emissive = new THREE.Color(playerAttribute.color);
                    mat.emissiveIntensity = 0.2;
                    mat.needsUpdate = true;
                }
            }
        });
    }, [segment, playerAttribute.color]);

    return (
        <group position={[0, 0.5 + y * 0.4, 0]} scale={[1, 0.4, 1]}>
            <primitive object={segment} />
        </group>
    );
};

const WizardTower = ({ sharedPlayers = [] }: { sharedPlayers: PlayerId[] }) => {
    const towerBase = useModel('tower-base');
    const towerTop = useModel('tower-top');

    return (
        <group scale={0.4}>
            <group position={[0, 0.5, 0]} scale={1.2}>
                <primitive object={towerBase} />
            </group>
            {sharedPlayers.map((player, idx) => {
                return <TowerSegment key={player} playerId={player} y={0.5 + 0.25 + idx} />;
            })}
            <group position={[0, 0.5 + 0.25 + sharedPlayers.length * 0.4, 0]} scale={[1.1, 0.7, 1.1]}>
                <primitive object={towerTop} />
            </group>
        </group>
    );
};

export const PlayerMarker = ({ playerId }: { playerId: PlayerId }) => {
    const { texture, color } = usePlayerMarker(playerId);

    return (
        <group position={[0, 0.25, 0]}>
            <mesh>
                <cylinderGeometry args={[0.35, 0.35, 0.1, 32]} />
                <meshStandardMaterial color="#333" roughness={0.8} metalness={0.5} />
            </mesh>

            <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>

            <mesh position={[0, 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.75}>
                <planeGeometry args={[0.3, 0.3]} />
                <meshBasicMaterial map={texture} transparent color="white" depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

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

const MissionTowerTile = ({ tile, onClick, model }: TileProps) => {
    const { selectedTile } = useTileSelectorStore();
    const { type, position, discovered, ...props } = tile;
    const orientation = useRandomRotation(props.id);

    return (
        <group onClick={onClick} position={[position.x, 0, position.y]}>
            <primitive object={model} rotation={[0, orientation, 0]} />
            {isSelected(selectedTile?.id ?? null, props.id) && <HexTopOutline color={'white'} />}
            {tile.shared?.length > 0 && <WizardTower sharedPlayers={tile.shared} />}
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
        case 'wizards-towers':
            return <MissionTowerTile tile={tile} onClick={handleClick} model={model} />;
        case 'ancient-shrines':
            return <AncientShrineTile tile={tile} onClick={handleClick} model={model} />;
        default:
            return <StandardTile tile={tile} onClick={handleClick} model={model} />;
    }
});
