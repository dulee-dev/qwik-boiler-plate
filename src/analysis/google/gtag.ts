export const ga = {
  click(label: string, category?: string) {
    const parameter =
      category === undefined
        ? { event_label: label }
        : { event_label: label, event_category: category };

    gtag('event', 'click', parameter);
  },

  nav(label: string, category?: string) {
    const parameter =
      category === undefined
        ? { event_label: label }
        : { event_label: label, event_category: category };

    gtag('event', 'navigation', parameter);
  },

  submit(label: string, category?: string) {
    const parameter =
      category === undefined
        ? { event_label: label }
        : { event_label: label, event_category: category };

    gtag('event', 'submit', parameter);
  },
};
