import { addSubdomain } from '~/libs/url/rule';

export const I18n = () => {
  return (
    <>
      <link
        rel="alternate"
        href={import.meta.env.PUBLIC_WEB_BASE_URL}
        hreflang="en"
      />
      <link
        rel="alternate"
        href={addSubdomain(import.meta.env.PUBLIC_WEB_BASE_URL, 'ko')}
        hreflang="ko"
      />
      <link
        rel="alternate"
        href={import.meta.env.PUBLIC_WEB_BASE_URL}
        hreflang="x-default"
      />
    </>
  );
};
