import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { PlayerId } from 'rune-sdk';
import type { GameState as RuneState } from '../backend/game-state';
import { PlayerState } from '../backend/player/player-state';
import { useSafeContext } from '../hooks/use-safe-context';

export type GameState = RuneState & {
    localPlayerId: PlayerId | undefined;
    invalidate: number;
    playerData: PlayerState | undefined;
};

const GameStateContext = createContext<GameState | null>(null);

export const GameStateProvider = ({ children }: PropsWithChildren) => {
    const [game, setGame] = useState<RuneState>();
    const [playerData, setPlayerData] = useState<PlayerState | undefined>();
    const [localPlayerId, setLocalPlayerId] = useState<PlayerId | undefined>();
    const [invalidate, setInvalidate] = useState(0);

    useEffect(() => {
        Rune.initClient({
            onChange: ({ game, yourPlayerId }) => {
                setGame(game);

                setInvalidate((v) => v + 1);
                if (yourPlayerId) {
                    setLocalPlayerId(yourPlayerId);
                    setPlayerData(game.playerState[yourPlayerId]);
                }
            },
        });
    }, []);

    // Rune only shows the game after an onChange(), so we return null
    // while the game has not initialized.
    if (!game) {
        return null;
    }

    return (
        <GameStateContext.Provider value={{ ...game, localPlayerId, invalidate, playerData }}>
            {children}
        </GameStateContext.Provider>
    );
};

export const useGameState = () => {
    return useSafeContext(GameStateContext);
};
