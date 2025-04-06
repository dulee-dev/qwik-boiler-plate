import { component$, useVisibleTask$ } from '@builder.io/qwik';
import {
  // getGoogleIdToken,
  loadGoogleSdk,
  renderGoogleButton,
} from '~/infra/google/oauth';
import { api } from '~/infra/main/libs/api';
import { googleOAuth } from '~/infra/main/services/google/oauth-main.effect';

declare global {
  interface Window {
    google?: any;
  }
}

export const GoogleOauth = component$(() => {
  useVisibleTask$(() => {
    (async () => {
      await loadGoogleSdk();
      window.google.accounts.id.initialize({
        client_id: import.meta.env.PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          const token = response.credential;
          try {
            const response = await googleOAuth.certify(token);

            console.log(response.body);
          } catch (err) {
            console.error('❌ 로그인 처리 실패:', err);
          }
        },
      });
      await renderGoogleButton('google-signin-btn');
    })();
  });

  return <div id="google-signin-btn" />;
});
