import { PlayerId } from 'rune-sdk';
import { TileData } from '../../backend/board/tile';
import { usePlayerProfile } from '../../hooks/use-player-profile';
import { useGameState } from '../../providers/game-state.provider';
import { useLanguage } from '../../providers/language.provider';
import { useTileOverviewStore } from '../../stores/tile-overview.store';
import { useTileSelectorStore } from '../../stores/tile-selector.store';

const PlayerAvatar = ({ playerId, active }: { playerId: PlayerId; active: boolean }) => {
    const data = Rune.getPlayerInfo(playerId);
    return (
        <div className="player-avatar" data-is-active={active}>
            <img src={data.avatarUrl} />
        </div>
    );
};

const PlayerAvatarGroup = () => {
    const { allPlayerIds, currentActivePlayer } = useGameState();
    return (
        <div className="stack avatar-group">
            {allPlayerIds.map((id) => (
                <PlayerAvatar key={id} playerId={id} active={currentActivePlayer === id} />
            ))}
        </div>
    );
};

const formatPosition = (position: TileData['position']) => {
    return `${position.q}:${position.r}`;
};

const TileOverview = () => {
    const { selectedTile } = useTileSelectorStore();
    const { overviewEnabled } = useTileOverviewStore();
    const { translate: t } = useLanguage();
    const playerData = usePlayerProfile(selectedTile?.playerId ?? null);

    if (!selectedTile || !overviewEnabled) {
        return null;
    }

    return (
        <div className="tile-panel">
            <div className="row center between">
                <div className="tile-title">{t(selectedTile.translationConfig.title)}</div>
                <div className="tile-coordinates">{formatPosition(selectedTile.position)}</div>
            </div>
            <div className="tile-claimant">Claimed by: {playerData?.displayName ?? 'no one'}</div>
            <div>{t(selectedTile.translationConfig.description)}</div>
        </div>
    );
};

export const GameUi = () => {
    return (
        <div className="overlay">
            <TileOverview />
            <PlayerAvatarGroup />
        </div>
    );
};
