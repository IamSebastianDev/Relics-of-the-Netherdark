import { random } from '../utils/random';
import { TileType } from './tile';

export const createTilePool = (source: TileType[]) => {
    const _source = new Map<number, TileType>(source.map((type, idx) => [idx, type]));

    const depleted = () => _source.size <= 0;

    return {
        depleted,
        next: () => {
            if (depleted()) {
                console.warn(`Drawing from depleted Tile Pool, default to void.`);
                return 'void';
            }

            const [idx, type] = random([..._source.entries()]);
            _source.delete(idx);

            return type;
        },
    };
};
