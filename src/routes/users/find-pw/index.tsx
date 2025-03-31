import { component$ } from '@builder.io/qwik';
import { RequestHandler, type DocumentHead } from '@builder.io/qwik-city';
import { FindPw } from '~/components/ui/templates/find-pw';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  await authGuard.public({ cookie, redirect });
};

export default component$(() => {
  return <FindPw />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'users-find-pw',
  };
};
