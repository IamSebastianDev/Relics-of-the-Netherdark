import { PlayerId } from 'rune-sdk';
import { getCoordinates, getRandomCoordinates, getSource, playerStartPositions, tileSources } from './constants';
import { Grid, SerializedGrid, fromAxial, getNeighbors } from './grid-shim';
import { TileData, createTile } from './tile';
import { TilePool } from './tile-pool';

export type Board = SerializedGrid;

export const createCenterTiles = () => {
    const pool = new TilePool(tileSources.center);
    const hexes = getCoordinates(getSource(0)).map(
        (pos) => [fromAxial(pos), { ...createTile({ ...pos }, { type: pool.next() }) }] as const
    );

    const grid = new Map<string, TileData>(hexes);
    const coordinates = getRandomCoordinates(getSource(0), 4);
    const specialTiles = new TilePool(['ancient-shrines', 'ancient-shrines', 'hollow-henge', 'hollow-henge']);
    for (const { q, r } of coordinates) {
        const tile = grid.get(fromAxial({ q, r }))!;
        grid.set(fromAxial({ q, r }), { ...tile, type: specialTiles.next() });
    }

    return grid;
};

export const createPlayerTiles = (playerId: PlayerId, playerIdx: number) => {
    const pool = new TilePool(tileSources.center);
    const hexes = getCoordinates(getSource(playerIdx)).map(
        (pos) => [fromAxial(pos), { ...createTile({ ...pos }, { type: pool.next() }) }] as const
    );

    const grid = new Map<string, TileData>(hexes);

    // We need the start position for the player, where to place the
    // entrance tile, and then which tiles to mark as discovered.
    const [q, r] = playerStartPositions[playerIdx];

    // Set the entrance hex
    grid.set(fromAxial({ q, r }), createTile({ q, r }, { type: 'entrance', playerId, discovered: true }));

    // Get all neighbors of the entrance hex, and
    // set them as discovered @todo -> put into utility function
    discoverTiles(grid, { q, r });

    // We need to generate two ancient shrines and two wizard towers
    const coordinates = getRandomCoordinates(getSource(playerIdx), 2);
    const specialTiles = new TilePool(['ancient-shrines', 'hollow-henge']);
    for (const { q, r } of coordinates) {
        const tile = grid.get(fromAxial({ q, r }))!;
        grid.set(fromAxial({ q, r }), { ...tile, type: specialTiles.next() });
    }

    return grid;
};

export const discoverTiles = (grid: Grid, start: { q: number; r: number }) => {
    const neighbors = getNeighbors(grid, start);
    for (const neighbor of neighbors) {
        grid.set(fromAxial({ q: neighbor.position.q, r: neighbor.position.r }), {
            ...neighbor,
            position: neighbor.position,
            discovered: true,
        });
    }
};

// I assume for now, that we only need to check a tile around the radius
// of the current interacted tile, because there should be no way to update the
// tile without it triggering a mission check tower.
// This might be a wrong assumption we need to challenge later
// Edge cases we need to handle: Two wizards towers next to each other, or at least in
// range of the current active tile. We cannot assume only one mission can be drawn at
//  any time
export const checkMissionTiles = (grid: Grid, start: { q: number; r: number }, playerId: PlayerId) => {
    const neighbors = getNeighbors(grid, start);
    const missionTiles = neighbors.filter((tile) => {
        return tile.type === 'hollow-henge' && !tile.shared.includes(playerId);
    });

    // If there are no mission towers,
    // we simply return here and bail early, as no
    // further processing needs to be done.
    if (missionTiles.length === 0) {
        return 0;
    }

    // We then want to modify the grid, and add the
    // player to the peoples array here.
    for (const missionTile of missionTiles) {
        grid.set(fromAxial({ q: missionTile.position.q, r: missionTile.position.r }), {
            ...missionTile,
            shared: [...missionTile.shared, playerId],
        });
    }

    return missionTiles.length;
};

export const checkShrineTiles = (grid: Grid, start: { q: number; r: number }) => {
    // We want to check the placed tile for neighboring tiles that are shrines. If we find a shrine, we need
    // to update it's possession state, or at least recalculate it.
    const neighbors = getNeighbors(grid, start);
    const shrineTiles = neighbors.filter((tile) => tile.type === 'ancient-shrines');

    for (const tile of shrineTiles) {
        const adjacent = getNeighbors(grid, start);
        const claims = adjacent.filter((tile) => tile.playerId && tile.type !== 'ancient-shrines');

        // get the playerId that has the most controlled tiles around,
        // break tie in favor of the shrines controller
        const claimants = new Map<PlayerId, number>();
        for (const { playerId } of claims) {
            claimants.set(playerId!, (claimants.get(playerId!) || 0) + 1);
        }

        // Find the highest score a player has
        let currentHighestScore = -1;
        let candidates: PlayerId[] = [];
        for (const [claimantId, score] of claimants.entries()) {
            // If the score is equal to the currentHighScore
            // we push to the candidates
            if (score === currentHighestScore) {
                candidates.push(claimantId);
            }

            // If the score is higher, we update the current High score,
            // and set the candidate to just the player.
            if (score > currentHighestScore) {
                currentHighestScore = score;
                candidates = [claimantId];
            }
        }

        // If there is a winner, we update the tile. If there is a tie, we do nothing,
        // the tile stays in control of the current controller.
        if (candidates.length === 1) {
            const [winner] = candidates;
            grid.set(fromAxial({ q: tile.position.q, r: tile.position.r }), { ...tile, playerId: winner });
        }
    }
};
