import { component$ } from '@builder.io/qwik';
import { RequestHandler, type DocumentHead } from '@builder.io/qwik-city';
import { Home } from '~/components/ui/templates/home';
import { useSpeak } from 'qwik-speak';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({ cookie, sharedMap }) => {
  await authGuard.all({ cookie, sharedMap });
};

export default component$(() => {
  useSpeak({ assets: ['home'] });

  return <Home />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'home',
  };
};
