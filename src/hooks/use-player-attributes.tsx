import { useTexture } from '@react-three/drei';
import { PlayerId } from 'rune-sdk';
import { useGameState } from '../providers/game-state.provider';

const playerAttributes = [
    {
        texture: './textures/fire-dwarves.png',
        color: 'steelblue',
    },
    {
        texture: './textures/priests-of-the-deep.png',
        color: 'mediumpurple',
    },
    {
        texture: './textures/hollow-crown.png',
        color: 'tomato',
    },
    {
        texture: './textures/emerald-thorns.png',
        color: 'seagreen',
    },
    {
        texture: './textures/ashen-veil.png',
        color: 'indianred',
    },
    {
        texture: './textures/gilded-sworn.png',
        color: 'gray',
    },
    // Placeholder texture and color, indicating a
    // player that left the game.
    {
        texture: './textures/placeholder.png',
        color: 'black',
    },
];

for (const { texture } of playerAttributes) {
    useTexture.preload(texture);
}

export const usePlayerAttributes = (playerId: PlayerId) => {
    const { allPlayerIds } = useGameState();
    const idx = allPlayerIds.findIndex((id) => playerId === id);
    // @todo -> update fallback texture
    const attributes = playerAttributes[idx] ?? playerAttributes.at(-1);
    const texture = useTexture(attributes.texture);

    return {
        texture: texture,
        color: attributes.color,
    };
};
