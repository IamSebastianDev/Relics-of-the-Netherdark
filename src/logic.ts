import type { RuneClient } from "rune-sdk";
import { GameActions } from "./backend/game-actions";
import { GameState } from "./backend/game-state";
import { PersistedState } from "./backend/persisted-state";
import { initialPlayerState } from "./backend/player/player-state";
import { setup } from "./backend/setup";

declare global {
    const Rune: RuneClient<GameState, GameActions, PersistedState>;
}

Rune.initLogic({
    /**
     * To store the player's current level and abilities
     * we want to persists the player's data.
     */
    persistPlayerData: true,
    minPlayers: 1,
    maxPlayers: 4,
    setup: setup,
    actions: {
        resetPlayerData: (playerId, { game }) => {
            game.playerState[playerId] = initialPlayerState();
            game.persisted[playerId] = initialPlayerState();
        },
    },
    events: {
        playerJoined: (playerId, { game }) => {
            game.playerState[playerId] = game.persisted[playerId] ?? initialPlayerState();
        },
        playerLeft: (playerId, { game }) => {
            game.persisted[playerId] = game.playerState[playerId];
            delete game.playerState[playerId];
        },
    },
});
