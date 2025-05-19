// As the Rune SDK does not expose the type of the

import { createCenterTiles, createPlayerTiles } from './board/board';
import { missionDeck } from './missions/mission-deck';
import { initialPlayerState } from './player/player-state';

// setup fn, we can just go ahead and infer it.
type SetupFn = Parameters<typeof Rune.initLogic>[0]['setup'];

export const setup: SetupFn = (allPlayerIds) => {
    if (allPlayerIds.length === 0) {
        throw new RangeError(`Not enough players.`);
    }

    const board = createCenterTiles();
    for (const [playerId, playerNumber] of allPlayerIds.map((v, i) => [v, i + 1] as const)) {
        board.setHexes(createPlayerTiles(playerId, playerNumber));
    }

    return {
        allPlayerIds,
        currentActivePlayer: allPlayerIds[0],

        // The initial Player State for all Players;
        playerState: Object.fromEntries(
            allPlayerIds.map((id) => {
                return [id, initialPlayerState()];
            })
        ),

        // Game properties
        missionDeck: Object.fromEntries(missionDeck),

        // Board
        board: board.toJSON(),
    };
};
