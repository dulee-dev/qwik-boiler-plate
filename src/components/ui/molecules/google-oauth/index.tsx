import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { ToastListContext } from '~/contexts/toast-list';
import { loadGoogleSdk, renderGoogleButton } from '~/infra/google/oauth';
import { googleAuth } from '~/server/auth/auth.effect';

declare global {
  interface Window {
    google?: any;
  }
}

export const GoogleOauth = component$(() => {
  const toastList = useContext(ToastListContext);

  useVisibleTask$(() => {
    (async () => {
      await loadGoogleSdk();
      window.google.accounts.id.initialize({
        client_id: import.meta.env.PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          const token = response.credential;
          const { message } = await googleAuth(token);

          if (message === 'sign-in') {
            window.location.href = '/console/?msg=welcome/';
            return;
          }

          if (message === 'provider=null') {
            // handler sign-in-oauth
            window.location.href = `/users/sign-up/profile/?googleIdToken=${token}/`;
            return;
          }
          if (message === 'provider=in-house') {
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
