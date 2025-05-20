import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Camera } from '../components/renderer/camera';
import { Lights } from '../components/renderer/lights';
import { Grid } from '../components/renderer/tile-system';
import { GameUi } from '../components/ui/game-ui';
import { Screen } from '../components/ui/screen';

export const Game = React.memo(() => {
    return (
        <Screen>
            <GameUi />
            <Canvas gl={{ toneMappingExposure: 1.5 }}>
                <Camera />
                <Lights />
                <Grid />
            </Canvas>
        </Screen>
    );
});
