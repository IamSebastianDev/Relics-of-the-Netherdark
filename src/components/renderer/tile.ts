import { Hex, HexCoordinates, defineHex } from 'honeycomb-grid';
import { PlayerId } from 'rune-sdk';
import { TileType } from '../../backend/board/tile';
import { cuid } from '../../backend/utils/cuid';
import { TranslationKey } from '../../providers/language.provider';

export const translations: Record<TileType, { title: TranslationKey; description: TranslationKey }> = {
    'gemstone-caverns': { title: 'tiles.gemstoneCaverns.title', description: 'tiles.gemstoneCaverns.description' },
    'bone-hoards': { title: 'tiles.boneHoards.title', description: 'tiles.boneHoards.description' },
    'fungal-fields': { title: 'tiles.fungalFields.title', description: 'tiles.fungalFields.description' },
    'twisted-tunnels': { title: 'tiles.twistedTunnels.title', description: 'tiles.twistedTunnels.description' },
    'miners-enclaves': { title: 'tiles.minersEnclaves.title', description: 'tiles.minersEnclaves.description' },
    'hollow-henge': { title: 'tiles.hollowHenge.title', description: 'tiles.hollowHenge.description' },
    'ancient-shrines': { title: 'tiles.ancientShrines.title', description: 'tiles.ancientShrines.description' },
    entrance: { title: 'tiles.entrance.title', description: 'tiles.entrance.description' },
    undiscovered: { title: 'tiles.undiscovered.title', description: 'tiles.undiscovered.description' },
    void: { title: 'tiles.void.title', description: 'tiles.void.description' },
};

export class Tile extends defineHex({ dimensions: 1 }) {
    id = cuid();
    playerId: PlayerId | null = null;
    discovered = false;
    type!: TileType;
    shared!: PlayerId[];

    static create(coordinates: HexCoordinates, instance: Partial<Tile>) {
        const { playerId, type, discovered, id, shared } = instance;
        const hex = new Tile(coordinates);

        // We assign all the properties from the instance data
        // to the instance. This allows recreating the hex from
        // itself.
        Object.assign(hex, {
            shared: [...(shared ?? [])],
            id: id ?? hex.id,
            type: type ?? 'void',
            playerId: playerId ?? null,
            discovered: discovered ?? false,
        });

        return hex;
    }

    get position() {
        return { q: this.q, r: this.r };
    }

    get translationConfig() {
        return translations[this.type];
    }
}

export type TileCtor = Omit<Tile, keyof Hex> & { x: number; y: number };
