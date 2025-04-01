import { component$ } from '@builder.io/qwik';
import { RequestHandler, type DocumentHead } from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { ConsoleImage } from '~/components/ui/templates/console-image';
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
  useSpeak({ assets: ['console-image'] });

  return <ConsoleImage />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'consoleImage',
  };
};
