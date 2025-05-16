type TileType = "gemstone_caverns" | "bonehoard";

export type Tile = {
    tileId: string;
    type: TileType;
    texturePath: string;
    position: [x: number, y: number];
};
