import React from 'react';
import { Screen } from '../components/ui/screen';
import { useLanguage } from '../providers/language.provider';
import { useScene } from '../providers/scene.provider';

export const Rules = React.memo(() => {
    const scenes = useScene();
    const { translate: t } = useLanguage();

    return (
        <Screen>
            <div className="rules">
                <h1 className="rules-title">{t('scenes.rules.title')}</h1>
                <div className="rules-text">
                    <p>{t('scenes.rules.intro')}</p>
                    <p>{t('scenes.rules.claiming')}</p>
                    <p>{t('scenes.rules.tileRewardIntro')}</p>
                    <ul className="tile-values">
                        <li>{t('scenes.rules.tiles.gemstone')}</li>
                        <li>{t('scenes.rules.tiles.fungal')}</li>
                        <li>{t('scenes.rules.tiles.miners')}</li>
                        <li>{t('scenes.rules.tiles.bone')}</li>
                        <li>{t('scenes.rules.tiles.tunnels')}</li>
                        <li>{t('scenes.rules.tiles.shrines')}</li>
                    </ul>
                    <p>{t('scenes.rules.missions')}</p>
                    <p>{t('scenes.rules.end')}</p>
                    <p>{t('scenes.rules.scoring')}</p>
                </div>
                <button onClick={() => scenes.next('main')}>{t('scenes.rules.back')}</button>
            </div>
        </Screen>
    );
});
