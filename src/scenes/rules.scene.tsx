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
                <button onClick={() => scenes.next('main')}>{t('scenes.rules.back')}</button>
                <div className="rules-text">
                    <p>{t('scenes.rules.intro')}</p>
                    <p>{t('scenes.rules.claiming')}</p>
                    <p>{t('scenes.rules.missions')}</p>
                    <p>{t('scenes.rules.end')}</p>
                </div>
            </div>
        </Screen>
    );
});
