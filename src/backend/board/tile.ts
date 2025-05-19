import { HexCoordinates, defineHex } from 'honeycomb-grid';
import { PlayerId } from 'rune-sdk';

export type TileType =
    | 'gemstone-caverns'
    | 'bone-hoards'
    | 'fungal-fields'
    | 'twisted-tunnels'
    | 'miners-enclaves'
    | 'wizards-towers'
    | 'ancient-shrines'
    | 'the-mouth'
    | 'entrance'
    | 'undiscovered'
    | 'void';

export class Tile extends defineHex({ dimensions: 1 }) {
    id = crypto.randomUUID();
    playerId: PlayerId | null = null;
    discovered = false;
    type!: TileType;

    static create(coordinates: HexCoordinates, instance: Partial<Tile>) {
        const { playerId, type, discovered } = instance;
        const hex = new Tile(coordinates);

        // We assign all the properties from the instance data
        // to the instance. This allows recreating the hex from
        // itself.
        Object.assign(hex, {
            type: type ?? 'void',
            playerId: playerId ?? null,
            discovered: discovered ?? false,
        });

        return hex;
    }
}
