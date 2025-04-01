import { component$ } from '@builder.io/qwik';
import {
  RequestHandler,
  routeAction$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { SignUp } from '~/components/ui/templates/sign-up';
import { signUpCodeMain } from '~/infra/main/services/sign-up-code/sign-up-code-main.effect';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/loader/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  await authGuard.public({ cookie, redirect });
};

export const useCreateSignUpCodeAction = routeAction$(
  async (dataJson, { redirect, query }) => {
    const email = (dataJson.email as string).toLowerCase();

    try {
      const response = await signUpCodeMain.createOne(email);

      if (response.body.code === 201000) {
        return { success: true };
      }

      return { success: false };
    } catch (err) {
      return { success: false };
    }
  }
);

export default component$(() => {
  useSpeak({ assets: ['users-sign-up'] });

  return <SignUp />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'usersSignUpSuccess',
  };
};
