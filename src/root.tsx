import { component$ } from '@builder.io/qwik';
import { QwikCityProvider } from '@builder.io/qwik-city';
import './global.css';
import { ServiceWorkerRegister } from '@builder.io/qwik-city';
import { isDev } from '@builder.io/qwik';
import { Body } from './components/meta/body';
import { Head } from './components/meta/head';
import { useQwikSpeak } from 'qwik-speak';
import { config } from './speak-config';
import { translationFn } from './speak-functions';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  useQwikSpeak({ config, translationFn });
  return (
    <QwikCityProvider>
      <Head />
      <Body />
      {!isDev && <ServiceWorkerRegister />}
    </QwikCityProvider>
  );
});
