import { Grid, GridAsJSON } from 'honeycomb-grid';
import { PlayerId } from 'rune-sdk';
import { getCoordinates, getSource, tileSources } from './constants';
import { Tile } from './tile';
import { TilePool } from './tile-pool';

export type Board = GridAsJSON<Tile>;
export const createCenterTiles = () => {
    const pool = new TilePool(tileSources.center);
    const hexes = getCoordinates(getSource(0)).map((hex) => Tile.create(hex, { type: pool.next() }));
    console.log({ numberOfCenterTiles: hexes.length });
    return new Grid(Tile, hexes);
};

export const createPlayerTiles = (playerId: PlayerId, playerIdx: number) => {
    const pool = new TilePool(tileSources.player);
    const hexes = getCoordinates(getSource(playerIdx)).map((hex) =>
        Tile.create(hex, { type: pool.next(), playerId: playerId })
    );
    console.log({ numberOfPlayerTiles: hexes.length });

    return new Grid(Tile, hexes);
};
