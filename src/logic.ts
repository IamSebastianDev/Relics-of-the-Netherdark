import type { RuneClient } from 'rune-sdk';
import { GameActions } from './backend/game-actions';
import { GameState } from './backend/game-state';
import { drawFromDeck } from './backend/missions/draw-from-deck';
import { setup } from './backend/setup';

declare global {
    const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
    minPlayers: 1,
    maxPlayers: 6,
    setup: setup,
    actions: {
        tileAction: (payload: unknown, { playerId, game }) => {
            console.log({ payload, playerId, game });
        },
        drawMission: (_, { playerId, game }) => {
            const [mission, deck] = drawFromDeck(game.missionDeck);
            game.playerState[playerId].missions.push(mission);
            game.missionDeck = deck;
        },
    },
    events: {
        playerLeft: (playerId, { game }) => {
            // We might want to implement the player left, however we
            // would need to manipulate game state for that, so well have
            // to see if we actually can
            delete game.playerState[playerId];
        },
    },
});
