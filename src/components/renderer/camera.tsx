import { CameraControls, OrthographicCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';
import { useTileControllerStore } from '../../stores/tile-controller.store';

const CAMERA_PROPS = {
    zoom: 65,
    near: 1,
    far: 100,
};

export const Camera = () => {
    const controllerRef = useRef<CameraControls | null>(null);
    const { camera } = useThree();
    const { focusedTile } = useTileControllerStore();

    useEffect(() => {
        if (focusedTile) {
            controllerRef.current?.moveTo(focusedTile.x, 0, focusedTile.y, true);
        }
    }, [focusedTile]);

    return (
        <>
            <OrthographicCamera makeDefault position={[0, 50, 10]} {...CAMERA_PROPS} />
            <CameraControls
                ref={controllerRef}
                camera={camera}
                maxZoom={100}
                minZoom={40}
                azimuthRotateSpeed={0}
                polarRotateSpeed={0}
                polarAngle={degToRad(60)}
                azimuthAngle={degToRad(45)}
            />
        </>
    );
};
