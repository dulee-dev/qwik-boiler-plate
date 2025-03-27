export const builGaQuery = (options: {
  source?: string;
  medium?: string;
  campaign?: string;
}) => {
  const query: string[] = [];
  if (options.source) query.push('utm_source=' + options.source);
  if (options.medium) query.push('utm_medium=' + options.medium);
  if (options.campaign) query.push('utm_campaign=' + options.campaign);

  const url = query.join('&');

  return url;
};

export const ga = {
  click(props: { campagin?: string; label?: string }) {
    gtag('event', 'click', props);
  },
};
