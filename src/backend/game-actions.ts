import { PlayerId } from "rune-sdk";

export type GameActions = {
    resetPlayerData: (playerId: PlayerId) => void;
};
