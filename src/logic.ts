import { Grid, spiral } from 'honeycomb-grid';
import type { RuneClient } from 'rune-sdk';
import { createPlayerTiles } from './backend/board/board';
import { Tile } from './backend/board/tile';
import { GameActions } from './backend/game-actions';
import { GameState } from './backend/game-state';
import { drawFromDeck } from './backend/missions/draw-from-deck';
import { nextPlayer } from './backend/player/next-player';
import { initialPlayerState } from './backend/player/player-state';
import { setup } from './backend/setup';

declare global {
    const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
    minPlayers: 1,
    maxPlayers: 6,
    setup: setup,
    actions: {
        claimTile: ([_, { q, r }], { playerId, game }) => {
            const grid = Grid.fromJSON(game.board, ({ q, r, ...ctor }) => Tile.create({ q, r }, ctor));
            const tile = grid.getHex({ q, r });

            // Simple claim. If belongs to no one,
            // claim for player. Otherwise do nothing.
            if (tile?.playerId === null) {
                grid.setHexes([{ q, r }, Tile.create({ q, r }, { ...tile, playerId: playerId })]);
                // also discover all neighbors
                const neighbors = grid.traverse(spiral({ radius: 1, start: { q, r } }));
                grid.setHexes(
                    neighbors.map((tile) => Tile.create({ q: tile.q, r: tile.r }, { ...tile, discovered: true }))
                );
            }

            game.board = new Grid(grid).toJSON();

            // Update to the next player
            game.currentActivePlayer = nextPlayer(game.allPlayerIds, game.currentActivePlayer);
        },
        drawMission: (_, { playerId, game }) => {
            const [mission, deck] = drawFromDeck(game.missionDeck);
            game.playerState[playerId].missions.push(mission);
            game.missionDeck = deck;
        },
    },
    events: {
        playerJoined: (playerId, { game }) => {
            game.playerState[playerId] = initialPlayerState();
            game.allPlayerIds.push(playerId);

            const grid = Grid.fromJSON(game.board, ({ q, r, ...ctor }) => Tile.create({ q, r }, { ...ctor }));
            grid.setHexes(createPlayerTiles(playerId, game.allPlayerIds.length));

            game.board = grid.toJSON();
        },
        playerLeft: (playerId, { game }) => {
            game.allPlayerIds = game.allPlayerIds.filter((id) => id !== playerId);
            // We might want to implement the player left, however we
            // would need to manipulate game state for that, so well have
            // to see if we actually can
            delete game.playerState[playerId];
        },
    },
});
