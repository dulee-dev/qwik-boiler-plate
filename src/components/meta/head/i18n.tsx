import { addSubdomain } from '@src/utils/url/rule';

export const I18n = () => {
  return (
    <>
      <link
        rel="alternate"
        href={import.meta.env.PUBLIC_WEB_URL}
        hreflang="en"
      />
      <link
        rel="alternate"
        href={addSubdomain(import.meta.env.PUBLIC_WEB_URL, 'ko')}
        hreflang="ko"
      />
      <link
        rel="alternate"
        href={import.meta.env.PUBLIC_WEB_URL}
        hreflang="x-default"
      />
    </>
  );
};
