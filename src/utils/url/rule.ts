export const addSubdomain = (url: string, subdomain: string) => {
  const parsedUrl = new URL(url);
  return `${parsedUrl.protocol}//${subdomain}.${parsedUrl.hostname}${parsedUrl.port ? `:${parsedUrl.port}` : ''}`;
};
