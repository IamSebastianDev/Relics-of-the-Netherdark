import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { Tile } from '../backend/board/tile';

type TowerModels = 'tower-base' | 'tower-top' | 'tower-segment';

const models = new Map<Tile['type'] | TowerModels, string>();
models.set('void', './models/void.glb');
models.set('bone-hoards', './models/bone-hoards.glb');
models.set('fungal-fields', './models/fungal-fields.glb');
models.set('gemstone-caverns', './models/gemstone-caverns.glb');
models.set('twisted-tunnels', './models/twisted-tunnels.glb');
models.set('miners-enclaves', './models/miners-enclaves.glb');
models.set('entrance', './models/entrance.glb');
models.set('undiscovered', './models/undiscovered.glb');
models.set('ancient-shrines', './models/ancient-shrines.glb');
models.set('wizards-towers', './models/wizards-towers.glb');
models.set('the-mouth', './models/the-mouth.glb');
models.set('tower-base', './models/tower-base.glb');
models.set('tower-segment', './models/tower-segment.glb');
models.set('tower-top', './models/tower-top.glb');

// Preload all models, to avoid random jumps
// later on, when tiles are discovered.
for (const entry of models.values()) {
    useGLTF.preload(entry);
}

export const useModel = (type: Tile['type'] | TowerModels) => {
    const { scene } = useGLTF(models.get(type)!);
    return useMemo(() => scene.clone(true), [scene]);
};
