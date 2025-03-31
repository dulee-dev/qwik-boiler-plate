// src/lib/posthog.ts
declare global {
  interface Window {
    posthog: any;
  }
}

export const initPosthog = (userId?: string) => {
  if (typeof window === 'undefined') return;

  if (window.posthog) return; // 이미 로드됨

  const script = document.createElement('script');
  script.src = 'https://app.posthog.com/static/array.js';
  script.async = true;
  script.onload = () => {
    window.posthog.init('phc_VirfpG82Ii57TRnW9Pz2TVLD76NDLwKPwhs5FWAQaIE', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: userId ?? 'always', // or 'always' to create profiles for anonymous users as well
    });
  };
  document.head.appendChild(script);
};

export const capture = (name: string, params: Record<string, any>) => {
  window.posthog?.capture(name, params);
};
