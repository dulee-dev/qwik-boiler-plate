import {
  component$,
  isDev,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { ConfigContext } from '../contexts/config';
import { detectMobile } from '~/libs/env/detect-mobile';
import { DevController } from '~/components/__dev__/dev-controller';
import { DevControllerContext } from '~/contexts/dev-controller';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const config = useStore({ isMobile: true });
  const devController = useStore({ isNavOpened: true });

  useVisibleTask$(() => {
    const isMobile = detectMobile();
    config.isMobile = isMobile;
  });

  useContextProvider(ConfigContext, config);
  useContextProvider(DevControllerContext, devController);
  return (
    <>
      <Slot />
      {isDev && <DevController />}
    </>
  );
});
