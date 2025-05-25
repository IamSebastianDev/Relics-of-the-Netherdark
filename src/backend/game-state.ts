import { PlayerId } from 'rune-sdk';
import { Board } from './board/board';
import { Grid, getNeighbors } from './board/grid-shim';
import { TileType } from './board/tile';
import { getMissionReward } from './missions/get-mission-rewards';
import { Mission } from './missions/mission';
import { PlayerState } from './player/player-state';

export type GameState = {
    allPlayerIds: PlayerId[];
    hostPlayer: PlayerId;
    playerState: Record<PlayerId, PlayerState>;
    currentActivePlayer: PlayerId;
    missionDeck: Record<string, Mission>;
    diplomaticMissionsLeft: number;
    board: Board;
};

const getTileReward = (tile: { type: TileType }) => {
    return (
        {
            'gemstone-caverns': 2,
            'ancient-shrines': 10,
            'bone-hoards': -1,
            'fungal-fields': 1,
            'twisted-tunnels': -1,
            'miners-enclaves': 1,
            entrance: 0,
            void: 0,
            'hollow-henge': 0,
            undiscovered: 0,
        }[tile.type] ?? 0
    );
};

const calculatePlayerPoints = (game: GameState, grid: Grid) => {
    return {
        players: Object.fromEntries(
            game.allPlayerIds
                .filter((playerId) => !playerId.startsWith('[ai]'))
                .map((playerId) => {
                    const missionPoints = game.playerState[playerId].missions.reduce((score, mission) => {
                        return score + getMissionReward(game, grid, mission, playerId);
                    }, 0);

                    const tilePoints = [...grid.values()]
                        .filter((tile) => tile.playerId === playerId)
                        .reduce((score, tile) => score + getTileReward(tile), 0);

                    return [playerId, missionPoints + tilePoints];
                })
        ),
    };
};

export const checkGameState = (game: GameState, grid: Grid) => {
    // The game is over, if all relics have been claimed completely.
    // That means, all neighbor tiles that a relic has, must be claimed
    const shrines = [...grid.values()].filter((tile) => tile.type === 'ancient-shrines');

    const complete = !shrines
        .flatMap((shrine) => getNeighbors(grid, shrine.position))
        .some((tile) => tile.type !== 'hollow-henge' && tile.type !== 'void' && tile.playerId === null);

    if (complete) {
        Rune.gameOver({
            ...calculatePlayerPoints(game, grid),
        });
    }
};
