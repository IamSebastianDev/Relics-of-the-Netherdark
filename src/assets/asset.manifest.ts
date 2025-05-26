import claim from '../assets/icons/claim.png';
import close from '../assets/icons/close.png';
import details from '../assets/icons/details.png';
import menu from '../assets/icons/menu.png';
import missions from '../assets/icons/missions.png';
import settings from '../assets/icons/settings.png';
import title from '../assets/images/title.jpg';
import { models } from '../hooks/use-model';
import { playerAttributes } from '../hooks/use-player-attributes';
import { AssetManifestEntry } from '../providers/asset-loader.provider';

export default new Set<AssetManifestEntry>([
    {
        type: 'image',
        src: './images/ai-avatar.jpg',
    },
    {
        type: 'image',
        src: './images/ai-avatar.jpg',
    },
    {
        type: 'image',
        src: title,
    },
    {
        type: 'image',
        src: './textures/background.png',
    },
    // Icons
    {
        type: 'image',
        src: claim,
    },
    {
        type: 'image',
        src: close,
    },
    {
        type: 'image',
        src: details,
    },
    {
        type: 'image',
        src: missions,
    },
    {
        type: 'image',
        src: settings,
    },
    {
        type: 'image',
        src: menu,
    },
    // Player Insignia
    ...[...playerAttributes.values()].map(({ texture }) => ({ src: texture, type: 'image' as const })),
    // Models
    ...[...models.values()].map((src) => ({ src, type: 'gltf' as const })),
]);
