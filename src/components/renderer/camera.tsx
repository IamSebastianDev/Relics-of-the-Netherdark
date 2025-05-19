import { CameraControls, OrthographicCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';

const CAMERA_PROPS = {
    zoom: 65,
    near: 0.1,
    far: 3000,
};

export const Camera = () => {
    const controllerRef = useRef<CameraControls | null>(null);
    const { camera } = useThree();

    return (
        <>
            <OrthographicCamera makeDefault position={[10, 10, 10]} {...CAMERA_PROPS} />
            <CameraControls
                ref={controllerRef}
                camera={camera}
                maxZoom={100}
                minZoom={40}
                azimuthRotateSpeed={0}
                polarRotateSpeed={0}
                polarAngle={degToRad(60)}
            />
        </>
    );
};
