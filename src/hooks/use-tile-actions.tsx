import claim from '../assets/icons/claim.png';
import details from '../assets/icons/details.png';
import { TileData } from '../backend/board/tile';
import { useGameState } from '../providers/game-state.provider';
import { useTileOverviewStore } from '../stores/tile-overview.store';
import { useTileSelectorStore } from '../stores/tile-selector.store';

export type TileAction = {
    id: string;
    icon: string;
    label: string;
    disabled: boolean;
    action: () => void;
};

export const useTileActions = (tile: TileData | null): TileAction[] => {
    const { showOverview } = useTileOverviewStore();
    const { selectTile } = useTileSelectorStore();
    const { localPlayerId, currentActivePlayer } = useGameState();

    if (!tile) {
        return [];
    }

    return [
        // We will always enable the player to open the details
        // panel of a (discovered) tile. While we render the tile name
        // above the actions, so that the player has a clear
        // indication on what he clicked.
        tile.discovered
            ? {
                  id: 'details',
                  label: 'Show Detail',
                  action: () => {
                      showOverview(true);
                  },
                  disabled: !tile.discovered,
                  icon: details,
              }
            : [],

        // Depending on different factors, we will enable or disable the claim tile action.
        // On wizard, relic and entrance tiles, the action is completely omitted
        !['entrance', 'wizards-towers', 'ancient-shrines'].includes(tile?.type) && tile.discovered
            ? {
                  id: 'claim',
                  label: 'Claim Tile',
                  action: () => {
                      showOverview(false);
                      selectTile(null);
                      Rune.actions.claimTile([localPlayerId!, tile.position]);
                  },
                  disabled: !tile.discovered || tile.playerId !== null || localPlayerId !== currentActivePlayer,
                  icon: claim,
              }
            : [],
    ].flat();
};
