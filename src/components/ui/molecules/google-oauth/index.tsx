import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { server$ } from '@builder.io/qwik-city';
import { ToastListContext } from '~/contexts/toast-list';
import {
  // getGoogleIdToken,
  loadGoogleSdk,
  renderGoogleButton,
} from '~/infra/google/oauth';
import { googleOAuthMain } from '~/infra/main/services/google/oauth-main.effect';
import {
  accessTokenHandler,
  refreshTokenHandler,
} from '~/server/auth/auth.effect';

declare global {
  interface Window {
    google?: any;
  }
}

const oauthHandler = server$(async function (token: string) {
  const { cookie } = this;

  const response = await googleOAuthMain.certify(token);

  if (response.body.code === 201000) {
    if ('accessToken' in response.body.data) {
      const { accessToken, refreshToken } = response.body.data;

      accessTokenHandler.setCookie(cookie, accessToken);
      refreshTokenHandler.setCookie(cookie, refreshToken);
      return { messsage: 'sign-in' };
    }
    return { messsage: `provider=${response.body.data.provider}` };
  }
  return { messsage: 'fail' };
});

export const GoogleOauth = component$(() => {
  const toastList = useContext(ToastListContext);

  useVisibleTask$(() => {
    (async () => {
      await loadGoogleSdk();
      window.google.accounts.id.initialize({
        client_id: import.meta.env.PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          const token = response.credential;
          const { messsage } = await oauthHandler(token);

          if (messsage === 'sign-in') {
            window.location.href = '/console/?msg=welcome/';
            return;
          }

          if (messsage === 'provider=null') {
            // handler sign-in-oauth
            window.location.href = `/users/sign-up/profile/?googleIdToken=${token}/`;
            return;
          }
          if (messsage === 'provider=in-house') {
            toastList.addToast$({
              tag: 'dynamic.info.provider.inHouse',
              type: 'info',
            });
            return;
          }

          toastList.addToast$({
            tag: 'dynamic.error.server',
            type: 'error',
          });
          return;
        },
      });

      await renderGoogleButton('google-signin-btn');
    })();
  });

  return <div id="google-signin-btn" />;
});
