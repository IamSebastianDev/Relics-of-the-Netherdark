export type TutorialKey = 'selectTile' | 'claimTile' | 'shrines' | 'henges' | 'final';
export const initialTutorialState = (): Record<TutorialKey, boolean> => {
    return {
        selectTile: false,
        claimTile: false,
        henges: false,
        shrines: false,
        final: false,
    };
};
