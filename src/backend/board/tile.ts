import { PlayerId } from 'rune-sdk';

type TileType = 'gemstone_caverns' | 'bone-hoard';

export type Tile = {
    tileId: string;
    playerId: PlayerId | null;
    discovered: boolean;
    type: TileType;
    position: [x: number, y: number];
};
