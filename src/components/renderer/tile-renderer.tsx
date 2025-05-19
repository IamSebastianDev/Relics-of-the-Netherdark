import { Tile } from '../../backend/board/tile';
import { useModel } from '../../hooks/use-model';
type TileRendererProps = Pick<Tile, 'x' | 'y' | 'type' | 'discovered' | 'playerId'>;
export const TileRenderer = ({ type, ...props }: TileRendererProps) => {
    const model = useModel(props.discovered ? type : 'undiscovered');

    if (type === 'void') {
        return null;
    }

    return (
        <group onClick={() => console.log({ props, type })}>
            <primitive object={model} position={[props.x, 0, props.y]} />
        </group>
    );
};
