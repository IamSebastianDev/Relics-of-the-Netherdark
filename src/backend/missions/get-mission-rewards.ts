import { PlayerId } from 'rune-sdk';
import { Grid, getNeighbors, toAxial } from '../board/grid-shim';
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

const clusterResolver = (type: TileType): MissionResolver => {
    return (_, grid, playerId) => {
        // Step 1: Get all gemstone caverns as root nodes
        // Step 2: Filter all gemstone nodes that are not belonging to the player
        // Step 3: Filter all nodes that do not have at least two other gemstones as neighbours
        // Step 4: Check if there are two gemstone nodes with the correct playerId
        return !![...grid.entries()]
            .filter(([_, tile]) => tile.type === type && tile.playerId === playerId)
            .filter(([key]) => {
                const neighbors = getNeighbors(grid, toAxial(key));
                return neighbors.filter((tile) => tile.type === type && tile.playerId === playerId).length >= 2;
            });
    };
};

// Resolver for the henge mission
// Claim a tile next to each henge in the game
const hengeMissionResolver = (): MissionResolver => {
    return (_, grid, playerId) => {
        return [...grid.entries()]
            .filter(([_, tile]) => tile.type === 'hollow-henge')
            .every(([key]) => {
                const neighbors = getNeighbors(grid, toAxial(key));
                return neighbors.some((tile) => tile.playerId === playerId);
            });
    };
};

// Resolver for the domination victory
// Claim more tiles of type than any other player
const dominionMissionResolver = (type: TileType): MissionResolver => {
    return (_, grid, playerId) => {
        const tiles = [...grid.values()].filter((tile) => tile.type === type);

        const counts = new Map<string, number>();
        for (const tile of tiles) {
            if (tile.playerId) {
                counts.set(tile.playerId, (counts.get(tile.playerId) ?? 0) + 1);
            }
        }

        const maximumTiles = Math.max(...counts.values());
        return counts.get(playerId) === maximumTiles;
    };
};

/**
 * Resolver for the "Religious Convention" diplomatic mission.
 *
 * The mission is fulfilled if there is at least one Hollow Henge tile
 * that has three or more *different* players with claimed tiles adjacent to it.
 *
 * This represents a symbolic gathering of all players near a single sacred site.
 */
const religiousConventionResolver = (): MissionResolver => {
    return (_, grid) => {
        const henges = [...grid.entries()].filter(([_, tile]) => tile.type === 'hollow-henge');

        return henges.some(([key]) => {
            const neighbors = getNeighbors(grid, toAxial(key));
            const players = new Set(neighbors.map((t) => t.playerId).filter(Boolean));
            return players.size >= 3;
        });
    };
};

/**
 * Resolver for the "Kingmaker" diplomatic mission.
 *
 * The mission is fulfilled if another player controls more Ancient Shrines
 * than the player attempting the mission. Control is directly encoded in the
 * `playerId` of each `ancient-shrines` tile.
 */
const kingmakerResolver = (): MissionResolver => {
    return (_, grid, playerId) => {
        const controllerCounts = new Map<PlayerId, number>();

        for (const tile of grid.values()) {
            if (tile.type !== 'ancient-shrines' || !tile.playerId) continue;
            controllerCounts.set(tile.playerId, (controllerCounts.get(tile.playerId) ?? 0) + 1);
        }

        const ownCount = controllerCounts.get(playerId) ?? 0;

        return [...controllerCounts.entries()].some(([id, count]) => id !== playerId && count > ownCount);
    };
};

/**
 * Resolver for the "Myzeel’s Pact" diplomatic mission.
 *
 * The mission is fulfilled if every claimed "fungal-fields" tile owned by the player
 * has at least one neighbor that is owned by another player.
 */
const myzeelsPactResolver = (): MissionResolver => {
    return (_, grid, playerId) => {
        return [...grid.entries()]
            .filter(([_, tile]) => tile.type === 'fungal-fields' && tile.playerId === playerId)
            .every(([key]) => {
                const neighbors = getNeighbors(grid, toAxial(key));
                return neighbors.some((neighbor) => neighbor.playerId && neighbor.playerId !== playerId);
            });
    };
};

/**
 * Resolver for the "Outsider" diplomatic mission.
 *
 * The mission is fulfilled if the player does not have any claimed tile
 * adjacent to an Entrance tile claimed by another player.
 */
const outsiderResolver = (): MissionResolver => {
    return (_, grid, playerId) => {
        const entries = [...grid.entries()].filter(([_, tile]) => tile.playerId === playerId);

        return entries.every(([key]) => {
            const neighbors = getNeighbors(grid, toAxial(key));
            return neighbors.every(
                (neighbor) => !(neighbor.type === 'entrance' && neighbor.playerId && neighbor.playerId !== playerId)
            );
        });
    };
};

/**
 * Resolver for the "Divine Split" diplomatic mission.
 *
 * The mission is fulfilled if every Ancient Shrine has at least
 * two different players adjacent to it (i.e., claimed neighboring tiles).
 */
