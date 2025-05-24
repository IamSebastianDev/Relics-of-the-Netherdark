import { ISO639Code } from '@vayjs/vay';
import React from 'react';
import close from '../../assets/icons/close.png';
import { useLanguage } from '../../providers/language.provider';
import { useSettings } from '../../providers/settings.provider';
import { useSettingsStore } from '../../stores/settings.store';

export const Settings = React.memo(() => {
    const { mirrorUi, toggleMirrorUi } = useSettings();
    const { language, setLanguage, translate: t } = useLanguage();
    const { toggle: toggleSettings } = useSettingsStore();

    const options = [
        { language: t('scenes.settings.controls.language.options.english'), value: 'en' },
        { language: t('scenes.settings.controls.language.options.german'), value: 'de' },
        { language: t('scenes.settings.controls.language.options.spanish'), value: 'es' },
    ];

    return (
        <div className="mission-overlay settings">
            <div className="title">{t('scenes.settings.title')}</div>
            <button className="close" onClick={() => toggleSettings(false)}>
                <img src={close} />
            </button>
            <form>
                <div className="control-group">
                    <div className="label">{t('scenes.settings.controls.mirror.label')}</div>
                    <label className="settings-inline">
                        <span>{t('scenes.settings.controls.mirror.description')}</span>
                        <input onChange={() => toggleMirrorUi()} checked={mirrorUi} type="checkbox" />
                    </label>
                </div>
                <div className="control-group">
                    <div className="label">{t('scenes.settings.controls.language.label')}</div>
                    <label className="settings-inline">
                        <span>{t('scenes.settings.controls.language.description')}</span>
                        <select onChange={(ev) => setLanguage(ev.target.value as ISO639Code)} value={language}>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.language}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </form>
        </div>
    );
});
