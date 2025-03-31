import { component$ } from '@builder.io/qwik';
import {
  RequestHandler,
  routeAction$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { SignUp } from '~/components/ui/templates/sign-up';
import { userMain } from '~/infra/main/services/user/user-main.effect';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  await authGuard.public({ cookie, redirect });
};

const expiredCodeError = new Error('sign-up-code is expired');

export const useSignUpAction = routeAction$(
  async (dataJson, { redirect, query }) => {
    const data = {
      email: (dataJson.email as string).toLowerCase(),
      pw: dataJson.pw,
    } as {
      email: string;
      pw: string;
    };

    try {
      const response = await userMain.signUp(data);

      if (response.body.code === 400001) {
        throw expiredCodeError;
      }
      if (response.body.code === 201000) {
        return { success: true };
      }

      return { success: false };
    } catch (err) {
      if (err === expiredCodeError)
        throw redirect(302, '/users/sign-up/?msg=sign-up-code-expired');

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
    title: 'users-sign-up',
  };
};
