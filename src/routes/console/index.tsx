import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import {
  RequestHandler,
  useLocation,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { Console } from '~/components/ui/templates/console';
import { ToastListContext } from '~/contexts/toast-list';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/loader/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({
  cookie,
  sharedMap,
  redirect,
}) => {
  await authGuard.private({ cookie, sharedMap, redirect });
};

export default component$(() => {
  useSpeak({ assets: ['console'] });
  const loc = useLocation();
  const toastList = useContext(ToastListContext);

  useVisibleTask$(() => {
    const msg = loc.url.searchParams.get('msg');
    if (msg === 'welcome')
      toastList.addToast$({
        type: 'ok',
        tag: 'dynamic.signUp.success',
      });
  });

  return <Console />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'console',
  };
};
