import { PlayerId } from "rune-sdk";
import { PlayerState } from "./player/player-state";

export type DungeonState = {};

export type GameState = {
    allPlayerIds: PlayerId[];
    playerState: Record<PlayerId, PlayerState>;
};
