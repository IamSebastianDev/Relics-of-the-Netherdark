import { Tile } from '../../backend/board/tile';
import { useModel } from '../../hooks/use-model';
import { useRandomRotation } from '../../scenes/use-random-rotation';
type TileRendererProps = Pick<Tile, 'x' | 'y' | 'type' | 'discovered' | 'playerId' | 'id'>;
export const TileRenderer = ({ type, ...props }: TileRendererProps) => {
    const model = useModel(props.discovered ? type : 'undiscovered');

    // Randomized but deterministic rotation (based on tile ID hash)
    // which gives the board a more random board game like look.
    const rotationY = useRandomRotation(props.id);

    if (type === 'void') {
        return null;
    }

    return (
        <group onClick={() => console.log({ props, type })}>
            <primitive object={model} position={[props.x, 0, props.y]} rotation={[0, rotationY, 0]} />
        </group>
    );
};
