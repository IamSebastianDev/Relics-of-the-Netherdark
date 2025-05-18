import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { Tile } from '../backend/board/tile';

const models = new Map<Tile['type'], string>();
models.set('void', './models/void.glb');
models.set('bone-hoard', './models/bone-hoard.glb');
models.set('fungal-forest', './models/fungal-forest.glb');
models.set('gemstone-caverns', './models/gemstone-caverns.glb');
models.set('twisted-tunnels', './models/twisted-tunnels.glb');

export const useModel = (type: Tile['type']) => {
    const { scene } = useGLTF(models.get(type)!);
    return useMemo(() => scene.clone(), [scene]);
};
