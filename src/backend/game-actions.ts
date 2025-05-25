export type GameActions = {
    claimTile: (payload: [claimantId: string, position: { q: number; r: number }]) => void;
    drawMission: (type: 'diplomatic' | 'solo') => void;
    addAiPlayers: () => void;
};
