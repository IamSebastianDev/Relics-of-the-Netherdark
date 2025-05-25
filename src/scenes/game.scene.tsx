import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Camera } from '../components/renderer/camera';
import { Lights } from '../components/renderer/lights';
import { Grid } from '../components/renderer/tile-system';
import { GameUi } from '../components/ui/game-ui';
import { Screen } from '../components/ui/screen';
import { useAiAgents } from '../hooks/use-ai-agents';
import { useTileSelectorStore } from '../stores/tile-selector.store';

/** @todo -> refactor, maybe integrate actual background texture */
const BackgroundPlane = () => {
    const { selectTile } = useTileSelectorStore();

    return (
        <mesh
            position={[0, 0, 0]} // Behind your tiles in Y
            rotation={[-Math.PI / 2, 0, 0]} // Flat horizontal
            onClick={(ev) => ev.intersections.length === 1 && selectTile(null)}
        >
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial transparent color="black" />
        </mesh>
    );
};

export const Game = React.memo(() => {
    useAiAgents();

    return (
        <Screen>
            <GameUi />
            <Canvas gl={{ toneMappingExposure: 1.5 }}>
                <Camera />
                <Lights />
                <Grid />
                <BackgroundPlane />
            </Canvas>
        </Screen>
    );
});
