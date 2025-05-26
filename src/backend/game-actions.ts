import { TutorialKey } from './player/tutorial';

export type GameActions = {
    claimTile: (payload: [claimantId: string, position: { q: number; r: number }]) => void;
    drawMission: (type: 'diplomatic' | 'solo') => void;
    addAiPlayers: () => void;
    acknowledgeTutorial: (key: TutorialKey | null) => void;
};
