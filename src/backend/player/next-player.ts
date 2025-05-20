import { PlayerId } from 'rune-sdk';

export const nextPlayer = (allPlayerIds: PlayerId[], currentPlayer: PlayerId) => {
    const playerIdx = allPlayerIds.findIndex((id) => currentPlayer === id);
    return allPlayerIds[(playerIdx + 1) % allPlayerIds.length];
};
