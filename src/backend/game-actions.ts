export type GameActions = {
    claimTile: (payload: [tileId: string, position: { q: number; r: number }]) => void;
    drawMission: (type: 'diplomatic' | 'solo') => void;
};
