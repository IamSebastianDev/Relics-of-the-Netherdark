import { Mission } from '../missions/mission';

export type PlayerState = {
    missions: Mission[];
    drawMissions: number;
};

export const initialPlayerState = (): PlayerState => {
    return {
        missions: [],
        drawMissions: 0,
    };
};
