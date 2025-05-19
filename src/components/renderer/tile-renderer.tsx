import { Tile } from '../../backend/board/tile';
import { useModel } from '../../hooks/use-model';
type TileRendererProps = Pick<Tile, 'x' | 'y' | 'type' | 'discovered' | 'playerId'>;
export const TileRenderer = ({ type, ...props }: TileRendererProps) => {
    const model = useModel('void');

    // if (type === 'void') {
    //     return null;
    // }

    return (
        <group onClick={() => console.log({ props })}>
            <primitive object={model} position={[props.x, 0, props.y]} />
            {props.playerId && (
                <mesh position={[props.x, 0.25, props.y]}>
                    <boxGeometry />
                    <meshBasicMaterial color={'red'} />
                </mesh>
            )}
        </group>
    );
};
