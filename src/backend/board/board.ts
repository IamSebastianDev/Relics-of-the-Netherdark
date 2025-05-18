import { Grid, GridAsJSON, Hex, spiral } from 'honeycomb-grid';
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
export const createCenterTiles = (): Board => {
    const pool = new TilePool(centerTilePoolSource);
    const coordinates = new Grid(Hex, spiral({ radius: 4 }));
    const hexes = coordinates.toArray().map((hex) => Tile.create(hex, { type: pool.next() }));
    return new Grid(Tile, hexes).toJSON();
};

// export const createPlayerTiles = (playerId: PlayerId, placement: number) => {
//     return {} as Board;
// };
