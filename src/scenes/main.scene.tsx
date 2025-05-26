import { ISO639Code } from '@vayjs/vay';
import React from 'react';
import title from '../assets/images/title.jpg';
import { Screen } from '../components/ui/screen';
import { useGameState } from '../providers/game-state.provider';
import { useLanguage } from '../providers/language.provider';
import { useScene } from '../providers/scene.provider';

export const Main = React.memo(() => {
    const scenes = useScene();
    const { translate: t, setLanguage, language } = useLanguage();
    const { allPlayerIds } = useGameState();

    const disableAiPlayers = allPlayerIds.length > 3 || allPlayerIds.some((id) => id.includes('[ai]'));

    const options: { language: string; value: ISO639Code }[] = [
        { language: '🇬🇧', value: 'en' },
        { language: '🇩🇪', value: 'de' },
        { language: '🇪🇸', value: 'es' },
    ];

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
                        disabled={disableAiPlayers}
                        onClick={() => {
                            Rune.actions.addAiPlayers();
                            scenes.next('game');
                        }}
                    >
                        {t('scenes.main.controls.solo')}
                    </button>
                </div>
                <div className="languages">
                    {options.map((option) => {
                        return (
                            <button
                                data-is-active-language={language === option.value}
                                key={option.value}
                                onClick={() => setLanguage(option.value)}
                            >
                                {option.language}
                            </button>
                        );
                    })}
                </div>
            </div>
        </Screen>
    );
});
