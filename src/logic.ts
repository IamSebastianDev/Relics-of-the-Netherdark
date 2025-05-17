import type { RuneClient } from 'rune-sdk';
import { GameActions } from './backend/game-actions';
import { GameState } from './backend/game-state';
import { drawFromDeck } from './backend/missions/draw-from-deck';
import { initialPlayerState } from './backend/player/player-state';
import { setup } from './backend/setup';

declare global {
    const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
    minPlayers: 1,
    maxPlayers: 6,
    setup: setup,
    actions: {
        drawMission: (_, { playerId, game }) => {
            const [mission, deck] = drawFromDeck(game.missionDeck);
            game.playerState[playerId].missions.push(mission);
            game.missionDeck = deck;
        },
    },
    events: {
        playerJoined: (playerId, { game }) => {
            game.playerState[playerId] = initialPlayerState();
            console.log({ playerId, game });
        },
        playerLeft: (playerId, { game }) => {
            delete game.playerState[playerId];
        },
    },
});
