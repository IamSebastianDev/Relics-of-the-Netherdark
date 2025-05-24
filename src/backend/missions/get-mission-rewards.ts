import { PlayerId } from 'rune-sdk';
import { Grid } from '../board/grid-shim';
import { TileType } from '../board/tile';
import { GameState } from '../game-state';
import { Mission } from './mission';
import { MissionKey } from './mission-deck';

type MissionResolver = (game: GameState, grid: Grid, playerId: PlayerId) => boolean;

// Resolver factory for all common collect missions
const collectionResolver = (type: TileType): MissionResolver => {
    return (_, grid, playerId) => {
        return (
            [...grid.values()].filter((tile) => {
                return tile.playerId === playerId && tile.type === type;
            }).length >= 5
        );
    };
};

// Resolver factory for bonus points (lol)
const bonusPointsResolver = (): MissionResolver => {
    return () => true;
};

// Resolver for the uncommon gemstone cluster
// Claim a cluster of 3 gemstone mines that are next
// to each other (Probably the hardest to check)

const gemstoneClusterResolver = (): MissionResolver => {
    return () => {
        return false;
    };
};

// Resolver for the henge mission
// Claim a tile next to each henge in the game
const hengeMissionResolver = (): MissionResolver => {
    return () => {
        return false;
    };
};

// Resolver for the shrine mission
// Claim more shrines than any other player
const shrineMissionResolver = (): MissionResolver => {
    return () => false;
};

// Resolver for the domination victory
// Claim more miners encalaves than any other player
const dominionMissionResolver = (_type: TileType): MissionResolver => {
    return () => false;
};

const missionResolvers = new Map<MissionKey, MissionResolver>([
    // Common
    // --
    ['collect-gemstone-caverns-1', collectionResolver('gemstone-caverns')],
    ['collect-gemstone-caverns-2', collectionResolver('gemstone-caverns')],
    ['collect-gemstone-caverns-3', collectionResolver('gemstone-caverns')],
    ['collect-gemstone-caverns-4', collectionResolver('gemstone-caverns')],
    ['collect-gemstone-caverns-5', collectionResolver('gemstone-caverns')],
    ['collect-gemstone-caverns-6', collectionResolver('gemstone-caverns')],
    // --
    ['collect-bone-hoard-1', collectionResolver('bone-hoards')],
    ['collect-bone-hoard-2', collectionResolver('bone-hoards')],
    ['collect-bone-hoard-3', collectionResolver('bone-hoards')],
    ['collect-bone-hoard-4', collectionResolver('bone-hoards')],
    ['collect-bone-hoard-5', collectionResolver('bone-hoards')],
    ['collect-bone-hoard-6', collectionResolver('bone-hoards')],
    // --
    ['collect-miners-enclaves-1', collectionResolver('miners-enclaves')],
    ['collect-miners-enclaves-2', collectionResolver('miners-enclaves')],
    ['collect-miners-enclaves-3', collectionResolver('miners-enclaves')],
    ['collect-miners-enclaves-4', collectionResolver('miners-enclaves')],
    ['collect-miners-enclaves-5', collectionResolver('miners-enclaves')],
    ['collect-miners-enclaves-6', collectionResolver('miners-enclaves')],
    // --
    ['collect-fungal-fields-1', collectionResolver('fungal-fields')],
    ['collect-fungal-fields-2', collectionResolver('fungal-fields')],
    ['collect-fungal-fields-3', collectionResolver('fungal-fields')],
    ['collect-fungal-fields-4', collectionResolver('fungal-fields')],
    ['collect-fungal-fields-5', collectionResolver('fungal-fields')],
    ['collect-fungal-fields-6', collectionResolver('fungal-fields')],
    // --
    ['collect-twisted-tunnels-1', collectionResolver('twisted-tunnels')],
    ['collect-twisted-tunnels-2', collectionResolver('twisted-tunnels')],
    ['collect-twisted-tunnels-3', collectionResolver('twisted-tunnels')],
    ['collect-twisted-tunnels-4', collectionResolver('twisted-tunnels')],
    ['collect-twisted-tunnels-5', collectionResolver('twisted-tunnels')],
    ['collect-twisted-tunnels-6', collectionResolver('twisted-tunnels')],

    // Uncommon
    // --
    ['bonus-points-1', bonusPointsResolver()],
    ['bonus-points-2', bonusPointsResolver()],
    ['bonus-points-3', bonusPointsResolver()],
    ['bonus-points-4', bonusPointsResolver()],
    ['bonus-points-5', bonusPointsResolver()],
    ['bonus-points-6', bonusPointsResolver()],
    ['bonus-points-7', bonusPointsResolver()],
    ['bonus-points-8', bonusPointsResolver()],
    ['bonus-points-9', bonusPointsResolver()],
    ['bonus-points-10', bonusPointsResolver()],
    ['bonus-points-11', bonusPointsResolver()],
    ['bonus-points-12', bonusPointsResolver()],
    // --
    ['gemstone-cluster-1', gemstoneClusterResolver()],
    ['gemstone-cluster-2', gemstoneClusterResolver()],
    ['gemstone-cluster-3', gemstoneClusterResolver()],
    ['gemstone-cluster-4', gemstoneClusterResolver()],
    ['gemstone-cluster-5', gemstoneClusterResolver()],
    ['gemstone-cluster-6', gemstoneClusterResolver()],
    ['gemstone-cluster-7', gemstoneClusterResolver()],
    ['gemstone-cluster-8', gemstoneClusterResolver()],

    // Rare
    // --
    ['claim-henge-tiles-1', hengeMissionResolver()],
    ['claim-henge-tiles-2', hengeMissionResolver()],
    ['claim-henge-tiles-3', hengeMissionResolver()],
    ['claim-henge-tiles-4', hengeMissionResolver()],
    // --
    ['relic-domination-1', shrineMissionResolver()],
    ['relic-domination-2', shrineMissionResolver()],
    ['relic-domination-3', shrineMissionResolver()],
    ['relic-domination-4', shrineMissionResolver()],
    // --
    ['claims-domination-1', dominionMissionResolver('miners-enclaves')],
    ['claims-domination-2', dominionMissionResolver('miners-enclaves')],
    ['claims-domination-3', dominionMissionResolver('miners-enclaves')],

    // --
    ['fortune-1', dominionMissionResolver('gemstone-caverns')],
    ['fortune-2', dominionMissionResolver('gemstone-caverns')],
    ['fortune-3', dominionMissionResolver('gemstone-caverns')],
]);

export const getMissionReward = (game: GameState, grid: Grid, mission: Mission, playerId: PlayerId) => {
    const resolver = missionResolvers.get(mission.id as MissionKey);

    if (!resolver) {
        throw new ReferenceError(`Unrecoverable Error: No resolver defined for Mission id ${mission.id}`);
    }

    return resolver(game, grid, playerId) ? mission.reward : 0;
};
