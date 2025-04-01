import { component$ } from '@builder.io/qwik';
import {
  RequestHandler,
  routeAction$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { FindPw } from '~/components/ui/templates/find-pw';
import { resetPwCodeMain } from '~/infra/main/services/reset-pw-code/reset-pw-code-main.effect';
import { extractSubdomain } from '~/libs/url/rule';
import { authGuard } from '~/server/auth/auth-guard.effect';
import { useAuthUser } from '~/server/loader/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  await authGuard.public({ cookie, redirect });
};

export const useFindPwAction = routeAction$(
  async (dataJson, { redirect, query, url }) => {
    const email = (dataJson.email as string).toLowerCase();
    const lang = extractSubdomain(url.toString()) ?? 'en';
    try {
      const response = await resetPwCodeMain.createOneByEmail(email, lang);

      if (response.body.code === 201000) {
        return { success: true };
      }

      return { success: false };
    } catch (err) {
      return undefined;
    }
  }
);

export default component$(() => {
  useSpeak({ assets: ['users-find-pw'] });

  return <FindPw />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'usersFindPw',
  };
};
