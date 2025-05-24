import { CameraControls, OrthographicCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';
import { useTileControllerStore } from '../../stores/tile-controller.store';

const CAMERA_PROPS = {
    zoom: 65,
    near: 1,
    far: 100,
};

export const useFrustum = (frustumHeight: number) => {
    const { size } = useThree();
    const aspect = size.width / size.height;

    return useMemo(() => {
        const frustumWidth = frustumHeight * aspect;
        return {
            left: -frustumWidth / 2,
            right: frustumWidth / 2,
            top: frustumHeight / 2,
            bottom: -frustumHeight / 2,
        };
    }, [aspect, frustumHeight]);
};

export const Camera = () => {
    const controllerRef = useRef<CameraControls | null>(null);
    const { camera } = useThree();
    const { focusedTile } = useTileControllerStore();
    const frustum = useFrustum(500);

    useEffect(() => {
        if (focusedTile) {
            controllerRef.current?.moveTo(focusedTile.x, 0, focusedTile.y, true);
        }
    }, [focusedTile]);

    return (
        <>
            <OrthographicCamera
                makeDefault
                position={[0, 50, 10]}
                zoom={CAMERA_PROPS.zoom}
                near={CAMERA_PROPS.near}
                far={CAMERA_PROPS.far}
                {...frustum}
            />
            <CameraControls
                ref={controllerRef}
                camera={camera}
                maxZoom={100}
                minZoom={30}
                azimuthRotateSpeed={0}
                polarRotateSpeed={0}
                polarAngle={degToRad(60)}
                azimuthAngle={degToRad(45)}
                dampingFactor={0.1}
                makeDefault
                touches={{
                    one: 128,
                    two: 2048,
                    three: 0,
                }}
            />
        </>
    );
};
