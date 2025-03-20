import i18next from 'i18next';
import en from './en.json';
import ko from './ko.json';

// i18next 초기화
i18next.init({
  resources: {
    en: { translation: en },
    ko: { translation: ko },
  },
  lng: 'en', // 기본 언어
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});
