import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

type UsePulseProps = {
    speed?: number;
    minY?: number;
    maxY?: number;
};

export const usePulse = ({ speed = 0.5, minY = 0.3, maxY = 0.35 }: UsePulseProps = {}) => {
    const ref = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const range = maxY - minY;
        const y = minY + Math.sin(t * Math.PI * 2 * speed) * (range / 2);
        if (ref.current) {
            ref.current.position.y = y;
        }
    });

    return { ref };
};
