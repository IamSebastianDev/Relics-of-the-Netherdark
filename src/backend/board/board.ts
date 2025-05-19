import { Grid, GridAsJSON, spiral } from 'honeycomb-grid';
import { PlayerId } from 'rune-sdk';
import { getCoordinates, getRandomCoordinates, getSource, playerStartPositions, tileSources } from './constants';
import { Tile } from './tile';
import { TilePool } from './tile-pool';

export type Board = GridAsJSON<Tile>;
export const createCenterTiles = () => {
    const pool = new TilePool(tileSources.center);
    const hexes = getCoordinates(getSource(0)).map((hex) => Tile.create(hex, { type: pool.next() }));

    const grid = new Grid(Tile, hexes);

    // We need to generate two ancient shrines and two wizard towers
    const coordinates = getRandomCoordinates(getSource(0), 4);
    const specialTiles = new TilePool(['ancient-shrines', 'ancient-shrines', 'wizards-towers', 'wizards-towers']);
    for (const { q, r } of coordinates) {
        const tile = grid.getHex({ q, r });
        grid.setHexes([Tile.create({ q, r }, { ...tile, type: specialTiles.next() })]);
    }

    return grid;
};

export const createPlayerTiles = (playerId: PlayerId, playerIdx: number) => {
    const pool = new TilePool(tileSources.player);
    const hexes = getCoordinates(getSource(playerIdx)).map((hex) =>
        Tile.create(hex, { type: pool.next(), playerId: playerId })
    );

    const grid = new Grid(Tile, hexes);

    // We need the start position for the player, where to place the
    // entrance tile, and then which tiles to mark as discovered.
    const [q, r] = playerStartPositions[playerIdx];

    // Set the entrance hex
    grid.setHexes([Tile.create({ q, r }, { type: 'entrance', playerId: playerId, discovered: true })]);

    // Get all neighbors of the entrance hex, and
    // set them as discovered @todo -> put into utility function
    const neighbors = grid.traverse(spiral({ radius: 1, start: { q, r } }));
    grid.setHexes(neighbors.map((tile) => Tile.create({ q: tile.q, r: tile.r }, { ...tile, discovered: true })));

    // We need to generate two ancient shrines and two wizard towers
    const coordinates = getRandomCoordinates(getSource(playerIdx), 2);
    const specialTiles = new TilePool(['ancient-shrines', 'wizards-towers']);
    for (const { q, r } of coordinates) {
        const tile = grid.getHex({ q, r });
        grid.setHexes([Tile.create({ q, r }, { ...tile, type: specialTiles.next() })]);
    }

    return grid;
};
