import { component$ } from '@builder.io/qwik';
import { RequestHandler, type DocumentHead } from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { Withdrawal } from '~/components/ui/templates/withdrawal';
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
  useSpeak({ assets: ['users-withdrawal'] });

  return <Withdrawal />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'usersWithdrawal',
  };
};
