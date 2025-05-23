import { Grid } from 'honeycomb-grid';
import { PlayerId } from 'rune-sdk';
import { Tile } from '../board/tile';
import { GameState } from '../game-state';
import { Mission } from './mission';
import { MissionKey } from './mission-deck';

type MissionResolver = (game: GameState, grid: Grid<Tile>, playerId: PlayerId) => boolean;

const missionResolvers = new Map<MissionKey, MissionResolver>([
    [
        'collect-gemstone-caverns-1',
        (_, grid, playerId) => {
            return (
                grid.toArray().filter((tile) => {
                    return tile.playerId === playerId && tile.type === 'gemstone-caverns';
                }).length >= 4
            );
        },
    ],
    [
        'collect-gemstone-caverns-2',
        (_, grid, playerId) => {
            return (
                grid.toArray().filter((tile) => {
                    return tile.playerId === playerId && tile.type === 'gemstone-caverns';
                }).length >= 4
            );
        },
    ],
    [
        'collect-gemstone-caverns-3',
        (_, grid, playerId) => {
            return (
                grid.toArray().filter((tile) => {
                    return tile.playerId === playerId && tile.type === 'gemstone-caverns';
                }).length >= 4
            );
        },
    ],
]);

export const getMissionReward = (game: GameState, grid: Grid<Tile>, mission: Mission, playerId: PlayerId) => {
    const resolver = missionResolvers.get(mission.id as MissionKey);

    if (!resolver) {
        throw new ReferenceError(`Unrecoverable Error: No resolver defined for Mission id ${mission.id}`);
    }

    return resolver(game, grid, playerId);
};
