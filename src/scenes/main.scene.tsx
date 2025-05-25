import React from 'react';
import title from '../assets/images/title.jpg';
import { Screen } from '../components/ui/screen';
import { useLanguage } from '../providers/language.provider';
import { useScene } from '../providers/scene.provider';

export const Main = React.memo(() => {
    const scenes = useScene();
    const { translate: t } = useLanguage();

    return (
        <Screen>
            <div className="title-screen">
                <img className="background-image" src={title} />
                <div className="heading">
                    Relics of the <span>Netherdark</span>
                </div>
                <div className="menu">
                    <button onClick={() => scenes.next('game')} className="menu-button">
                        {t('scenes.main.controls.start')}
                    </button>
                    <button onClick={() => scenes.next('rules')} className="menu-button">
                        {t('scenes.main.controls.rules')}
                    </button>
                    <button
                        className="menu-button"
                        onClick={() => {
                            Rune.actions.addAiPlayers();
                            scenes.next('game');
                        }}
                    >
                        {t('scenes.main.controls.solo')}
                    </button>
                </div>
            </div>
        </Screen>
    );
});
