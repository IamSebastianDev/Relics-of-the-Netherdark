import { Html } from '@react-three/drei';
import { Grid, spiral } from 'honeycomb-grid';
import { JSX, PropsWithChildren, useEffect } from 'react';
import { PlayerId } from 'rune-sdk';
import { TutorialKey } from '../../backend/player/tutorial';
import { useGrid } from '../../hooks/use-grid';
import { useGameState } from '../../providers/game-state.provider';
import { useLanguage } from '../../providers/language.provider';
import { useTileControllerStore } from '../../stores/tile-controller.store';
import { Tile } from '../renderer/tile';

const TutorialCard = ({ tile, children, handler }: PropsWithChildren<{ tile: Tile; handler: () => void }>) => {
    const { focusTile } = useTileControllerStore();
    // Focus the tile on instance
    // biome-ignore lint: Is fine that way.
    useEffect(() => focusTile(tile), []);

    return (
        <Html position={[tile.x, 0, tile.y]}>
            <button className="tutorial-card" onClick={handler}>
                {children}
            </button>
        </Html>
    );
};

const SelectTileTutorial = ({ tile }: { tile: Tile }) => {
    const { translate: t } = useLanguage();
    const handleOnComplete = () => {
        Rune.actions.acknowledgeTutorial('selectTile');
    };

    return (
        <TutorialCard handler={handleOnComplete} tile={tile}>
            {t('tutorial.selectTile')}
        </TutorialCard>
    );
};

const ClaimTileTutorial = ({ tile }: { tile: Tile }) => {
    const { translate: t } = useLanguage();
    const handleOnComplete = () => {
        Rune.actions.acknowledgeTutorial('claimTile');
    };

    return (
        <TutorialCard handler={handleOnComplete} tile={tile}>
            {t('tutorial.claimTile')}
        </TutorialCard>
    );
};

const ShrineTutorial = ({ tile }: { tile: Tile }) => {
    const { translate: t } = useLanguage();
    const handleOnComplete = () => {
        Rune.actions.acknowledgeTutorial('shrines');
    };

    return (
        <TutorialCard handler={handleOnComplete} tile={tile}>
            {t('tutorial.shrines')}
        </TutorialCard>
    );
};

const HengeTutorial = ({ tile }: { tile: Tile }) => {
    const { translate: t } = useLanguage();
    const handleOnComplete = () => {
        Rune.actions.acknowledgeTutorial('henges');
    };

    return (
        <TutorialCard handler={handleOnComplete} tile={tile}>
            {t('tutorial.henges')}
        </TutorialCard>
    );
};

const FinalTutorial = ({ tile }: { tile: Tile }) => {
    const { translate: t } = useLanguage();
    const handleOnComplete = () => {
        Rune.actions.acknowledgeTutorial('final');
    };

    return (
        <TutorialCard handler={handleOnComplete} tile={tile}>
            {t('tutorial.final')}
        </TutorialCard>
    );
};

type TutorialHandler = {
    render: (tile: Tile) => JSX.Element | null;
    reveal: (grid: Grid<Tile>, tutorial: Record<TutorialKey, boolean>, localPlayerId: PlayerId) => Tile | null;
};

const renderers = new Map<TutorialKey, TutorialHandler>();
renderers.set('selectTile', {
    reveal: (grid, tutorial, localPlayerId) => {
        // Check if the order for the tutorial is correct.
        // All tutorials need to be false, for the tile select
        // to be shown
        if (Object.values(tutorial).some((value) => value === true)) {
            return null;
        }

        // find the player's entrance grid tile, which is the first tile
        // to be selected and then displayed
        return grid.toArray().find((tile) => tile.playerId === localPlayerId && tile.type === 'entrance') ?? null;
    },
    render: (tile: Tile) => <SelectTileTutorial tile={tile} />,
});
renderers.set('claimTile', {
    reveal: (grid, tutorials, localPlayerId) => {
        // If the select tile tutorial hasn't been completed,
        // we bail
        if (tutorials.selectTile === false) {
            return null;
        }

        // we also want to check if the player has already claimed a tile
        if (grid.toArray().filter((tile) => tile.playerId === localPlayerId).length > 1) {
            return null;
        }

        // We then want to find a tile next to the entrance tile.
        const entrance = grid.toArray().find((tile) => tile.playerId === localPlayerId && tile.type === 'entrance');

        if (!entrance) {
            return null;
        }

        const neighbors = grid.traverse(spiral({ radius: 1, start: entrance }));
        return (
            neighbors
                .toArray()
                .filter(
                    (tile) =>
                        !['entrance', 'ancient-shrines', 'hollow-henges', 'void'].includes(tile.type) &&
                        tile.playerId === null
                )
                ?.at(0) ?? null
        );
    },
    render: (tile) => <ClaimTileTutorial tile={tile} />,
});
renderers.set('shrines', {
    reveal: (grid, tutorials) => {
        // Check if the order for the tutorial is correct.
        // The select & claim mission should be completed before
        // this tip pops up
        if (!tutorials.selectTile || !tutorials.claimTile) {
            return null;
        }

        // Find any revealed shrine
        return grid.toArray().find((tile) => tile.type === 'ancient-shrines' && tile.discovered) ?? null;
    },
    render: (tile: Tile) => <ShrineTutorial tile={tile} />,
});
renderers.set('henges', {
    reveal: (grid, tutorials) => {
        // Check if the order for the tutorial is correct.
        // The select & claim mission should be completed before
        // this tip pops up
        if (!tutorials.selectTile || !tutorials.claimTile) {
            return null;
        }

        // Find any revealed shrine
        return grid.toArray().find((tile) => tile.type === 'hollow-henge' && tile.discovered) ?? null;
    },
    render: (tile: Tile) => <HengeTutorial tile={tile} />,
});
renderers.set('final', {
    reveal: (grid, tutorials, localPlayerId) => {
        // Check if the order for the tutorial is correct.
        // All missions beside the final should be completed
        if (!tutorials.claimTile || !tutorials.henges || !tutorials.selectTile || !tutorials.shrines) {
            return null;
        }

        // find the player's entrance grid tile, which is the first tile
        // to be selected and then displayed
        return grid.toArray().find((tile) => tile.playerId === localPlayerId && tile.type === 'entrance') ?? null;
    },
    render: (tile: Tile) => <FinalTutorial tile={tile} />,
});

export const Tutorial = () => {
    const { playerState, localPlayerId } = useGameState();
    const grid = useGrid();

    if (!localPlayerId) {
        return null;
    }

    const { tutorials } = playerState[localPlayerId!];
    // We bail early if all tutorials have been completed
    if (Object.values(tutorials).every((value) => value === true)) {
        return null;
    }

    for (const [key, handler] of renderers) {
        const tile = handler.reveal(grid, tutorials, localPlayerId);

        if (tile && tutorials[key] === false) {
            return handler.render(tile);
        }
    }
};
