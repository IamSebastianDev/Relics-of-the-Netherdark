import { Html } from '@react-three/drei';
import { TileAction, useTileActions } from '../../hooks/use-tile-actions';
import { useTileSelectorStore } from '../../stores/tile-selector.store';

export const ContextQuickAction = ({ action, disabled, icon }: TileAction) => {
    return (
        <button
            onClick={(event) => {
                event.stopPropagation();
                action();
            }}
            disabled={disabled}
            className="context-action"
        >
            <img src={icon} />
        </button>
    );
};

export const ContextMenu = () => {
    const { selectedTile } = useTileSelectorStore();

    const actions = useTileActions(selectedTile);

    if (!selectedTile || actions.length === 0) return null;

    return (
        <Html pointerEvents={'none'} position={[selectedTile.x, 0, selectedTile.y]}>
            <div className="context-shell">
                {actions.map((action) => (
                    <ContextQuickAction key={action.id} {...action} />
                ))}
            </div>
        </Html>
    );
};
