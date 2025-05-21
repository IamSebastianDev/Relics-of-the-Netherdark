import { useEffect } from 'react';
import { PlayerId } from 'rune-sdk';
import * as THREE from 'three';

import { useModel } from '../../../hooks/use-model';
import { usePlayerMarker } from '../../../hooks/use-player-marker';

export const Shrine = ({ playerId }: { playerId: PlayerId }) => {
    const { color } = usePlayerMarker(playerId);
    const shrine = useModel('shrine');

    useEffect(() => {
        shrine.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material && 'color' in mesh.material) {
                    mesh.material = (mesh.material as THREE.Material).clone();

                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.color.set(new THREE.Color(color));
                    mat.emissive = new THREE.Color(color);
                    mat.emissiveIntensity = 0;
                    mat.needsUpdate = true;
                }
            }
        });
    }, [shrine, color]);

    return (
        <group position={[0, 0.25, 0]} scale={[0.65, 0.65, 0.45]}>
            <primitive object={shrine} />
        </group>
    );
};
