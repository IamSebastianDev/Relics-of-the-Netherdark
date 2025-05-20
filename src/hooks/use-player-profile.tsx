import { PlayerId } from 'rune-sdk';

export const usePlayerProfile = (playerId: PlayerId | null) => {
    return playerId ? Rune.getPlayerInfo(playerId) : null;
};
