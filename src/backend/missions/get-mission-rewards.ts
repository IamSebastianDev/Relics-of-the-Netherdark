import { PlayerId } from 'rune-sdk';
import { GameState } from '../game-state';
import { Mission } from './mission';
import { MissionKey } from './mission-deck';

type MissionResolver = (game: GameState, playerId: PlayerId) => boolean;

const missionResolvers = new Map<MissionKey, MissionResolver>([
    [
        'collect-gemstone-caverns-1',
        (game, playerId) => {
            return (
                Object.values(game.board).filter((tile) => {
                    return tile.playerId === playerId && tile.type === 'bone-hoard';
                }).length >= 5
            );
        },
    ],
    [
        'collect-bone-hoard-1',
        (game, playerId) => {
            return (
                Object.values(game.board).filter((tile) => {
                    return tile.playerId === playerId && tile.type === 'bone-hoard';
                }).length >= 6
            );
        },
    ],
]);

export const getMissionReward = (game: GameState, mission: Mission, playerId: PlayerId) => {
    const resolver = missionResolvers.get(mission.id as MissionKey);

    if (!resolver) {
        throw new ReferenceError(`Unrecoverable Error: No resolver defined for Mission id ${mission.id}`);
    }

    return resolver(game, playerId);
};
