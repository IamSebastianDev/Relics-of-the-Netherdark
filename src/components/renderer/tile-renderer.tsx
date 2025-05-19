import { Line } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils.js';
import { Tile } from '../../backend/board/tile';
import { useHexPoints } from '../../hooks/use-hex-points';
import { useModel } from '../../hooks/use-model';
import { usePulse } from '../../hooks/use-pulse';
import { useRandomRotation } from '../../scenes/use-random-rotation';

export const HexTopOutline = ({ radius = 1, color = 'white' }) => {
    const points = useHexPoints({ radius });
    const pulse = usePulse();

    return (
        <group {...pulse} rotation={[0, degToRad(30), 0]} position={[0, 0.275, 0]} scale={0.8}>
            <Line points={points} transparent opacity={0.15} depthWrite={false} color={'white'} lineWidth={8} />
            <Line points={points} color={color} lineWidth={2} />
        </group>
    );
};

type TileRendererProps = Pick<Tile, 'x' | 'y' | 'type' | 'discovered' | 'playerId' | 'id'>;
export const TileRenderer = ({ type, ...props }: TileRendererProps) => {
    const model = useModel(props.discovered ? type : 'undiscovered');
    // const model = useModel(type);

    // Randomized but deterministic rotation (based on tile ID hash)
    // which gives the board a more random board game like look.
    const rotationY = useRandomRotation(props.id);

    if (type === 'void') {
        return null;
    }

    const isInteractive = props.discovered;

    const handleClick = (ev: ThreeEvent<MouseEvent>) => {
        ev.stopPropagation();
        console.log({ type, ...props });
    };

    return (
        <group onClick={handleClick} position={[props.x, 0, props.y]}>
            <primitive object={model} rotation={[0, rotationY, 0]} />
            {isInteractive && <HexTopOutline />}
        </group>
    );
};
