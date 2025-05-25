import { createProvider, defineConfig } from '@vayjs/vay';
import { createLanguageProvider } from '@vayjs/vay-react';

import de from '../assets/i18n/de.dict';
import en from '../assets/i18n/en.dict';
import es from '../assets/i18n/es.dict';

const i18nProvider = createProvider(defineConfig(), en, de, es);
export const { LanguageProvider, useLanguage } = createLanguageProvider(i18nProvider);

export type TranslationKey = Parameters<ReturnType<typeof useLanguage>['translate']>[0];
