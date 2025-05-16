import { Canvas } from "@react-three/fiber";
import React from "react";
import { Screen } from "../components/ui/screen";

export const Main = React.memo(() => {
    return (
        <Screen>
            <Canvas>
                <ambientLight intensity={1} />
                <pointLight position={[2, 2, 2]} intensity={10} />
                <mesh>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshBasicMaterial color={"red"} />
                </mesh>
            </Canvas>
        </Screen>
    );
});
