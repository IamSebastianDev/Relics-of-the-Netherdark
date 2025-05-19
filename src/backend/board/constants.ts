import { HexCoordinates } from 'honeycomb-grid';
import { TileType } from './tile';

// The predefined start coordinates for the 6 players, starting
// from the first. There can't be more then 6 players, so 6
// hardcoded starting positions do fine + the initial center position
// to line up the player idx are set.
// biome-ignore format: Constants is better parse able this way
export const playerStartPositions = [[0,0], [0, 10], [0, -10], [10, 0], [-10, 0], [-7, 10], [10, -7]] satisfies HexCoordinates[]

// This is a predefined set of tile coordinates
const tileCoordinatesSources: Record<number, () => Set<string>> = {
    // biome-ignore format:
    0: () => new Set(['0:0', '1:-1', '1:0', '0:1', '-1:1', '-1:0', '0:-1', '1:-2', '2:-2', '2:-1', '2:0', '1:1', '0:2', '-1:2', '-2:2', '-2:1', '-2:0', '-1:-1', '0:-2', '2:-3', '3:-3', '3:-2', '3:-1', '3:0', '2:1', '1:2', '0:3', '-1:3', '-2:3', '-3:3', '-3:2', '-3:1', '-3:0', '-2:-1', '-1:-2', '0:-3', '1:-3', '2:-4', '3:-4', '4:-4', '4:-3', '4:-2', '4:-1', '4:0', '3:1', '2:2', '1:3', '0:4', '-1:4', '-2:4', '-3:4', '-4:4', '-4:3', '-4:2', '-4:1', '-4:0', '-3:-1', '-2:-2', '-1:-3', '0:-4', '1:-4']),
    // biome-ignore format:
    1: () => new Set(['0:7', '0:6', '1:6', '1:7', '0:8', '-1:8', '-1:7', '1:5', '2:5', '2:6', '2:7', '1:8', '0:9', '-1:9', '-2:9', '-2:8', '-2:7', '-1:6', '0:5', '1:4', '2:4', '3:4', '3:5', '3:6', '3:7', '2:8', '1:9', '-1:10', '-2:10', '-3:10', '-3:9', '-3:8', '-3:7', '-2:6', '-1:5', '0:4']).difference(tileCoordinatesSources[0]()),
    // biome-ignore format:
    2: () => new Set(['0:-7', '0:-8', '1:-8', '1:-7', '0:-6', '-1:-6', '-1:-7', '1:-9', '2:-9', '2:-8', '2:-7', '1:-6', '0:-5', '-1:-5', '-2:-5', '-2:-6', '-2:-7', '-1:-8', '0:-9', '1:-10', '2:-10', '3:-10', '3:-9', '3:-8', '3:-7', '2:-6', '1:-5', '0:-4', '-1:-4', '-2:-4', '-3:-4', '-3:-5', '-3:-6', '-3:-7', '-2:-8', '-1:-9', ]).difference(tileCoordinatesSources[0]()),
    // biome-ignore format:
    3: () => new Set(['7:0', '8:-1', '8:0', '7:1', '6:1', '6:0', '7:-1', '8:-2', '9:-2', '9:-1', '9:0', '8:1', '7:2', '6:2', '5:2', '5:1', '5:0', '6:-1', '7:-2', '9:-3', '10:-3', '10:-2', '10:-1',  '9:1', '8:2', '7:3', '6:3', '5:3', '4:3', '4:2', '4:1', '4:0', '5:-1', '6:-2', '7:-3', '8:-3']).difference(tileCoordinatesSources[0]()),
    // biome-ignore format:
    4: () => new Set(['-7:0', '-6:-1', '-6:0', '-7:1', '-8:1', '-8:0', '-7:-1', '-6:-2', '-5:-2', '-5:-1', '-5:0', '-6:1', '-7:2', '-8:2', '-9:2', '-9:1', '-9:0', '-8:-1', '-7:-2', '-5:-3', '-4:-3', '-4:-2', '-4:-1', '-4:0', '-5:1', '-6:2', '-7:3', '-8:3', '-9:3', '-10:3', '-10:2', '-10:1',  '-9:-1', '-8:-2', '-7:-3', '-6:-3']).difference(tileCoordinatesSources[0]()),
    // biome-ignore format:
    5: () => new Set(['-7:7', '-7:6', '-6:6', '-6:7', '-7:8', '-8:8', '-8:7', '-6:5', '-5:5', '-5:6', '-5:7', '-6:8', '-7:9', '-8:9', '-9:9', '-9:8', '-9:7', '-8:6', '-7:5', '-6:4', '-5:4', '-4:4', '-4:5', '-4:6', '-4:7', '-5:8', '-6:9',  '-8:10', '-9:10', '-10:10', '-10:9', '-10:8', '-10:7', '-9:6', '-8:5', '-7:4']).difference(tileCoordinatesSources[0]()),
    // biome-ignore format:
    6: () => new Set(['7:-7', '7:-8', '8:-8', '8:-7', '7:-6', '6:-6', '6:-7', '8:-9', '9:-9', '9:-8', '9:-7', '8:-6', '7:-5', '6:-5', '5:-5', '5:-6', '5:-7', '6:-8', '7:-9', '8:-10', '9:-10', '10:-10', '10:-9', '10:-8', '9:-6', '8:-5', '7:-4', '6:-4', '5:-4', '4:-4', '4:-5', '4:-6', '4:-7', '5:-8', '6:-9', '7:-10']).difference(tileCoordinatesSources[0]()),
};

export const getSource = (idx: number) => {
    if (idx in tileCoordinatesSources) {
        return tileCoordinatesSources[idx]();
    }

    throw new Error(`Unrecoverable Error: Player Start position out of bounds.`);
};

export const getCoordinates = (source: Set<string>) => {
    return [...source.values()].map((position) => {
        const [q, r] = position.split(':');
        return { q: parseInt(q), r: parseInt(r) };
    });
};

export const tileSources: Record<string, TileType[]> = {
    // The center board has 61 tiles to distribute. There is a even
    // distribution of 55 standard tiles (11 each) and 6 void tiles.
    // There are then 2 Relic Tiles, 2 Wizards towers, and the 'mouth',
    // that replace random tiles in the board.
    center: [
        ...Array.from({ length: 11 }, () => 'gemstone-caverns' as const),
        ...Array.from({ length: 11 }, () => 'twisted-tunnels' as const),
        ...Array.from({ length: 11 }, () => 'fungal-fields' as const),
        ...Array.from({ length: 11 }, () => 'miners-enclaves' as const),
        ...Array.from({ length: 11 }, () => 'bone-hoards' as const),
        ...Array.from({ length: 6 }, () => 'void' as const),
    ],
    player: [
        ...Array.from({ length: 11 }, () => 'gemstone-caverns' as const),
        ...Array.from({ length: 11 }, () => 'twisted-tunnels' as const),
        ...Array.from({ length: 11 }, () => 'fungal-fields' as const),
        ...Array.from({ length: 11 }, () => 'miners-enclaves' as const),
        ...Array.from({ length: 11 }, () => 'bone-hoards' as const),
    ],
};
