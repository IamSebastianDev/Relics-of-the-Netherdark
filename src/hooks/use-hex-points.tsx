import { useMemo } from 'react';
import * as THREE from 'three';

export const useHexPoints = ({ radius = 1 }) => {
    return useMemo(() => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 6; i++) {
            const angle = (Math.PI / 3) * i;
            pts.push(new THREE.Vector3(radius * Math.cos(angle), 0.01, radius * Math.sin(angle)));
        }
        return pts;
    }, [radius]);
};
