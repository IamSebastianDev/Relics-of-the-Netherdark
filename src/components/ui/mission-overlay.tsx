import { useGameState } from '../../providers/game-state.provider';
import { useLanguage } from '../../providers/language.provider';
import { useJournalStore } from '../../stores/journal.store';

const MissionCard = ({ type }: { type: 'solo' | 'diplomatic' }) => {
    const { translate: t } = useLanguage();

    return (
        <button className="mission-card" data-mission-type={type} onClick={() => Rune.actions.drawMission(type)}>
            <div className="title">{t('missions.labels.(title)', { ctx: { type } })}</div>
            <div className="description">{t('missions.labels.(description)', { ctx: { type } })}</div>
        </button>
    );
};

export const MissionOverlay = () => {
    const { translate: t } = useLanguage();
    const { playerState, localPlayerId, diplomaticMissionsLeft } = useGameState();
    if (!localPlayerId) return null;

    const { drawMissions } = playerState[localPlayerId];
    if (drawMissions <= 0) return null;

    return (
        <div className="mission-overlay">
            <div className="mission-left">{drawMissions}</div>
            <div className="title">{t('components.missionOverlay.title')}</div>
            <div className="instruction">{t('components.missionOverlay.instruction')}</div>
            <div className="stack mission-cards">
                <MissionCard type="solo" />
                {diplomaticMissionsLeft > 0 && <MissionCard type="diplomatic" />}
            </div>
        </div>
    );
};

import close from '../../assets/icons/close.png';
import { Mission } from '../../backend/missions/mission';

const JournalEntry = ({ mission }: { mission: Mission }) => {
    const { translate: t } = useLanguage();
    return (
        <div className="journal-entry" data-rarity={mission.rarity} data-reward={mission.reward}>
            <div className="title">{t(mission.name)}</div>
            <div className="description">{t(mission.description)}</div>
        </div>
    );
};

export const Journal = () => {
    const { isOpen, toggle: toggleJournal } = useJournalStore();
    const { localPlayerId, playerState } = useGameState();
    // const { translate: t } = useLanguage();

    if (!localPlayerId) return null;

    const { missions } = playerState[localPlayerId];

    if (!isOpen) return null;

    return (
        <div className="mission-overlay">
            <button className="mission-close" onClick={() => toggleJournal(false)}>
                <img src={close} />
            </button>
            {missions.map((mission) => {
                return <JournalEntry key={mission.id} mission={mission} />;
            })}
        </div>
    );
};
