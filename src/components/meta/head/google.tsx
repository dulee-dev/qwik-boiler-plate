export const Google = () => {
  const gtag = import.meta.env.PUBLIC_GTAG;
  const debugMode = process.env.NODE_ENV !== 'production';
  // const debugMode = true;
  return (
    <>
      <script
        async
        type="text/partytown"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`}
      />
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={`
                    window.dataLayer = window.dataLayer || [];
                    window.gtag = function() {
                      dataLayer.push(arguments);
                    }
                    gtag('js', new Date());
                    gtag('config', '${gtag}'${debugMode ? `, { 'debug_mode': ${debugMode} }` : ''});
                  `}
      />
    </>
  );
};
