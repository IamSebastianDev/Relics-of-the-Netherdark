import { random } from '../utils/random';
import { Mission } from './mission';

// Utility function to draw from the deck
export const drawFromDeck = (deck: Record<string, Mission>) => {
    // In theory, we can never empty the deck of
    // cards, but we should still make sure we got one
    const keys = Object.keys(deck);
    if (!keys.length) {
        throw new ReferenceError(`Unrecoverable Error: Cannot draw from an empty deck.`);
    }

    const key = random(keys);
    const { [key]: mission, ...rest } = deck;

    return [mission, rest] as const;
};
