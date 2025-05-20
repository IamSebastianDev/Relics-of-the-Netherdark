import { PlayerId } from 'rune-sdk';
import { useGameState } from '../providers/game-state.provider';

export const usePlayerColor = (playerId: PlayerId | null) => {
    const { allPlayerIds } = useGameState();
    const idx = allPlayerIds.findIndex((id) => playerId === id);

    if (idx === -1) {
        return null;
    }

    return ['red', 'blue', 'green', 'yellow', 'gray', 'orange'][idx];
};
