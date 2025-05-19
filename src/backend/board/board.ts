import { Grid, GridAsJSON } from 'honeycomb-grid';
import { PlayerId } from 'rune-sdk';
import { getCoordinates, getSource } from './constants';
import { Tile } from './tile';
import { TilePool } from './tile-pool';

const centerTilePoolSource: Tile['type'][] = [
    'bone-hoard',
    'bone-hoard',
    'bone-hoard',
    'bone-hoard',
    'bone-hoard',
    'bone-hoard',
    'bone-hoard',
    'bone-hoard',
    'bone-hoard',
    'bone-hoard',
    'bone-hoard',
    'bone-hoard',
    'fungal-forest',
    'fungal-forest',
    'fungal-forest',
    'fungal-forest',
    'fungal-forest',
    'fungal-forest',
    'fungal-forest',
    'fungal-forest',
    'fungal-forest',
    'fungal-forest',
    'fungal-forest',
    'fungal-forest',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'twisted-tunnels',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'gemstone-caverns',
    'void',
    'void',
    'void',
    'void',
    'void',
    'void',
];

export type Board = GridAsJSON<Tile>;
export const createCenterTiles = () => {
    const pool = new TilePool(centerTilePoolSource);
    const hexes = getCoordinates(getSource(0)).map((hex) => Tile.create(hex, { type: pool.next() }));
    console.log({ numberOfCenterTiles: hexes.length });
    return new Grid(Tile, hexes);
};

export const createPlayerTiles = (playerId: PlayerId, playerIdx: number) => {
    const pool = new TilePool(centerTilePoolSource);
    const hexes = getCoordinates(getSource(playerIdx)).map((hex) =>
        Tile.create(hex, { type: pool.next(), playerId: playerId })
    );
    console.log({ numberOfPlayerTiles: hexes.length });

    return new Grid(Tile, hexes);
};
