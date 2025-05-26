import { Mission } from '../missions/mission';
import { TutorialKey, initialTutorialState } from './tutorial';

export type PlayerState = {
    missions: Mission[];
    drawMissions: number;
    tutorials: Record<TutorialKey, boolean>;
};

export type PersistedPlayerState = {
    tutorials: Record<string, boolean>;
};

export const initialPlayerState = (tutorials: PersistedPlayerState['tutorials'] | null = null): PlayerState => {
    return {
        missions: [],
        drawMissions: 0,
        tutorials: tutorials ?? initialTutorialState(),
    };
};
