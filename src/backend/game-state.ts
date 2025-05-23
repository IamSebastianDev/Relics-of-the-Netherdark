import { Grid, spiral } from 'honeycomb-grid';
import { PlayerId } from 'rune-sdk';
import { Board } from './board/board';
import { Tile } from './board/tile';
import { getMissionReward } from './missions/get-mission-rewards';
import { Mission } from './missions/mission';
import { PlayerState } from './player/player-state';

export type GameState = {
    allPlayerIds: PlayerId[];
    playerState: Record<PlayerId, PlayerState>;
    currentActivePlayer: PlayerId;
    missionDeck: Record<string, Mission>;
    board: Board;
};

const getTileReward = (tile: Tile) => {
    return (
        {
            'gemstone-caverns': 2,
            'ancient-shrines': 10,
            'bone-hoards': 0,
            'fungal-fields': 1,
            'twisted-tunnels': 0,
            'miners-enclaves': 1,
            entrance: 0,
            void: 0,
            'hollow-henge': 0,
            undiscovered: 0,
        }[tile.type] ?? 0
    );
};

const calculatePlayerPoints = (game: GameState, grid: Grid<Tile>) => {
    return {
        players: Object.fromEntries(
            game.allPlayerIds.map((playerId) => {
                const missionPoints = game.playerState[playerId].missions.reduce((score, mission) => {
                    return score + (getMissionReward(game, mission, playerId) ? mission.reward : 0);
                }, 0);

                const tilePoints = grid
                    .toArray()
                    .filter((tile) => tile.playerId !== playerId)
                    .reduce((score, tile) => score + getTileReward(tile), 0);

                return [playerId, missionPoints + tilePoints];
            })
        ),
    };
};

export const checkGameState = (game: GameState, grid: Grid<Tile>) => {
    // The game is over, if all relics have been claimed completely.
    // That means, all neighbor tiles that a relic has, must be claimed
    const shrines = grid.toArray().filter((tile) => tile.type === 'ancient-shrines');

    const complete = !shrines
        .flatMap((shrine) => grid.traverse(spiral({ radius: 1, start: shrine })).toArray())
        .some((tile) => tile.type !== 'hollow-henge' && tile.playerId === null);

    if (complete) {
        Rune.gameOver({
            ...calculatePlayerPoints(game, grid),
        });
    }
};
