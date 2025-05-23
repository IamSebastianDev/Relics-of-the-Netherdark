import { PlayerId } from 'rune-sdk';
import { Grid } from '../board/grid-shim';
import { GameState } from '../game-state';
import { Mission } from './mission';
import { MissionKey } from './mission-deck';

type MissionResolver = (game: GameState, grid: Grid, playerId: PlayerId) => boolean;

const missionResolvers = new Map<MissionKey, MissionResolver>([
    [
        'collect-gemstone-caverns-1',
        (_, grid, playerId) => {
            return (
                [...grid.values()].filter((tile) => {
                    return tile.playerId === playerId && tile.type === 'gemstone-caverns';
                }).length >= 4
            );
        },
    ],
    [
        'collect-gemstone-caverns-2',
        (_, grid, playerId) => {
            return (
                [...grid.values()].filter((tile) => {
                    return tile.playerId === playerId && tile.type === 'gemstone-caverns';
                }).length >= 4
            );
        },
    ],
    [
        'collect-gemstone-caverns-3',
        (_, grid, playerId) => {
            return (
                [...grid.values()].filter((tile) => {
                    return tile.playerId === playerId && tile.type === 'gemstone-caverns';
                }).length >= 4
            );
        },
    ],
]);

export const getMissionReward = (game: GameState, grid: Grid, mission: Mission, playerId: PlayerId) => {
    const resolver = missionResolvers.get(mission.id as MissionKey);

    if (!resolver) {
        throw new ReferenceError(`Unrecoverable Error: No resolver defined for Mission id ${mission.id}`);
    }

    return resolver(game, grid, playerId);
};
