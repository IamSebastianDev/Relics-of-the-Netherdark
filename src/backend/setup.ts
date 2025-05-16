// As the Rune SDK does not expose the type of the

import { initialPlayerState } from './player/player-state';

// setup fn, we can just go ahead and infer it.
type SetupFn = Parameters<typeof Rune.initLogic>[0]['setup'];

export const setup: SetupFn = (allPlayerIds) => {
    if (allPlayerIds.length === 0) {
        throw new RangeError(`Not enough players.`);
    }

    return {
        allPlayerIds,
        currentActivePlayer: allPlayerIds[0],
        playerState: Object.fromEntries(
            allPlayerIds.map((id) => {
                return [id, initialPlayerState()];
            })
        ),
    };
};
