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
  assets: [
    'base',
    'console-file',
    'console-image',
    'console-upload-imag',
    'console',
    'home',
    'users-find-pw-success',
    'users-find-pw',
    'users-reset-pw',
    'users-sign-in',
    'users-sign-up-check-email',
    'users-sign-up-profile',
    'users-sign-up',
    'waitlist',
  ],
  // Translations with dynamic keys available in the whole app
  runtimeAssets: ['dynamic'],
};
