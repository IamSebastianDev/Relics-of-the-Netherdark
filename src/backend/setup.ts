// As the Rune SDK does not expose the type of the

import { initialPlayerState } from "./player/player-state";

// setup fn, we can just go ahead and infer it.
type SetupFn = Parameters<typeof Rune.initLogic>[0]["setup"];

export const setup: SetupFn = (allPlayerIds) => {
    return {
        allPlayerIds,
        dungeonState: {},
        playerState: Object.fromEntries(
            allPlayerIds.map((id) => {
                return [id, initialPlayerState()];
            })
        ),
    };
};
