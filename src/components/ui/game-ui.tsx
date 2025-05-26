import { PlayerId } from 'rune-sdk';
import map from '../../assets/icons/map.png';
import menu from '../../assets/icons/menu.png';
import missions from '../../assets/icons/missions.png';
import settings from '../../assets/icons/settings.png';
import { TileData } from '../../backend/board/tile';
import { Notification } from '../../backend/notifications/notification';
import { useGrid } from '../../hooks/use-grid';
import { useNotifications } from '../../hooks/use-notifications';
import { usePlayerColor } from '../../hooks/use-player-attributes';
import { usePlayerProfile } from '../../hooks/use-player-profile';
import { useGameState } from '../../providers/game-state.provider';
import { useLanguage } from '../../providers/language.provider';
import { useScene } from '../../providers/scene.provider';
import { useSettings } from '../../providers/settings.provider';
import { useJournalStore } from '../../stores/journal.store';
import { useSettingsStore } from '../../stores/settings.store';
import { useTileOverviewStore } from '../../stores/tile-overview.store';
import { useTileSelectorStore } from '../../stores/tile-selector.store';
import { Journal, MissionOverlay } from './mission-overlay';
import { Settings } from './settings';

const PlayerAvatar = ({ playerId, active }: { playerId: PlayerId; active: boolean }) => {
    const data = usePlayerProfile(playerId);
    const { color } = usePlayerColor(playerId);

    if (!data) {
        return null;
    }

    return (
        <div
            className="player-avatar"
            data-is-active={active}
            style={{ '--player-color': color } as React.CSSProperties}
        >
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
    const { selectedTileId } = useTileSelectorStore();
    const { overviewEnabled } = useTileOverviewStore();
    const { translate: t } = useLanguage();
    const selectedTile =
        useGrid()
            .toArray()
            .find((tile) => tile.id === selectedTileId) ?? null;
    const playerData = usePlayerProfile(selectedTile?.playerId ?? null);

    if (!selectedTileId || !overviewEnabled || !selectedTile) {
        return null;
    }

    return (
        <div className="tile-panel">
            <div className="row center between">
                <div className="tile-title">{t(selectedTile.translationConfig.title)}</div>
                <div className="tile-coordinates">{formatPosition(selectedTile.position)}</div>
            </div>
            <div className="tile-claimant">Claimed by: {playerData?.displayName ?? 'no one'}</div>
            <div className="tile-description">{t(selectedTile.translationConfig.description)}</div>
        </div>
    );
};

const Navigation = () => {
    const { toggle: toggleJournal } = useJournalStore();
    const { localPlayerId, playerState } = useGameState();
    const { toggle: toggleSettings } = useSettingsStore();
    const scene = useScene();

    return (
        <nav className="screen-navigation">
            <ul>
                <li>
                    <button disabled={true}>
                        <img src={map} />
                    </button>
                </li>
                <li>
                    <button
                        disabled={
                            localPlayerId === undefined ||
                            !!(localPlayerId && playerState[localPlayerId].missions.length === 0)
                        }
                        onClick={() => toggleJournal(true)}
                    >
                        <img src={missions} />
                    </button>
                </li>
                <li>
                    <button onClick={() => toggleSettings(true)}>
                        <img src={settings} />
                    </button>
                </li>
                <li>
                    <button onClick={() => scene.next('main')}>
                        <img src={menu} />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

const Message = ({ notification }: { notification: Notification }) => {
    const { translate: t } = useLanguage();
    const data = usePlayerProfile((notification.payload['playerId'] as string) ?? null);
    return (
        <div className="message">{t(notification.text, { ...notification.payload, player: data?.displayName })}</div>
    );
};

const Notifications = () => {
    const notifications = useNotifications();

    return (
        <div className="stack notification-outlet">
            {notifications.map((notification) => (
                <Message key={notification.id} notification={notification} />
            ))}
        </div>
    );
};

export const GameUi = () => {
    const { isOpen: settingsOpen } = useSettingsStore();
    const { mirrorUi } = useSettings();

    return (
        <div className="overlay" data-mirrored={mirrorUi}>
            <TileOverview />
            <PlayerAvatarGroup />
            <MissionOverlay />
            <Journal />
            <Navigation />
            <Notifications />
            {settingsOpen && <Settings />}
        </div>
    );
};
