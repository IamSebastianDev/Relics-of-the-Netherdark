import { useGameState } from '../../providers/game-state.provider';
import { useLanguage } from '../../providers/language.provider';

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
    const { playerState, localPlayerId } = useGameState();
    if (!localPlayerId) return null;

    const { drawMissions } = playerState[localPlayerId];
    if (drawMissions <= 0) return null;

    return (
        <div className="mission-overlay">
            <div className="title">A whisper in your Ear.</div>
            <div className="instruction">
                You laid your hands on a <em>HOLLOW HENGE</em>. Choose a mission, but choose wisely.
            </div>
            <div className="stack mission-cards">
                <MissionCard type="solo" />
                <MissionCard type="diplomatic" />
            </div>
        </div>
    );
};
