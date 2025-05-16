import { ContactShadows, useGLTF } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import React, { useMemo } from "react";
import { Camera } from "../components/renderer/camera";
import { Screen } from "../components/ui/screen";

const modelMap = {
    "fungal-forest": "./models/fungal-forest.glb",
    "gemstone-caverns": "./models/gemstone-caverns.glb",
};

const Tile = ({ model, ...props }: { position: Vector3; model: keyof typeof modelMap }) => {
    const path = modelMap[model];
    const { scene } = useGLTF(path);
    const clonedScene = useMemo(() => scene.clone(true), [scene]);
    console.log({ mat: scene.children[0] });
    return <primitive object={clonedScene} {...props} />;
};

export const Main = React.memo(() => {
    return (
        <Screen>
            <Canvas gl={{ toneMappingExposure: 1.5 }}>
                <Camera />
                <ContactShadows position={[0, -0.1, 0]} opacity={0.5} blur={1.5} scale={10} />
                <ambientLight intensity={1} />
                <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
                <pointLight position={[0, 3, 0]} intensity={10} />

                <Tile model="fungal-forest" position={[0, 0, 0]} />
                <Tile model="fungal-forest" position={[1.75, 0, 0]} />
                <Tile model="gemstone-caverns" position={[0.9, 0, 1.5]} />
            </Canvas>
        </Screen>
    );
});