const divineSplitResolver = (): MissionResolver => {
    return (_, grid) => {
        const shrines = [...grid.entries()].filter(([_, tile]) => tile.type === 'ancient-shrines');

        return shrines.every(([key]) => {
            const neighbors = getNeighbors(grid, toAxial(key));
            const adjacentPlayers = new Set(neighbors.map((t) => t.playerId).filter((pid): pid is string => !!pid));

            return adjacentPlayers.size >= 2;
        });
    };
};

/**
 * Resolver for the "Shared Borders" diplomatic mission.
 *
 * The mission is fulfilled if the player controls at least 15 tiles
 * that are directly adjacent to a tile controlled by a different player.
 */
const sharedBordersResolver = (): MissionResolver => {
    return (_, grid, playerId) => {
        let count = 0;

        for (const [key, tile] of grid.entries()) {
            if (tile.playerId !== playerId) continue;

            const neighbors = getNeighbors(grid, toAxial(key));
            const isNextToOpponent = neighbors.some((neighbor) => neighbor.playerId && neighbor.playerId !== playerId);

            if (isNextToOpponent) count++;
        }

        return count >= 15;
    };
};

// Resolver for "Echoes of War"
// The player must be adjacent to more tiles claimed by others than to their own claimed tiles.
const echoesOfWarResolver = (): MissionResolver => {
    return (_, grid, playerId) => {
        let adjacentToOthers = 0;
        let adjacentToSelf = 0;

        for (const [key, tile] of grid.entries()) {
            if (tile.playerId !== playerId) continue;

            const neighbors = getNeighbors(grid, toAxial(key));
            for (const neighbor of neighbors) {
                if (!neighbor.playerId || neighbor.playerId === playerId) {
                    if (neighbor.playerId === playerId) adjacentToSelf++;
                    continue;
                }
                adjacentToOthers++;
            }
        }

        return adjacentToOthers > adjacentToSelf;
    };
};

// Resolver factory: Check if the player has claimed the same number of tiles
// of a given type as any other player (not necessarily all).
const parityClaimResolver = (type: TileType): MissionResolver => {
    return (_, grid, playerId) => {
        const counts = new Map<string, number>();

        for (const tile of grid.values()) {
            if (tile.type === type && tile.playerId) {
                counts.set(tile.playerId, (counts.get(tile.playerId) ?? 0) + 1);
            }
        }

        const playerCount = counts.get(playerId);
        if (playerCount === undefined) return false;

        for (const [otherId, count] of counts.entries()) {
            if (otherId !== playerId && count === playerCount) {
                return true;
            }
        }

        return false;
    };
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
    ['gemstone-cluster-1', clusterResolver('gemstone-caverns')],
    ['gemstone-cluster-2', clusterResolver('gemstone-caverns')],
    ['gemstone-cluster-3', clusterResolver('gemstone-caverns')],
    ['gemstone-cluster-4', clusterResolver('gemstone-caverns')],
    ['miners-cluster-1', clusterResolver('miners-enclaves')],
    ['miners-cluster-2', clusterResolver('miners-enclaves')],
    ['miners-cluster-3', clusterResolver('miners-enclaves')],
    ['miners-cluster-4', clusterResolver('miners-enclaves')],

    // Rare
    // --
    ['claim-henge-tiles-1', hengeMissionResolver()],
    ['claim-henge-tiles-2', hengeMissionResolver()],
    ['claim-henge-tiles-3', hengeMissionResolver()],
    ['claim-henge-tiles-4', hengeMissionResolver()],
    // --
    ['relic-domination-1', dominionMissionResolver('ancient-shrines')],
    ['relic-domination-2', dominionMissionResolver('ancient-shrines')],
    ['relic-domination-3', dominionMissionResolver('ancient-shrines')],
    ['relic-domination-4', dominionMissionResolver('ancient-shrines')],
    // --
    ['claims-domination-1', dominionMissionResolver('miners-enclaves')],
    ['claims-domination-2', dominionMissionResolver('miners-enclaves')],
    ['claims-domination-3', dominionMissionResolver('miners-enclaves')],

    // --
    ['fortune-1', dominionMissionResolver('gemstone-caverns')],
    ['fortune-2', dominionMissionResolver('gemstone-caverns')],
    ['fortune-3', dominionMissionResolver('gemstone-caverns')],

    // Diplomatic
    ['religious-convention', religiousConventionResolver()],
    ['kingmaker', kingmakerResolver()],
    ['myzeels-pact', myzeelsPactResolver()],
    ['outsider', outsiderResolver()],
    ['divine-split', divineSplitResolver()],
    ['shared-borders', sharedBordersResolver()],
    ['echoes-of-war', echoesOfWarResolver()],
    ['bone-agreement', parityClaimResolver('bone-hoards')],
    ['twin-claims', parityClaimResolver('gemstone-caverns')],
    ['sibling-spores', parityClaimResolver('fungal-fields')],
    ['equal-enclaves', parityClaimResolver('miners-enclaves')],
    ['twisted-fate', parityClaimResolver('twisted-tunnels')],
]);

export const getMissionReward = (game: GameState, grid: Grid, mission: Mission, playerId: PlayerId) => {
    const resolver = missionResolvers.get(mission.id as MissionKey);

    if (!resolver) {
        throw new ReferenceError(`Unrecoverable Error: No resolver defined for Mission id ${mission.id}`);
    }

    return resolver(game, grid, playerId) ? mission.reward : 0;
};
