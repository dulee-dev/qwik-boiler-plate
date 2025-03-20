/**
 * useLocation을 써서 body에 lang을 주려면 QwikProvider 아래서 해야해서 이렇게함
 */

import { component$ } from '@builder.io/qwik';
import { RouterOutlet, useLocation } from '@builder.io/qwik-city';
import i18next, { changeLanguage } from 'i18next';

export const Body = component$(() => {
  const location = useLocation();

  if (location.url.hostname.startsWith('ko.')) {
    changeLanguage('ko');
  } else {
    changeLanguage('en');
  }

  return (
    <body lang={i18next.language}>
      <RouterOutlet />
    </body>
  );
});
