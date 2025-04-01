import { component$ } from '@builder.io/qwik';
import { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { Waitlist } from '~/components/ui/templates/waitlist';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/loader/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({ cookie, sharedMap }) => {
  await authGuard.all({ cookie, sharedMap });
};

export default component$(() => {
  useSpeak({ assets: ['wishlist'] });

  return <Waitlist />;
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  return {
    title: 'waitlist',
  };
};
