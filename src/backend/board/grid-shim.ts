import { TileData } from './tile';

export const toAxial = (loc: string) => {
    const [q, r] = loc.split(':');
    return { q: +q, r: +r };
};

export const fromAxial = ({ q, r }: { q: number; r: number }) => {
    return `${q}:${r}`;
};

export const calculateAxialCoordinate = ({ q, r }: { q: number; r: number }) => {
    return { q, r, s: -q - r };
};

export const grid = new Map<string, TileData>();
export type Grid = Map<string, TileData>;
export const gridToJson = (grid: Grid) => {
    return {
        coordinates: [...grid.entries()].map(([key, tile]) => ({ ...calculateAxialCoordinate(toAxial(key)), ...tile })),
        hexSettings: {
            dimensions: { xRadius: 1, yRadius: 1 },
            orientation: 'POINTY',
            offset: -1,
            origin: { x: 0, y: 0 },
        },
    };
};

export type SerializedGrid = ReturnType<typeof gridToJson>;

export const gridFromJson = (grid: SerializedGrid) => {
    return new Map<string, TileData>(grid.coordinates.map((tile) => [fromAxial({ q: tile.q, r: tile.r }), tile]));
};

export const getNeighbors = (grid: Grid, start: { q: number; r: number }) => {
    // for any given point, we need to find all coordinates that
    // are direct neighbors of the given start coordinate. The start
    // coordinate it self is skipped. This is possible by defining the
    // six cardinal coordinates, that surround a hex tile
    // $ {q: 1, r: -1}
    // $ {q: 1, r: 0}
    // $ {q: 0, r: 1}
    // $ {q: -1, r: 1}
    // $ {q: -1, r: 0}
    // $ {q: 0, r: -1}
    // biome-ignore format:
    const adjacent = [{q: 1, r: -1}, {q: 1, r: 0}, {q: 0, r: 1}, {q: -1, r: 1}, {q: -1, r: 0}, {q: 0, r: -1}];

    const neighbors: TileData[] = [];
    for (const local of adjacent) {
        const [q, r] = [start.q + local.q, start.r + local.r];
        if (grid.has(fromAxial({ q, r }))) {
            neighbors.push(grid.get(fromAxial({ q, r }))!);
        }
    }

    return neighbors;
};
