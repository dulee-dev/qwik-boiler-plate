import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { QwikPartytown } from './partytown';
import { isDev } from '@builder.io/qwik';
import { Google } from './google';
import { I18n } from './i18n';
import { QwikBase } from './qwik-base';
import { inlineTranslate } from 'qwik-speak';

export const Head = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  const t = inlineTranslate();

  return (
    <head>
      <meta charset="utf-8" />
      <QwikPartytown forward={['gtag', 'dataLayer.push']} />
      <Google />

      {!isDev && (
        <link
          rel="manifest"
          href={`${import.meta.env.BASE_URL}manifest.json`}
        />
      )}
      <title>{t(`${head.title}.meta.title`) + ' - FAi'}</title>
      <meta name="description" content={t(`${head.title}.meta.description`)} />
      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href="/favicon.png" />

      <I18n />

      <QwikBase head={head} />
    </head>
  );
});
