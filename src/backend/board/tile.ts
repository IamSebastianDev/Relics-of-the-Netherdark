import { Hex, HexCoordinates, defineHex } from 'honeycomb-grid';
import { PlayerId } from 'rune-sdk';
import { TranslationKey } from '../../providers/language.provider';
import { cuid } from '../utils/cuid';

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

const translations: Record<TileType, { title: TranslationKey; description: TranslationKey }> = {
    'gemstone-caverns': { title: 'tiles.gemstoneCaverns.title', description: 'tiles.gemstoneCaverns.description' },
    'bone-hoards': { title: 'tiles.boneHoards.title', description: 'tiles.boneHoards.description' },
    'fungal-fields': { title: 'tiles.fungalFields.title', description: 'tiles.fungalFields.description' },
    'twisted-tunnels': { title: 'tiles.twistedTunnels.title', description: 'tiles.twistedTunnels.description' },
    'miners-enclaves': { title: 'tiles.minersEnclaves.title', description: 'tiles.minersEnclaves.description' },
    'wizards-towers': { title: 'tiles.wizardsTowers.title', description: 'tiles.wizardsTowers.description' },
    'ancient-shrines': { title: 'tiles.ancientShrines.title', description: 'tiles.ancientShrines.description' },
    'the-mouth': { title: 'tiles.theMouth.title', description: 'tiles.theMouth.description' },
    entrance: { title: 'tiles.entrance.title', description: 'tiles.entrance.description' },
    undiscovered: { title: 'tiles.undiscovered.title', description: 'tiles.undiscovered.description' },
    void: { title: 'tiles.void.title', description: 'tiles.void.description' },
};

export class Tile extends defineHex({ dimensions: 1 }) {
    id = cuid();
    playerId: PlayerId | null = null;
    discovered = false;
    type!: TileType;

    static create(coordinates: HexCoordinates, instance: Partial<Tile>) {
        const { playerId, type, discovered, id } = instance;
        const hex = new Tile(coordinates);

        // We assign all the properties from the instance data
        // to the instance. This allows recreating the hex from
        // itself.
        Object.assign(hex, {
            id: id ?? hex.id,
            type: type ?? 'void',
            playerId: playerId ?? null,
            discovered: discovered ?? false,
        });

        return hex;
    }

    get position() {
        return { q: this.q, r: this.r, x: this.x, y: this.y };
    }

    get translationConfig() {
        return translations[this.type];
    }
}

export type TileData = Omit<Tile, keyof Hex>;
