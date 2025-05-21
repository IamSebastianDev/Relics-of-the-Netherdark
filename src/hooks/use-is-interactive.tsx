import { TileData } from '../backend/board/tile';
import { useGameState } from '../providers/game-state.provider';

export const useIsInteractive = (tile: TileData) => {
    const { currentActivePlayer, localPlayerId } = useGameState();
    // If the player is not defined or the player is not the currentPlayer
    // we can directly return false, as we do not show interactivity for tiles
    // when it's not the player's turn.
    if (!localPlayerId || currentActivePlayer !== localPlayerId) {
        return false;
    }

    // Tiles can be interacted with.
    // There are certain rules, with which tiles a player can interact.
    switch (tile.type) {
        // Wizards towers tiles have special rules for interactivity
        // as they are community tiles, meaning they can be shared between players
        case 'hollow-henge':
            return false;

        // All other tiles follow the same simple rules:
        // 1) Tile needs to be discovered.
        // 2) Cannot have other player's units
        default:
            return tile.discovered && !tile.playerId;
    }
};
