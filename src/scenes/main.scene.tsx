import React from 'react';
import title from '../assets/images/title.jpg';
import { Screen } from '../components/ui/screen';
import { useScene } from '../providers/scene.provider';

export const Main = React.memo(() => {
    const scenes = useScene();

    return (
        <Screen>
            <div className="title-screen">
                <img className="background-image" src={title} />
                <div className="heading">
                    Relics of the <span>Netherdark</span>
                </div>
                <div className="menu">
                    <button onClick={() => scenes.next('game')} className="menu-button">
                        Start
                    </button>
                    <button onClick={() => scenes.next('rules')} className="menu-button">
                        Rules
                    </button>
                    <button className="menu-button">Play Solo</button>
                </div>
            </div>
        </Screen>
    );
});
