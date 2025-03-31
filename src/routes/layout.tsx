import {
  $,
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
import {
  Toast,
  toastLifeMs,
  ToastListContext,
  ToastListContextType,
} from '~/contexts/toast-list';
import { v4 } from 'uuid';
import { ToastList } from '~/components/ui/organisms/toast-list';
import { initPosthog } from '~/analysis/posthog/posthog';

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
  const toastList = useStore<ToastListContextType>({
    toasts: [],
    addToast$: $(function (this: ToastListContextType, { tag, type, lifeMs }) {
      const newToast: Toast = {
        id: v4(),
        tag,
        type: type,
      };
      this.toasts = [...this.toasts, newToast];

      if (lifeMs !== null)
        setTimeout(() => {
          this.toasts = this.toasts.filter((t) => t.id !== newToast.id);
        }, lifeMs ?? toastLifeMs);
    }),
    removeToast$: $(function (this: ToastListContextType, id) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    }),
  });

  useVisibleTask$(() => {
    const isMobile = detectMobile();
    config.isMobile = isMobile;
    initPosthog();
  });

  useContextProvider(ConfigContext, config);
  useContextProvider(DevControllerContext, devController);
  useContextProvider(ToastListContext, toastList);
  return (
    <>
      <Slot />
      {isDev && <DevController />}
      <ToastList />
    </>
  );
});
