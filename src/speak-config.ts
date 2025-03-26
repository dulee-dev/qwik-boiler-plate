import type { SpeakConfig } from 'qwik-speak';

export const config: SpeakConfig = {
  defaultLocale: {
    lang: 'en',
    currency: 'USD',
    timeZone: 'America/Los_Angeles',
  },
  supportedLocales: [
    { lang: 'ko', currency: 'WON', timeZone: 'Korea/Seoul' },
    { lang: 'en', currency: 'USD', timeZone: 'America/Los_Angeles' },
  ],
  // Translations available in the whole app
  assets: ['translation', 'home', 'waitlist'],
  // Translations with dynamic keys available in the whole app
  runtimeAssets: ['runtime'],
};
