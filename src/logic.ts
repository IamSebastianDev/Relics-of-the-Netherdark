import type { RuneClient } from 'rune-sdk';
import { GameActions } from './backend/game-actions';
import { GameState } from './backend/game-state';
import { initialPlayerState } from './backend/player/player-state';
import { setup } from './backend/setup';

declare global {
    const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
    /**
     * To store the player's current level and abilities
     * we want to persists the player's data.
     */

    minPlayers: 1,
    maxPlayers: 4,
    setup: setup,
    actions: {
        resetPlayerData: (playerId, { game }) => {
            game.playerState[playerId] = initialPlayerState();
        },
    },
    events: {
        playerJoined: (playerId, { game }) => {
            console.log({ playerId, game });
        },
        playerLeft: (playerId, { game }) => {
            delete game.playerState[playerId];
        },
    },
});
