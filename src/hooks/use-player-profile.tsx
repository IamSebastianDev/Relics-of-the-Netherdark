import { useGameState } from "../providers/game-state.provider";

export const usePlayerProfile = () => {
    const data = useGameState();
    return data.localPlayerId ? Rune.getPlayerInfo(data.localPlayerId) : null;
};
