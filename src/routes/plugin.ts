import type { RequestHandler } from '@builder.io/qwik-city';
import { config } from '../speak-config';
import { extractSubdomain } from '~/libs/url/rule';

/**
 * This middleware function must only contain the logic to set the locale,
 * because it is invoked on every request to the server.
 * Avoid redirecting or throwing errors here, and prefer layouts or pages
 */
export const onRequest: RequestHandler = ({ request, locale }) => {
  const acceptLanguage = extractSubdomain(request.url);

  let lang: string | null = null;

  // Try to use user language
  if (acceptLanguage) {
    lang = acceptLanguage.split(';')[0]?.split(',')[0];
  }
  // Check supported locales
  lang =
    config.supportedLocales.find((value) => value.lang === lang)?.lang ||
    config.supportedLocales.find((value) => value.lang === lang?.split('-')[0])
      ?.lang ||
    config.defaultLocale.lang;
  // Set Qwik locale
  locale(lang);
};
