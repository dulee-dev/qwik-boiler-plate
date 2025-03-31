import { component$ } from '@builder.io/qwik';
import { RequestHandler, type DocumentHead } from '@builder.io/qwik-city';
import { Withdrawal } from '~/components/ui/templates/withdrawal';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({
  cookie,
  sharedMap,
  redirect,
}) => {
  await authGuard.private({ cookie, sharedMap, redirect });
};

export default component$(() => {
  return <Withdrawal />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'users-withdrawal',
  };
};
