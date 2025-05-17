import React from 'react';
import { Screen } from '../components/ui/screen';

const handleOnClick = () => Rune.actions.drawMission();

export const Game = React.memo(() => {
    return (
        <Screen>
            <button onClick={() => handleOnClick()}>Draw mission</button>
        </Screen>
    );
});
