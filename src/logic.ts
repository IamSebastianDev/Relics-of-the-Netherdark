import type { RuneClient } from 'rune-sdk';
import { checkMissionTiles, checkShrineTiles, createPlayerTiles, discoverTiles } from './backend/board/board';
import { fromAxial, gridFromJson, gridToJson } from './backend/board/grid-shim';
import { GameActions } from './backend/game-actions';
import { GameState, checkGameState } from './backend/game-state';
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
            const grid = gridFromJson(game.board);
            const tile = grid.get(fromAxial({ q, r }));

            // Claiming is simple, we just set the tiles playerId if it
            // current id is null, and discover all the neighbors.
            if (tile?.playerId === null) {
                grid.set(fromAxial({ q, r }), { ...tile, playerId: playerId });

                // also discover all neighbors
                discoverTiles(grid, { q, r });
            }

            // After that we check wizards towers, to prompt the user to
            // draw a mission and also set participation on the tile.
            // The fn returns the number of missions the player should be getting
            // and mutates the grid directly (because runes proxy.)
            const numberOfMissions = checkMissionTiles(grid, { q, r }, playerId);

            // We also need to check the board for changed possession of shrines
            checkShrineTiles(grid, { q, r });
            // Check for game end
            checkGameState(game, grid);

            // Commit the updated board to the
            game.board = gridToJson(grid);
            game.playerState[playerId].drawMissions += numberOfMissions;
            // Update to the next player
            game.currentActivePlayer = nextPlayer(game.allPlayerIds, game.currentActivePlayer);
        },
        drawMission: (type, { playerId, game }) => {
            const [mission, deck] = drawFromDeck(game.missionDeck, type);
            game.playerState[playerId].missions.push(mission);
            game.playerState[playerId].drawMissions -= 1;
            game.missionDeck = deck;

            if (type === 'diplomatic') {
                game.diplomaticMissionsLeft -= 1;
            }
        },
    },
    events: {
        playerJoined: (playerId, { game }) => {
            game.playerState[playerId] = initialPlayerState();
            game.allPlayerIds.push(playerId);

            const grid = gridFromJson(game.board);
            for (const [position, tile] of createPlayerTiles(playerId, game.allPlayerIds.length)) {
                grid.set(position, tile);
            }

            game.board = gridToJson(grid);
        },
        playerLeft: (playerId, { game }) => {
            game.allPlayerIds = game.allPlayerIds.filter((id) => id !== playerId);
            // @todo -> figure out if want to remove player tiles, or if we keep them,
            // because then we could also enable player's resyncing to their game state
            delete game.playerState[playerId];
        },
    },
});
