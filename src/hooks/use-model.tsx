import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { Tile } from '../backend/board/tile';

const models = new Map<Tile['type'], string>();
models.set('void', './models/void.glb');
models.set('bone-hoards', './models/bone-hoards.glb');
models.set('fungal-fields', './models/fungal-fields.glb');
models.set('gemstone-caverns', './models/gemstone-caverns.glb');
models.set('twisted-tunnels', './models/twisted-tunnels.glb');
models.set('miners-enclaves', './models/miners-enclaves.glb');

export const useModel = (type: Tile['type']) => {
    const { scene } = useGLTF(models.get(type)!);
    return useMemo(() => scene.clone(), [scene]);
};
