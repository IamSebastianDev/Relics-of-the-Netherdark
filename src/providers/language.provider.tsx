import { createProvider, defineConfig } from "@vayjs/vay";
import { createLanguageProvider } from "@vayjs/vay-react";

import en from "../assets/i18n/en.dict";

const i18nProvider = createProvider(defineConfig(), en);
export const { LanguageProvider, useLanguage } = createLanguageProvider(i18nProvider);
