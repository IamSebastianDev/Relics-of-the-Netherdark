import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Camera } from '../components/renderer/camera';
import { Screen } from '../components/ui/screen';

export const Main = React.memo(() => {
    return (
        <Screen>
            <Canvas>
                <Camera />
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 5, 2]} intensity={1.5} castShadow />
            </Canvas>
        </Screen>
    );
});
