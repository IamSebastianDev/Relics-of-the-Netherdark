import { PlayerId } from 'rune-sdk';
import { useGameState } from '../../providers/game-state.provider';

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

export const GameUi = () => {
    return (
        <div className="overlay">
            <PlayerAvatarGroup />
        </div>
    );
};
