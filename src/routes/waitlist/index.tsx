import { component$ } from '@builder.io/qwik';
import { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import { Waitlist } from '~/components/ui/templates/waitlist';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({ cookie, sharedMap }) => {
  await authGuard.all({ cookie, sharedMap });
};

export default component$(() => {
  return <Waitlist />;
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  return {
    title: 'waitlist',
  };
};
