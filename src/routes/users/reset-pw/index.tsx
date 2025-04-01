import { component$ } from '@builder.io/qwik';
import {
  RequestHandler,
  routeAction$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { ResetPw } from '~/components/ui/templates/reset-pw';
import { userMain } from '~/infra/main/services/user/user-main.effect';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/loader/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  await authGuard.public({ cookie, redirect });
};

export const useResetPwAction = routeAction$(
  async (dataJson, { redirect, query, url }) => {
    const code = query.get('code');
    if (code === null) return { success: false, message: 'no code' };

    const pw = dataJson.pw as string;
    try {
      const response = await userMain.updatePw({ pw, code });

      if (response.body.code === 200000) {
        return { success: true };
      }

      return { success: false };
    } catch (err) {
      return undefined;
    }
  }
);

export default component$(() => {
  useSpeak({ assets: ['users-reset-pw'] });

  return <ResetPw />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'usersResetPw',
  };
};
