export type GameActions = {
    claimTile: (payload: [tileId: string, position: { q: number; r: number }]) => void;
    drawMission: () => void;
};
