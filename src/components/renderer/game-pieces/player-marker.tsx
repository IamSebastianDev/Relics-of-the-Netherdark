import { PlayerId } from 'rune-sdk';
import * as THREE from 'three';
import { usePlayerMarker } from '../../../hooks/use-player-marker';
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
