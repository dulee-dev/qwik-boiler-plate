import { component$ } from '@builder.io/qwik';
import { RequestHandler, type DocumentHead } from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { SignUpCheckEmail } from '~/components/ui/templates/sign-up-check-email';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/loader/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  await authGuard.public({ cookie, redirect });
};

export default component$(() => {
  useSpeak({ assets: ['users-sign-up-check-email'] });

  return <SignUpCheckEmail />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'usersSignUpCheckEmail',
  };
};
