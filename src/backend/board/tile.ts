import { Hex } from 'honeycomb-grid';
import { Tile } from '../../components/renderer/tile';
import { cuid } from '../utils/cuid';

export type TileType =
    | 'gemstone-caverns'
    | 'bone-hoards'
    | 'fungal-fields'
    | 'twisted-tunnels'
    | 'miners-enclaves'
    | 'hollow-henge'
    | 'ancient-shrines'
    | 'entrance'
    | 'undiscovered'
    | 'void';

export type TileData = Omit<Tile, keyof Hex | 'translationConfig'>;

export const createTile = (pos: { q: number; r: number }, tile: Partial<TileData> = {}): TileData => {
    return {
        id: cuid(),
        playerId: null,
        shared: [],
        discovered: false,
        type: 'void',
        get position() {
            return { q: pos.q, r: pos.r };
        },
        ...tile,
    };
};
