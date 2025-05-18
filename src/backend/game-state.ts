import { PlayerId } from 'rune-sdk';
import { Board } from './board/board';
import { Mission } from './missions/mission';
import { PlayerState } from './player/player-state';

export type GameState = {
    allPlayerIds: PlayerId[];
    playerState: Record<PlayerId, PlayerState>;
    currentActivePlayer: PlayerId;
    missionDeck: Record<string, Mission>;
    board: Board;
};
