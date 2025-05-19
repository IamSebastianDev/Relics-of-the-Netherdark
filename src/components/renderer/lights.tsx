import { ContactShadows } from '@react-three/drei';

export const Lights = () => {
    return (
        <>
            <ContactShadows position={[0, -0.1, 0]} opacity={0.5} blur={1.5} scale={10} />
            <ambientLight intensity={1} />
            <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
            <pointLight position={[0, 3, 0]} intensity={10} />
        </>
    );
};
