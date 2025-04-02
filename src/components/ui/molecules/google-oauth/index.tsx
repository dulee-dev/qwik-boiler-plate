import { component$, useVisibleTask$ } from '@builder.io/qwik';

declare global {
  interface Window {
    google: any;
  }
}

export const GoogleOauth = component$(() => {
  useVisibleTask$(() => {
    // Google 로그인 SDK 초기화
    window.google?.accounts.id.initialize({
      client_id: import.meta.env.PUBLIC_GOOGLE_CLIENT_ID,
      callback: async (response: any) => {
        const idToken = response.credential;
        console.log('✅ Google ID Token:', idToken);

        // 👉 이 토큰을 백엔드로 보내기
        try {
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          });

          const data = await res.json();
          console.log('🎟️ 받은 JWT:', data.token);
          // localStorage.setItem('jwt', data.token);
        } catch (err) {
          console.error('❌ 로그인 처리 실패:', err);
        }
      },
    });

    // 버튼 렌더링
    window.google?.accounts.id.renderButton(
      document.getElementById('google-signin-btn')!,
      {
        theme: 'outline',
        size: 'large',
      }
    );
  });

  return (
    <>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div id="google-signin-btn" />
    </>
  );
});
