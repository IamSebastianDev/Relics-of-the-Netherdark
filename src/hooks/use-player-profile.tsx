import { Player, PlayerId } from 'rune-sdk';

export const usePlayerProfile = (playerId: PlayerId | null) => {
    switch (true) {
        case playerId === null:
            return null;
        case playerId?.startsWith('[ai]'):
            return { playerId, displayName: 'AI', avatarUrl: '/images/ai-avatar.jpg' } as Player;
        default:
            return playerId ? Rune.getPlayerInfo(playerId) : null;
    }
};
