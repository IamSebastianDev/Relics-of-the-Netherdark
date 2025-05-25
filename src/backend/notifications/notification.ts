import { TranslationKey } from '../../providers/language.provider';
import { GameState } from '../game-state';
import { cuid } from '../utils/cuid';

export type Notification = {
    id: string;
    text: TranslationKey;
    payload: Record<PropertyKey, unknown>;
};

export const dispatchNotification = (game: GameState, notification: Notification) => {
    game.notifications.push(notification);
};

export const createNotification = <T extends TranslationKey>(
    notification: T extends `notifications.${string}` ? T : never,
    payload: Record<PropertyKey, unknown>
) => {
    return {
        id: cuid(),
        text: notification,
        payload,
    };
};
