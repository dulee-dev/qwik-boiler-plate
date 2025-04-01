import { component$ } from '@builder.io/qwik';
import {
  RequestHandler,
  routeAction$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { SignUpProfile } from '~/components/ui/templates/sign-up-profile';
import { userMain } from '~/infra/main/services/user/user-main.effect';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/loader/use-auth-user.loader';
import { useSignUpCode } from '~/server/loader/use-sign-up-code.loader';
export { useAuthUser, useSignUpCode };

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  await authGuard.public({ cookie, redirect });
};

export const useSignUpAction = routeAction$(
  async (dataJson, { redirect, query }) => {
    const data = dataJson as { email: string; pw: string; marketing: boolean };
    const signUpCodeId = query.get('code');

    if (signUpCodeId === null) {
      return { ok: false, msg: 'noSignUpCode' };
    }

    const { email, ...rest } = data;

    try {
      const response = await userMain.signUp({
        email: email.toLowerCase(),
        ...rest,
        signUpCodeId,
      });

      if (response.body.code === 400001) {
        throw 1;
      }
      if (response.body.code === 400000) {
        throw 2;
      }
      if (response.body.code === 201000) {
        return { success: true };
      }

      return { success: false };
    } catch (err) {
      if (err === 1)
        throw redirect(302, '/users/sign-in/?msg=sign-up-code-expired');
      if (err === 2)
        throw redirect(302, '/users/sign-in/?msg=sign-up-code-invalid');

      return { success: false };
    }
  }
);

export default component$(() => {
  useSpeak({ assets: ['users-sign-up-profile'] });

  return <SignUpProfile />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'usersSignUpProfile',
  };
};
