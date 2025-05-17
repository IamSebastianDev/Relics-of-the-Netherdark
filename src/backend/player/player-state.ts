import { Mission } from "../missions/mission";

export type PlayerState = {
    missions: Mission[]
};

export const initialPlayerState = (): PlayerState => {
    return {
        missions: []
    };
};
