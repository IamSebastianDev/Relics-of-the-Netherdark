import { random } from '../utils/random';
import { TileType } from './tile';

export class TilePool {
    #source: Map<number, TileType>;
    constructor(source: TileType[]) {
        this.#source = new Map(source.map((type, idx) => [idx, type]));
    }

    get depleted() {
        return this.#source.size <= 0;
    }

    next() {
        if (this.depleted) {
            console.warn(`Drawing from depleted Tile Pool, default to void.`);
            return 'void';
        }

        const [idx, type] = random([...this.#source.entries()]);
        this.#source.delete(idx);

        return type;
    }
}
