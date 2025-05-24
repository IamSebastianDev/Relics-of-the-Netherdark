import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/im-fell-dw-pica';
import './assets/styles/design-system.css';
import { GameStateProvider } from './providers/game-state.provider.tsx';
import { LanguageProvider } from './providers/language.provider.tsx';

import { SceneProvider } from './providers/scene.provider.tsx';
import { SettingsProvider } from './providers/settings.provider.tsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <LanguageProvider>
            <SettingsProvider>
                <GameStateProvider>
                    <SceneProvider initial="game" />
                </GameStateProvider>
            </SettingsProvider>
        </LanguageProvider>
    </React.StrictMode>
);
