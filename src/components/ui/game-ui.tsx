import { PlayerId } from 'rune-sdk';
import { TileData } from '../../backend/board/tile';
import { usePlayerProfile } from '../../hooks/use-player-profile';
import { useGameState } from '../../providers/game-state.provider';
import { useLanguage } from '../../providers/language.provider';
import { useTileOverviewStore } from '../../stores/tile-overview.store';
import { useTileSelectorStore } from '../../stores/tile-selector.store';
import { Journal, MissionOverlay } from './mission-overlay';

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
            <div className="tile-description">{t(selectedTile.translationConfig.description)}</div>
        </div>
    );
};

import map from '../../assets/icons/map.png';
import missions from '../../assets/icons/missions.png';
import settings from '../../assets/icons/settings.png';
import { usePlayerColor } from '../../hooks/use-player-attributes';
import { useSettings } from '../../providers/settings.provider';
import { useJournalStore } from '../../stores/journal.store';
import { useSettingsStore } from '../../stores/settings.store';
import { Settings } from './settings';

const Navigation = () => {
    const { toggle: toggleJournal } = useJournalStore();
    const { localPlayerId, playerState } = useGameState();
    const { toggle: toggleSettings } = useSettingsStore();

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
            </ul>
        </nav>
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
            {settingsOpen && <Settings />}
        </div>
    );
};
