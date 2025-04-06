export const loadGoogleSdk = () =>
  new Promise<void>((resolve) => {
    if (window.google?.accounts) return resolve();
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });

export const renderGoogleButton = async (elementId: string) => {
  window.google.accounts.id.renderButton(document.getElementById(elementId)!, {
    theme: 'outline',
    size: 'large',
  });
};
