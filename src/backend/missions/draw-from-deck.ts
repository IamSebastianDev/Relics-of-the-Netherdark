import { random } from '../utils/random';
import { Mission } from './mission';

// Utility function to draw from the deck
export const drawFromDeck = (deck: Record<string, Mission>, type: 'solo' | 'diplomatic') => {
    // In theory, we can never empty the deck of
    // cards, but we should still make sure we got one
    const keys = Object.keys(deck);
    if (!keys.length) {
        throw new ReferenceError(`Unrecoverable Error: Cannot draw from an empty deck.`);
    }

    switch (type) {
        case 'diplomatic': {
            // Get all keys of the diplomatic missions
            const keys = Object.entries(deck).filter(([_, { rarity }]) => rarity === 'diplomatic');
            const [key] = random(keys);
            const { [key]: mission, ...rest } = deck;
            return [mission, rest] as const;
        }
        case 'solo': {
            // Get all keys that are are not diplomatic missions
            const keys = Object.entries(deck).filter(([_, { rarity }]) => rarity !== 'diplomatic');
            const [key] = random(keys);
            const { [key]: mission, ...rest } = deck;
            return [mission, rest] as const;
        }
    }
};
