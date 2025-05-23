import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { Tile } from '../components/renderer/tile';

type Markers = 'shrine' | 'henge-stone';

const models = new Map<Tile['type'] | Markers, string>();
models.set('void', './models/void.glb');
models.set('bone-hoards', './models/bone-hoards.glb');
models.set('fungal-fields', './models/fungal-fields.glb');
models.set('gemstone-caverns', './models/gemstone-caverns.glb');
models.set('twisted-tunnels', './models/twisted-tunnels.glb');
models.set('miners-enclaves', './models/miners-enclaves.glb');
models.set('entrance', './models/entrance.glb');
models.set('undiscovered', './models/undiscovered.glb');
models.set('ancient-shrines', './models/ancient-shrines.glb');
models.set('hollow-henge', './models/hollow-henge.glb');
models.set('henge-stone', './models/henge-stone.glb');
models.set('shrine', './models/shrine.glb');

// Preload all models, to avoid random jumps
// later on, when tiles are discovered.
for (const entry of models.values()) {
    useGLTF.preload(entry);
}

export const useModel = (type: Tile['type'] | Markers) => {
    const { scene } = useGLTF(models.get(type)!);
    return useMemo(() => scene.clone(true), [scene]);
};
