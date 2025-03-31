import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import {
  RequestHandler,
  routeAction$,
  useLocation,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { SignIn } from '~/components/ui/templates/sign-in';
import { ToastListContext } from '~/contexts/toast-list';
import { userMain } from '~/infra/main/services/user/user-main.effect';
import { authGuard } from '~/server/auth/auth-guard.effect';
import {
  accessTokenHandler,
  refreshTokenHandler,
} from '~/server/auth/auth.effect';
import { useAuthUser } from '~/server/use-auth-user.loader';
export { useAuthUser };

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  await authGuard.public({ cookie, redirect });
};

export const useSignInAction = routeAction$(async function (
  dataJson,
  { redirect, query, cookie }
) {
  const data = {
    email: (dataJson.email as string).toLowerCase(),
    pw: dataJson.password,
  } as {
    email: string;
    pw: string;
  };

  try {
    const response = await userMain.signIn(data);

    if (response.body.code === 201000) {
      const { accessToken, refreshToken } = response.body.data;
      accessTokenHandler.setCookie(cookie, accessToken);
      refreshTokenHandler.setCookie(cookie, refreshToken);
      return { success: true };
    }

    return { success: false };
  } catch (err) {
    return undefined;
  }
});

export default component$(() => {
  useSpeak({ assets: ['users-sign-in'] });

  const loc = useLocation();
  const toastList = useContext(ToastListContext);

  useVisibleTask$(() => {
    const msg = loc.url.searchParams.get('msg');
    if (msg === 'unauthorized')
      toastList.addToast$({
        type: 'warn',
        tag: 'dynamic.warn.unauthorized',
      });
  });

  return <SignIn />;
});

export const head: DocumentHead = ({ resolveValue, params, head }) => {
  return {
    title: 'users-sign-in',
  };
};
