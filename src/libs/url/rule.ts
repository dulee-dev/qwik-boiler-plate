export const addSubdomain = (url: string, subdomain: string) => {
  const parsedUrl = new URL(url);
  return `${parsedUrl.protocol}//${subdomain}.${parsedUrl.hostname}${parsedUrl.port ? `:${parsedUrl.port}` : ''}`;
};

export const extractSubdomain = (url: string): string | undefined => {
  try {
    const { hostname } = new URL(url);
    const parts = hostname.split('.');

    if (parts.includes('localhost')) {
      if (parts.length <= 1) {
        return undefined;
      }
      return parts.slice(0, -1).join('.');
    }
    if (parts.length <= 2) {
      return undefined;
    }
    return parts.slice(0, -2).join('.');
  } catch {
    return undefined; // 유효하지 않은 URL
  }
};
